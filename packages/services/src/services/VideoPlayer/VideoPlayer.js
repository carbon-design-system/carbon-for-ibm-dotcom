/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AnalyticsAPI } from '../Analytics';
import root from 'window-or-global';

/**
 * Sets the Kaltura Partner ID, set by environment variable "KALTURA_PARTNER_ID"
 *
 * @type {number}
 * @private
 */
const _partnerId =
  (process &&
    (process.env.REACT_APP_KALTURA_PARTNER_ID ||
      process.env.KALTURA_PARTNER_ID)) ||
  1773841;

/**
 * Sets the Kaltura UIConf ID, set by environment variable "KALTURA_UICONF_ID"
 *
 * @type {number}
 * @private
 */
const _uiConfId =
  (process &&
    (process.env.REACT_APP_KALTURA_UICONF_ID ||
      process.env.KALTURA_UICONF_ID)) ||
  27941801;

/**
 * @type {string} _embedUrl The API URL to call
 * @private
 */
const _embedUrl = `https://cdnapisec.kaltura.com/p/${_partnerId}/sp/${_partnerId}00/embedIframeJs/uiconf_id/${_uiConfId}/partner_id/${_partnerId}`;

/**
 * @type {string} _thumbnailUrl
 * @private
 */
const _thumbnailUrl = `https://cdnsecakmi.kaltura.com/p/${_partnerId}/thumbnail/entry_id/`;

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
 * Object to cache video data
 *
 * @private
 */
let videoData = {};

/**
 * VideoPlayerAPI class with methods of checking script state and
 * embed video meta data and api data
 *
 * In order to set the Partner ID/UIConf ID, set the following environment
 * variables:
 *
 * - KALTURA_PARTNER_ID (or REACT_APP_KALTURA_PARTNER_ID)
 * - KALTURA_UICONF_ID (or REACT_APP_KALTURA_UICONF_ID)
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
   * Creates thumbnail image url with customizable params
   *
   * @param {object} params param object
   * @param {string} params.videoId video id
   * @param {string} params.height specify height in pixels
   * @param {string} params.width specify width in pixels
   *
   * @returns {string} url of thumbnail image
   *
   * @example
   * import { VideoPlayerAPI } from '@carbon/ibmdotcom-services';
   *
   * function thumbnail() {
   *   const thumbnailData = {
   *      videoId: '1_9h94wo6b',
   *      height: '240',
   *      width: '320'
   *   }
   *   const thumbnailUrl = VideoPlayerAPI.getThumbnailUrl(thumbnailData);
   * }
   */
  static getThumbnailUrl({ videoId, height, width }) {
    let url = _thumbnailUrl + videoId;
    if (height) url = url + `/height/${height}`;
    if (width) url = url + `/width/${width}`;
    return url;
  }

  /**
   * Gets the embed meta data
   *
   * @param {string} videoId  The videoId we're embedding the placeholder for.
   * @param {string} targetId The targetId the ID where we're putting the placeholder.
   * @param {boolean} autoPlay Determine whether to autoplay on load of video.
   * @returns {object}  object
   *
   * @example
   * import { VideoPlayerAPI } from '@carbon/ibmdotcom-services';
   *
   * function embedMyVideo() {
   *   const elem = document.getElementById('foo');
   *   const videoid = '12345';
   *   VideoPlayerAPI.embedVideo(videoid, elem);
   * }
   */
  static async embedVideo(videoId, targetId, autoPlay) {
    const fireEvent = this.fireEvent;
    return await this.checkScript().then(() => {
      const promiseKWidget = new Promise(resolve => {
        let isCustomCreated;

        if (
          !document.getElementById(targetId) &&
          document.querySelector('dds-tabs-extended-media')
        ) {
          const newVideoDiv = document.createElement('div');
          newVideoDiv.classList.add(`bx--video-player__video`);
          newVideoDiv.setAttribute('id', targetId);
          document.body.append(newVideoDiv);
          isCustomCreated = true;
        }

        root.kWidget.embed({
          targetId: targetId,
          wid: '_' + _partnerId,
          uiconf_id: _uiConfId,
          entry_id: videoId,
          flashvars: {
            autoPlay: autoPlay,
            closedCaptions: {
              plugin: true,
            },
            titleLabel: {
              plugin: true,
              align: 'left',
              text: '{mediaProxy.entry.name}',
            },
            ibm: {
              template: 'idl',
            },
          },
          // Ready callback is issued for this player:
          readyCallback: function(playerId) {
            var kdp = document.getElementById(playerId);

            kdp.addJsListener('playerPaused', function() {
              fireEvent({ playerState: 1, kdp, videoId });
            });
            kdp.addJsListener('playerPlayed', function() {
              fireEvent({ playerState: 2, kdp, videoId });
            });
            kdp.addJsListener('playerPlayEnd', function() {
              fireEvent({ playerState: 3, kdp, videoId });
            });

            resolve(kdp);
          },
        });

        if (isCustomCreated) {
          const previousVideoDiv = document
            .querySelector('dds-tabs-extended-media')
            .shadowRoot.querySelector(
              `.bx--accordion__item--active dds-video-player`
            ).lastChild;
          previousVideoDiv.parentElement.appendChild(
            document.getElementById(targetId)
          );
        }
      });
      return {
        kWidget() {
          return promiseKWidget;
        },
      };
    });
  }

  /**
   * Fires a metrics event when the video was played.
   * Pass events to common metrics event.
   *
   * @param {object} param params
   * @param {number} param.playerState state detecting different user actions
   * @param {object} param.kdp video object
   * @param {string} param.videoId id of the video
   *
   */
  static fireEvent({ playerState, kdp, videoId }) {
    // If video was played and timestamp is 0, it should be "launched" state.
    var currentTime = Math.round(kdp.evaluate('{video.player.currentTime}'));

    if (playerState === 2 && currentTime === 0) {
      playerState = 0;
    }

    const eventData = {
      playerType: 'kaltura',
      title: kdp.evaluate('{mediaProxy.entry.name}'),
      currentTime: currentTime,
      duration: kdp.evaluate('{mediaProxy.entry.duration}'),
      playerState: playerState,
      videoId: videoId,
    };

    AnalyticsAPI.videoPlayerStats(eventData);
  }

  /**
   * Gets the api data
   *
   * @param {string} videoId  The videoId we're embedding the placeholder for.
   * @returns {object}  object
   *
   * @example
   * import { VideoPlayerAPI } from '@carbon/ibmdotcom-services';
   *
   * async function getMyVideoInfo(id) {
   *   const data = await VideoPlayerAPI.api(id);
   *   console.log(data);
   * }
   */
  static async api(videoId) {
    return await this.checkScript().then(() => {
      if (videoData && videoData[videoId]) {
        return videoData[videoId];
      } else {
        return new Promise(resolve => {
          return new root.kWidget.api({ wid: '_' + _partnerId }).doRequest(
            {
              service: 'media',
              action: 'get',
              entryId: videoId,
            },
            function(jsonObj) {
              videoData[jsonObj.id] = jsonObj;
              resolve(jsonObj);
            }
          );
        });
      }
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
