/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import root from 'window-or-global';

/**
 * Sets the Kaltura Partner ID
 *
 * @type {number}
 * @private
 */
const _partnerId =
  process?.env?.REACT_APP_KALTURA_PARTNER_ID ??
  process?.env?.KALTURA_PARTNER_ID ??
  // 1773841;
  1773841;

/**
 * Sets the Kaltura UIConf IDs
 *
 * @type {enum}
 * @private
 */
const _uiConfIds = {
  VIDEO: process?.env?.REACT_APP_KALTURA_UICONF_ID_VIDEO ??
    process?.env?.KALTURA_UICONF_ID_VIDEO ??
    57792212,
  AUDIO: process?.env?.REACT_APP_KALTURA_UICONF_ID_AUDIO ??
    process?.env?.KALTURA_UICONF_ID_AUDIO ??
    57792222,
  PLAYLIST: process?.env?.REACT_APP_KALTURA_UICONF_ID_PLAYLIST ??
    process?.env?.KALTURA_UICONF_ID_PLAYLIST ??
    57792212,
  REELS: process?.env?.REACT_APP_KALTURA_UICONF_ID_REELS ??
    process?.env?.KALTURA_UICONF_ID_REELS ??
    57792212,
};

/**
 * The IBM Mediacenter Loader and Player Environment
 * to be called
 *
 * @type {string}
 * @private
 */
const _ibmEnvironment =
  (process &&
    (process.env.REACT_APP_KALTURA_ENVIRONMENT ||
      process.env.KALTURA_ENVIRONMENT)) ||
  'LATEST';

/**
 * All the available enviornments for the Streaming Services Kaltura Player Script
 *
 * @type {enum}
 * @private
 */
const _ibmEnvironments = {
  DEVELOPMENT: 'development',
  LATEST: 'latest',
  NEXT: 'next'
}

/**
 * Streaming Services Kaltura Player Script URL
 *
 * @private
 */
const _ibmScriptUrl = (environment = _ibmEnvironment) => {
  return `https://1.www.s81c.com/common/mediacenter/player/loader/${_ibmEnvironments[environment]}/loader.js`;
};

/**
 * Returns boolean if the _scriptLoading and _scriptLoaded flag is false
 *
 * @private
 */
function _loadScript(environment = _ibmEnvironment) {
  _scriptLoading = true;
  const script = document.createElement('script');
  script.src = _ibmScriptUrl(environment);
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
function _scriptReady(resolve, reject, environment = _ibmEnvironment) {
  /**
   * @param {object} root?.IBM.Mediacenter.player if exists then resolve
   */
  if (root?.IBM?.Mediacenter?.player) {
    _scriptLoading = false;
    resolve();
  } else if (_scriptLoading) {
    _attempt++;

    if (_attempt < _timeoutRetries) {
      setTimeout(() => {
        _scriptReady(resolve, reject, environment);
      }, 100);
    } else {
      reject();
    }
  } else {
    _loadScript(environment);
    _scriptReady(resolve, reject, environment);
  }
}

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
  static checkScript(environment = _ibmEnvironment) {
    return new Promise((resolve, reject) => {
      _scriptReady(resolve, reject, environment);
    });
  }

  /**
   * Creates thumbnail image url with customizable params
   *
   * @param {object} params param object
   * @param {string} params.mediaId specify the kaltura media id
   * @param {string} params.height specify height in pixels
   * @param {string} params.width specify width in pixels
   * @param {string} params.partnerId specify mediacenter's partner id
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
    partnerId = _partnerId
  }) {
    return root?.IBM?.Mediacenter?.player?.api?.getThumbnail(partnerId, mediaId, width, height) || '';
  }

  /**
   * Gets the api data
   * The player api will only call kaltura once and cache the data
   * return the cached information in all subsequential calls
   *
   * @param {string} mediaId  The mediaId we're embedding the placeholder for.
   * @param {string} partnerId  The mediacenter partner id.
   * @returns {object}  object
   * @example
   * import { KalturaPlayerAPI } from '@carbon/ibmdotcom-services';
   *
   * async function getMyVideoInfo(id) {
   *   const data = await KalturaPlayerAPI.api(id);
   *   console.log(data);
   * }
   */
  static async api(
    mediaId,
    partnerId = _partnerId
  ) {
    return await this.checkScript().then(() => {
      return root?.IBM?.Mediacenter?.player?.api?.getMediaProperties(partnerId, mediaId) || {}
    });
  }

  /**
   * Gets the embed meta data
   *
   * @param {string} mediaId  The mediaId we're embedding the placeholder for.
   * @param {string} targetId The targetId the ID where we're putting the placeholder.
   * @param {object} configuration Determine any extra param or plugin for the player.
   * @param {Function} customReadyCallback Determine any extra functions that should be executed
   * @param {string} partnerId specify mediacenter's partner id
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
    configuration = {},
    customReadyCallback = () => {},
    partnerId = _partnerId
  ) {
    return await this.checkScript().then(() => {
      const legacyPromiseKWidget = async () => {
        const playerType = configuration?.playerType ?? 'VIDEO';
        const playerEnvironment = _ibmEnvironments[configuration.playerEnvironment] ?? _ibmEnvironments[_ibmEnvironment];
        const playerUiConfId = configuration.playerUiConfId ?? _uiConfIds[playerType];

        const playerConfiguration = {
          playerType,
          autoPlay: true,
          muted: true,
          loop: false,
          playerMode: 'default',
          environment: playerEnvironment,
          partnerId,
          uiConfId: playerUiConfId,
          targetId,
          ...configuration,
        };

        if (playerType === 'VIDEO' || playerType === 'AUDIO') {
          playerConfiguration.entryId = mediaId;
        } else if (playerType === 'PLAYLIST' || playerType === 'REELS') {
          // Implement when both players are ready in Mediacenter
        }

        /**
         * Process the elements around the player
         */
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

        /**
         * Embed the player and execute custom callback
         */
        const kalturaPlayer = await root?.IBM?.Mediacenter?.player?.embed(playerConfiguration);
        customReadyCallback(kalturaPlayer);

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

        return kalturaPlayer;
      };

      return legacyPromiseKWidget();
    });
  }
}

export default KalturaPlayerAPIV7;
