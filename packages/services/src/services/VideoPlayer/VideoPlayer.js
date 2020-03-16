import root from 'window-or-global';

/**
 * These id's for production use of IBM.com
 * @type {number} _partnerId The ID of your Kaltura account (aka partnerId)
 * @type {number} _uiConfId The ID of the Kaltura player to use
 * @private
 */
const _partnerId = process.env.KALTURA_PARTNER_ID || 243342;
const _uiConfId = process.env.KALTURA_UICONF_ID || 12905712;

/**
 * @type {string} _embedUrl The API URL to call
 * @private
 */
const _embedUrl = `https://cdnapisec.kaltura.com/p/${_partnerId}/sp/${_partnerId}00/embedIframeJs/uiconf_id/${_uiConfId}/partner_id/${_partnerId}`;

/**
 * Number of times to retry the script ready loop before failing
 *
 * @type {number}
 * @private
 */

const _timeoutRetries = 50;
/**
 * Tracks the number of attempts for the script ready loop
 *
 * @type {number}
 * @private
 */
let _attempt = 0;

/**
 * Tracks the script status
 *
 * @type {boolean} _scriptLoading to track the script loading or not
 * @private
 */
let _scriptLoading = false;

/**
 * Timeout loop to check script state is the _scriptLoaded state or _scriptLoading state
 *
 * @param {Function} resolve Resolve function
 * @param {Function} reject Reject function
 * @private
 */
function _scriptReady(resolve, reject) {
  /**
   *
   * @param {object} root.kWidget if exists then resolve
   */
  if (root.kWidget) {
    _scriptLoading = false;
    resolve();
  } else if (_scriptLoading) {
    _attempt++;

    if (_attempt < _timeoutRetries) {
      setTimeout(() => {
        _scriptReady(resolve, reject);
      }, 100);
    } else {
      reject();
    }
  } else {
    _loadScript();
    _scriptReady(resolve, reject);
  }
}

/**
 * Returns boolean if the _scriptLoading and _scriptLoaded flag is false
 *
 * @private
 */
function _loadScript() {
  _scriptLoading = true;
  const script = document.createElement('script');
  script.src = _embedUrl;
  script.async = true;
  document.body.appendChild(script);
}

/**
 *
 * VideoPlayerAPI class with methods of checking script state and
 * embed video meta data and api data
 * ibm.com
 */
class VideoPlayerAPI {
  /**
   *
   * Gets the full _scriptReady state
   *
   * @returns {Promise<*>} Promise kaltura video player file
   */
  static checkScript() {
    return new Promise((resolve, reject) => {
      _scriptReady(resolve, reject);
    });
  }

  /**
   * Gets the embed meta data
   *
   * @param {string} videoId  The videoId we're embedding the placeholder for.
   * @param {string} targetId The targetId the ID where we're putting the placeholder.
   * @returns {object}  object
   */
  static async embedVideo(videoId, targetId) {
    return await this.checkScript().then(() => {
      root.kWidget.embed({
        targetId: targetId,
        wid: '_' + _partnerId,
        uiconf_id: _uiConfId,
        entry_id: videoId,
        flashvars: {
          autoPlay: false,
          titleLabel: {
            plugin: true,
            align: 'left',
            text: '{mediaProxy.entry.name}',
          },
        },
        // Ready callback is issued for this player:
        readyCallback: function(playerId) {
          var kdp = document.getElementById(playerId);
          kdp.kBind('Play', function() {
            return playerId;
          });
          var events = [
            'layoutBuildDone',
            'playerReady',
            'mediaLoaded',
            'mediaError',
            'playerStateChange',
            'firstPlay',
            'playerPlayed',
            'playerPaused',
            'preSeek',
            'seek',
            'seeked',
            'playerUpdatePlayhead',
            'openFullScreen',
            'closeFullScreen',
            'volumeChanged',
            'mute',
            'unmute',
            'bufferChange',
            'cuePointReached',
            'playerPlayEnd',
            'onChangeMedia',
            'onChangeMediaDone',
          ];
          for (var i = 0; i < events.length; i++) {
            (function(i) {
              kdp.kBind(events[i], function(event) {
                return JSON.stringify(event);
              });
            })(i);
          }
        },
      });
    });
  }

  /**
   * Gets the api data
   *
   * @param {string} videoId  The videoId we're embedding the placeholder for.
   * @returns {object}  object
   */
  static async api(videoId) {
    return await this.checkScript().then(() => {
      return new Promise(resolve => {
        return new root.kWidget.api({ wid: _partnerId }).doRequest(
          {
            service: 'media',
            action: 'get',
            entryId: videoId,
          },
          function(jsonObj) {
            resolve(jsonObj);
          }
        );
      });
    });
  }

  /**
   * Convert video duration from milliseconds to HH:MM:SS
   *
   * @param {string} duration video duration in milliseconds
   * @returns {string} converted duration
   */
  static getVideoDuration(duration) {
    let seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = hours > 0 ? hours + ':' : '';
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return duration && '(' + hours + minutes + ':' + seconds + ')';
  }
}

export default VideoPlayerAPI;
