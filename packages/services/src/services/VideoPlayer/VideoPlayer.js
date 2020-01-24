const _partnerId = process.env.KALTURA_PARTNER_ID || 243342;
const _uiConfId = process.env.KALTURA_UICONF_ID || 12905712;

const _embedUrl = `https://cdnapisec.kaltura.com/p/${_partnerId}/sp/${_partnerId}00/embedIframeJs/uiconf_id/${_uiConfId}/partner_id/${_partnerId}`;

/**
 *
 * Number of times to retry the script ready loop before failing
 * @type {number}
 * @private
 */
const _timeoutRetries = 50;
/**
 *
 * Tracks the number of attempts for the script ready loop
 * @type {number}
 * @private
 */
let _attempt = 0;

/**
 *
 * Tracks the script either in loaded state or loading state
 * @type {boolean}
 * @private
 */
let _scriptLoaded = false;
let _scriptLoading = false;

/**
 *
 * Timeout loop to check script state is the _scriptLoaded state or _scriptLoading state .
 *
 * @param {Function} resolve Resolve function
 * @param {Function} reject Reject function
 * @private
 */
function _scriptReady(resolve, reject) {
  /**
   *
   * @param {boolean}  _scriptLoaded is true then resolve.
   */
  if (_scriptLoaded) {
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
 *
 * Returns boolean if the _scriptLoading and _scriptLoaded flag is false
 */
function _loadScript() {
  _scriptLoading = true;
  const script = document.createElement('script');
  script.src = _embedUrl;
  script.async = true;
  document.body.appendChild(script);

  script.onload = function() {
    _scriptLoaded = true;
    _scriptLoading = false;
  };
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
    let kWidget;
    return await this.checkScript().then(() => {
      if (typeof kWidget == 'undefined') {
        return;
      }
      kWidget.embed({
        targetId: 'kaltura_player',
        wid: '_' + _partnerId,
        uiconf_id: _uiConfId,
        entry_id: videoId,
        flashvars: {
          autoPlay: false,
        },
        // Ready callback is issued for this player:
        readyCallback: function(playerId) {
          console.log('kWidget player ready: ' + playerId, targetId);
          var kdp = document.getElementById(playerId);
          kdp.kBind('Play', function() {
            console.log('do Play called on  ' + playerId);
          });
        },
      });
    });
  }
}

export default VideoPlayerAPI;
