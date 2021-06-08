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
const _partnerId = process.env.KALTURA_PARTNER_ID || 1773841;

/**
 * Sets the Kaltura UIConf ID, set by environment variable "KALTURA_UICONF_ID"
 *
 * @type {number}
 * @private
 */
const _uiConfId = process.env.KALTURA_UICONF_ID || 27941801;

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
 * Object to cache media data
 *
 * @private
 */
let mediaData = {};

/**
 * KalturaPlayerAPI class with methods of checking script state and
 * embed media meta data and api data
 *
 * In order to set the Partner ID/UIConf ID, set the following environment
 * variables:
 *
 * - KALTURA_PARTNER_ID
 * - KALTURA_UICONF_ID
 */
class KalturaPlayerAPI {
  /**
   *
   * Gets the full _scriptReady state
   *
   * @returns {Promise<*>} Promise kaltura media player file
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
   * @param {string} params.mediaId media id
   * @param {string} params.height specify height in pixels
   * @param {string} params.width specify width in pixels
   *
   * @returns {string} url of thumbnail image
   *
   * @example
   * import { KalturaPlayerAPI } from '@carbon/ibmdotcom-services';
   *
   * function thumbnail() {
   *   const thumbnailData = {
   *      mediaId: '1_9h94wo6b',
   *      height: '240',
   *      width: '320'
   *   }
   *   const thumbnailUrl = KalturaPlayerAPI.getThumbnailUrl(thumbnailData);
   * }
   */
  static getThumbnailUrl({ mediaId, height, width }) {
    let url = _thumbnailUrl + mediaId;
    if (height) url = url + `/height/${height}`;
    if (width) url = url + `/width/${width}`;
    return url;
  }

  /**
   * Gets the embed meta data
   *
   * @param {string} mediaId  The mediaId we're embedding the placeholder for.
   * @param {string} targetId The targetId the ID where we're putting the placeholder.
   * @param {boolean} flashvars Determine any extra param or plugin for the player.
   * @returns {object}  object
   *
   * @example
   * import { KalturaPlayerAPI } from '@carbon/ibmdotcom-services';
   *
   * function embedMyVideo() {
   *   const elem = document.getElementById('foo');
   *   const videoid = '12345';
   *   KalturaPlayerAPI.embedMedia(videoid, elem);
   * }
   */
  static async embedMedia(mediaId, targetId, flashvars = {}) {
    const fireEvent = this.fireEvent;
    return await this.checkScript().then(() => {
      const promiseKWidget = new Promise(resolve => {
        const defaultFlashVars = {
          autoPlay: true,
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
        };

        root.kWidget.embed({
          targetId: targetId,
          wid: '_' + _partnerId,
          uiconf_id: _uiConfId,
          entry_id: mediaId,
          flashvars: {
            ...defaultFlashVars,
            ...flashvars,
          },
          params: {
            wmode: 'transparent',
          },
          // Ready callback is issued for this player:
          readyCallback: function(playerId) {
            var kdp = document.getElementById(playerId);

            kdp.addJsListener('playerPaused', function() {
              fireEvent({ playerState: 1, kdp, mediaId });
            });
            kdp.addJsListener('playerPlayed', function() {
              fireEvent({ playerState: 2, kdp, mediaId });
            });
            kdp.addJsListener('playerPlayEnd', function() {
              fireEvent({ playerState: 3, kdp, mediaId });
            });

            resolve(kdp);
          },
        });
      });
      return {
        kWidget() {
          return promiseKWidget;
        },
      };
    });
  }

  /**
   * Fires a metrics event when the media was played.
   * Pass events to common metrics event.
   *
   * @param {object} param params
   * @param {number} param.playerState state detecting different user actions
   * @param {object} param.kdp media object
   * @param {string} param.mediaId id of the media
   *
   */
  static fireEvent({ playerState, kdp, mediaId }) {
    // If media was played and timestamp is 0, it should be "launched" state.
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
      mediaId: mediaId,
    };

    AnalyticsAPI.videoPlayerStats(eventData);
  }

  /**
   * Gets the api data
   *
   * @param {string} mediaId  The mediaId we're embedding the placeholder for.
   * @returns {object}  object
   *
   * @example
   * import { KalturaPlayerAPI } from '@carbon/ibmdotcom-services';
   *
   * async function getMyVideoInfo(id) {
   *   const data = await KalturaPlayerAPI.api(id);
   *   console.log(data);
   * }
   */
  static async api(mediaId) {
    return await this.checkScript().then(() => {
      if (mediaData && mediaData[mediaId]) {
        return mediaData[mediaId];
      } else {
        return new Promise(resolve => {
          return new root.kWidget.api({ wid: '_' + _partnerId }).doRequest(
            {
              service: 'media',
              action: 'get',
              entryId: mediaId,
            },
            function(jsonObj) {
              mediaData[jsonObj.id] = jsonObj;
              resolve(jsonObj);
            }
          );
        });
      }
    });
  }

  /**
   * Convert media duration from seconds to HH:MM:SS
   *
   * @param {string} duration media duration in seconds
   * @returns {string} converted duration
   */
  static getMediaDuration(duration = 0) {
    const parsedTime = root?.kWidget?.seconds2Measurements(duration) || {};
    let hours = parsedTime?.hours || 0;
    let minutes = parsedTime?.minutes || 0;
    let seconds = parsedTime?.seconds || 0;

    minutes = (hours > 0 ? '0' + minutes : minutes).toString().slice(-2);
    hours = hours > 0 ? hours + ':' : '';
    seconds = ('0' + seconds).slice(-2);

    return hours + minutes + ':' + seconds;
  }
}

export default KalturaPlayerAPI;
