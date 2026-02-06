/**
 * Copyright IBM Corp. 2020, 2024
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
  process?.env?.REACT_APP_KALTURA_PARTNER_ID ??
  process?.env?.KALTURA_PARTNER_ID ??
  // 1773841;
  1511271;

/**
 * Sets the Kaltura UIConf ID, set by environment variable "KALTURA_UICONF_ID"
 *
 * @type {number}
 * @private
 */
const _uiConfId = process?.env?.REACT_APP_KALTURA_UICONF_ID ??
  process?.env?.KALTURA_UICONF_ID ??
  // 27941801;
  56255302;




// ======================================================================
// ======================================================================
// ======================================================================

/**
 * Returns boolean if the _scriptLoading and _scriptLoaded flag is false
 *
 * @private
 */
function _loadScript() {
  _scriptLoading = true;
  const script = document.createElement('script');
  script.src = _ibmScriptUrl;
  script.async = true;
  document.body.appendChild(script);
}

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
   * @param {object} root.IBM.Mediacenter.player if exists then resolve
   */
  if (root?.IBM?.Mediacenter?.player) {
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

// ======================================================================
// ======================================================================
// ======================================================================

/**
 * The
 *
 * @type {string}
 * @private
 */
const _ibmEnvironment =
  (process &&
    (process.env.REACT_APP_KALTURA_ENVIRONMENT ||
      process.env.KALTURA_ENVIRONMENT)) ||
  'LOCAL';

/**
 * All the available enviornments for the Streaming Services Kaltura Player Script
 *
 * @type {enum}
 * @private
 */
const _ibmEnvironments = {
  DEVELOPMENT: 'development',
  LATEST: 'latest',
  NEXT: 'next',
  LOCAL: 'local'
}

/**
 * Streaming Services Kaltura Player Script URL
 *
 * @private
 */
const _ibmScriptUrl = _ibmEnvironments[_ibmEnvironment] !== 'local'
  ? `https://1.www.s81c.com/common/mediacenter/player/loader/${_ibmEnvironments[_ibmEnvironment]}/loader.js`
  : `http://localhost:3456/loader/loader.js`;

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
class KalturaPlayerAPIV7 {
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
   * @param {string} params.mediaId specify the kaltura media id
   * @param {string} params.height specify height in pixels
   * @param {string} params.width specify width in pixels
   * @param {string} params.partnerId specify the kaltura partner id
   * @returns {string} url of thumbnail image
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
  static getThumbnailUrl({
    mediaId = '',
    height = 0,
    width = 0,
    partnerId
  }) {
    let url = `https://cdnsecakmi.kaltura.com/p/${partnerId ?? _partnerId}/thumbnail/entry_id/${mediaId}`;

    if (height > 0) {
      url = url + `/height/${height}`;
    }
    if (width > 0) {
      url = url + `/width/${width}`;
    }
    if (width === 0 && height === 0) {
      url = url + '/width/auto';
    }

    return url;
  }

  /**
   * Gets the embed meta data
   *
   * @param {string} mediaId  The mediaId we're embedding the placeholder for.
   * @param {string} targetId The targetId the ID where we're putting the placeholder.
   * @param {object} flashvars Determine any extra param or plugin for the player.
   * @param {boolean} useIbmMetrics Whether or not should IBM Metrics events be fired.
   * @param {Function} customReadyCallback Determine any extra functions that should be executed
   *  on player readyCallback.
   * @returns {object}  object
   * @example
   * import { KalturaPlayerAPI } from '@carbon/ibmdotcom-services';
   *
   * function embedMyVideo() {
   *   const elem = document.getElementById('foo');
   *   const videoid = '12345';
   *   KalturaPlayerAPI.embedMedia(videoid, elem);
   * }
   */
  static async embedMedia(
    mediaId,
    targetId,
    flashvars = {},
    useIbmMetrics = true,
    customReadyCallback = () => {}
  ) {
    console.log('mc embed: flashvars | useIbmMetrics', flashvars, useIbmMetrics);

    return await this.checkScript().then(() => {
      const promiseKWidget = async () => {
        let isCustomCreated;

        if (
          !document.getElementById(targetId) &&
          document.querySelector('cds-tabs-extended-media')
        ) {
          const newVideoDiv = document.createElement('div');
          newVideoDiv.classList.add(`bx--video-player__video`);
          newVideoDiv.setAttribute('id', targetId);
          document.body.append(newVideoDiv);
          isCustomCreated = true;
        }

        const kdp = await root?.IBM?.Mediacenter?.player?.embed({
          environment: 'local',
          partnerId: _partnerId,
          uiConfId: _uiConfId,
          entryId: mediaId,
          targetId,
          autoPlay: true
        });

        customReadyCallback(kdp);

        if (isCustomCreated) {
          const previousVideoDiv = document
            .querySelector('cds-tabs-extended-media')
            .shadowRoot.querySelector(
              `.bx--accordion__item--active cds-video-player`
            ).lastChild;
          previousVideoDiv.parentElement.appendChild(
            document.getElementById(targetId)
          );
        }

        return kdp;
      };

      return promiseKWidget();
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
   * @param {object} param.customMetricsData any extra parameter for custom events
   */
  static fireEvent({ playerState, kdp, mediaId, customMetricsData = {} }) {
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
      customMetricsData,
    };

    AnalyticsAPI.videoPlayerStats(eventData);
  }

  /**
   * Gets the api data
   * The player api will only call kaltura once and cache the data
   * return the cached information in all subsequential calls
   *
   * @param {string} mediaId  The mediaId we're embedding the placeholder for.
   * @returns {object}  object
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
        return root.IBM?.Mediacenter?.player?.api?.getMediaProperties(mediaId)
    });
  }

  /**
   * DEPRECATED
   *
   * @param {string} duration media duration in seconds
   * @param {boolean} fromMilliseconds the duration argument is expressed in milliseconds rather than seconds
   * @returns {string} converted duration
   */
  static getMediaDuration(duration = 0, fromMilliseconds) {
    return KalturaPlayerAPIV7.getMediaDurationFormatted(duration, fromMilliseconds);
  }

  /**
   * Convert media duration from milliseconds and seconds to HH:MM:SS
   *
   * @param {string} duration media duration in seconds
   * @param {boolean} fromMilliseconds the duration argument is expressed in milliseconds rather than seconds
   * @returns {string} converted duration
   */
  static getMediaDurationFormatted(duration = 0, fromMilliseconds) {
    let ms = duration;
    if (!fromMilliseconds) {
      ms = duration * 1000;
    }

    const s = Math.floor((ms / 1000) % 60);
    const m = Math.floor((ms / (1000 * 60)) % 60);
    const h = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const seconds = KalturaPlayerAPIV7.formatTime(s, 'second');
    const minutes = h || m ? KalturaPlayerAPIV7.formatTime(m, 'minute') : '';
    const hours = h ? KalturaPlayerAPIV7.formatTime(h, 'hour') : '';

    return `${hours} ${minutes} ${seconds}`.trim();
  }

  static formatTime(number, unit) {
    const locale =
      root.document.documentElement.lang || root.navigator.language;

    return new Intl.NumberFormat(locale, {
      style: 'unit',
      // @ts-ignore: TS lacking support for standard option
      unitDisplay: 'long',
      unit,
    }).format(number);
  }
}

export default KalturaPlayerAPIV7;
