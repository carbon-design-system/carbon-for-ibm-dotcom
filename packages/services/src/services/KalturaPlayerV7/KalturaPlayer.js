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
  VIDEO:
    process?.env?.REACT_APP_KALTURA_UICONF_ID_VIDEO ??
    process?.env?.KALTURA_UICONF_ID_VIDEO ??
    57792212,
  AUDIO:
    process?.env?.REACT_APP_KALTURA_UICONF_ID_AUDIO ??
    process?.env?.KALTURA_UICONF_ID_AUDIO ??
    57792222,
  PLAYLIST:
    process?.env?.REACT_APP_KALTURA_UICONF_ID_PLAYLIST ??
    process?.env?.KALTURA_UICONF_ID_PLAYLIST ??
    57792212,
  REELS:
    process?.env?.REACT_APP_KALTURA_UICONF_ID_REELS ??
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
  NEXT: 'next',
};

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
  // loader.js uses top-level const/let declarations and cannot be safely re-injected
  // into the same page — doing so throws "SyntaxError: Identifier already declared".
  // If a script tag for this URL already exists in the DOM, skip injection and rely
  // on the existing execution to eventually set IBM.Mediacenter.player. We still set
  // the flag to true so _scriptReady stays in polling mode.
  const loaderUrl = _ibmScriptUrl(environment);
  if (document.querySelector(`script[src="${loaderUrl}"]`)) {
    root._ibmKalturaScriptLoading = true;
    return;
  }
  root._ibmKalturaScriptLoading = true;
  const script = document.createElement('script');
  script.src = loaderUrl;
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
 * Milliseconds to wait for IBM.Mediacenter.player.embed() to resolve before
 * treating it as a missed-event hang. On cached page loads, loader.js's
 * player-plugin.js can fire its ready event before embed() registers its
 * listener, leaving the returned Promise pending indefinitely. If that
 * happens we reset the loader state and retry from scratch.
 *
 * @type {number}
 * @private
 */
const _embedTimeoutMs = 8000;

/**
 * Tracks the script loading status. Stored on `root` (window) so the value
 * persists when this module is executed more than once in the same page
 * (e.g. once as an async page script and again as a deferred Adobe Target
 * Experience Fragment script). Without this, a second execution resets the
 * flag to false and causes _loadScript() to inject loader.js a second time,
 * creating a race condition that leaves embedMedia() pending indefinitely.
 *
 * @type {boolean}
 * @private
 */
if (root._ibmKalturaScriptLoading === undefined) {
  root._ibmKalturaScriptLoading = false;
}

/**
 * Serializes concurrent embed calls. The IBM Mediacenter player.embed() does
 * not reliably support simultaneous calls for the same entryId, so we chain
 * each call onto the previous one to ensure they run sequentially.
 *
 * Stored on `root` (window) so the value persists when this module is executed
 * more than once in the same page (e.g. once as an async page script and again
 * as a deferred Adobe Target Experience Fragment script). Without this, a second
 * execution resets the queue to Promise.resolve(), breaking serialization and
 * allowing simultaneous embed() calls that hang indefinitely.
 *
 * @type {Promise<any>}
 * @private
 */
if (root._ibmKalturaEmbedQueue === undefined) {
  root._ibmKalturaEmbedQueue = Promise.resolve();
}

/**
 * Installs a one-time Object.defineProperty setter on root.IBM.Mediacenter.player
 * so that resolve() is called SYNCHRONOUSLY the instant loader.js assigns the
 * player object — before player-plugin.js can fire its ready event. This closes
 * the ~100 ms gap that the polling fallback leaves between the assignment and
 * the first poll tick, which was causing embed() to miss the ready event (Bug 2).
 *
 * Falls back to the polling loop (_scriptReady) if defineProperty is not available
 * or if IBM.Mediacenter has already been replaced after the trap was installed.
 *
 * @param {Function} resolve Resolve function
 * @private
 */
function _trapPlayerReady(resolve) {
  // If the player is already set, resolve immediately.
  if (root?.IBM?.Mediacenter?.player) {
    root._ibmKalturaScriptLoading = false;
    resolve();
    return;
  }

  // Ensure the IBM.Mediacenter path exists so we have an object to trap.
  root.IBM ??= {};
  root.IBM.Mediacenter ??= {};

  const mc = root.IBM.Mediacenter;
  let trapped = false;

  try {
    Object.defineProperty(mc, 'player', {
      configurable: true,
      enumerable: true,
      set(value) {
        // Restore as a plain writable property before anything else runs.
        Object.defineProperty(mc, 'player', {
          configurable: true,
          enumerable: true,
          writable: true,
          value,
        });
        if (!trapped) {
          trapped = true;
          root._ibmKalturaScriptLoading = false;
          resolve();
        }
      },
    });
  } catch (_e) {
    // defineProperty not supported in this environment — fall through to polling.
  }
}

/**
 * Timeout loop to check script state is the _scriptLoaded state or _scriptLoading state
 *
 * @param {Function} resolve Resolve function
 * @param {Function} reject Reject function
 * @param {string} environment The player environment
 * @param {number} attempt Per-call retry count
 * @private
 */
function _scriptReady(
  resolve,
  reject,
  environment = _ibmEnvironment,
  attempt = 0
) {
  /**
   * @param {object} root?.IBM.Mediacenter.player if exists then resolve
   */
  if (root?.IBM?.Mediacenter?.player) {
    root._ibmKalturaScriptLoading = false;
    resolve();
  } else if (root._ibmKalturaScriptLoading) {
    if (attempt < _timeoutRetries) {
      setTimeout(() => {
        _scriptReady(resolve, reject, environment, attempt + 1);
      }, 100);
    } else {
      reject();
    }
  } else {
    // Install the defineProperty trap BEFORE injecting loader.js so we catch
    // the player assignment synchronously when loader.js sets IBM.Mediacenter.player.
    _trapPlayerReady(resolve, reject);
    _loadScript(environment);
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
    partnerId = _partnerId,
  }) {
    return (
      root?.IBM?.Mediacenter?.player?.api?.getThumbnail(
        partnerId,
        mediaId,
        width,
        height
      ) || ''
    );
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
  static async api(mediaId, partnerId = _partnerId) {
    return await this.checkScript().then(() => {
      return (
        root?.IBM?.Mediacenter?.player?.api?.getMediaProperties(
          partnerId,
          mediaId
        ) || {}
      );
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
        const envKey = configuration.playerEnvironment ?? _ibmEnvironment;
        const playerEnvironment =
          _ibmEnvironments[configuration.playerEnvironment] ??
          _ibmEnvironments[_ibmEnvironment];
        const playerUiConfId =
          configuration.playerUiConfId ?? _uiConfIds[playerType];

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
         * Embed the player and execute custom callback.
         *
         * Wraps embed() with a timeout guard: on cached page loads,
         * loader.js's player-plugin.js may fire its ready event before
         * embed() registers its listener, leaving the Promise pending
         * indefinitely. If the timeout fires we reset the loader state so
         * _scriptReady() re-injects loader.js, giving the plugin a fresh
         * chance to fire its event after the listener is in place.
         */
        // If the target element was removed from the DOM before we get here
        // (e.g. Adobe Target replaced the mbox while embed() was queued),
        // skip the embed entirely so we don't block _embedQueue indefinitely.
        if (!document.getElementById(targetId)) {
          return null;
        }

        let kalturaPlayer;
        try {
          kalturaPlayer = await Promise.race([
            root.IBM.Mediacenter.player.embed(playerConfiguration),
            new Promise((_, reject) =>
              setTimeout(
                () => reject(new Error('ibm_embed_timeout')),
                _embedTimeoutMs
              )
            ),
          ]);
        } catch (embedErr) {
          if (embedErr?.message !== 'ibm_embed_timeout') {
            throw embedErr;
          }

          // Only perform a full reset (delete player, re-inject loader.js) when
          // the loader has already finished (_ibmKalturaScriptLoading === false)
          // AND loader.js is not yet in the DOM (so re-injection is safe).
          // loader.js uses top-level const/let declarations and crashes with
          // "SyntaxError: Identifier already declared" on a second injection, so
          // we skip the delete+reinject path when it's already present and instead
          // rely on polling to detect when IBM.Mediacenter.player becomes available.
          const loaderUrl = _ibmScriptUrl(envKey);
          const loaderAlreadyInjected = !!document.querySelector(
            `script[src="${loaderUrl}"]`
          );
          if (root._ibmKalturaScriptLoading === false && !loaderAlreadyInjected) {
            root._ibmKalturaScriptLoading = undefined;
            if (root.IBM?.Mediacenter) {
              delete root.IBM.Mediacenter;
            }
          }
          await new Promise((res, rej) =>
            _scriptReady(res, rej, envKey)
          );

          // Re-check after the async wait — the element may have been removed
          // while _scriptReady was retrying (e.g. during a Target mbox swap).
          if (!document.getElementById(targetId)) {
            return null;
          }

          // Wrap the retry with the same timeout guard. If loader.js was already
          // in the DOM (cannot be re-injected), IBM.Mediacenter.player.embed()
          // may still hang because player-plugin.js's ready event already fired
          // before this call was registered. In that case we return null so the
          // queue unblocks rather than hanging the page permanently.
          try {
            kalturaPlayer = await Promise.race([
              root.IBM.Mediacenter.player.embed(playerConfiguration),
              new Promise((_, reject) =>
                setTimeout(
                  () => reject(new Error('ibm_embed_timeout_retry')),
                  _embedTimeoutMs
                )
              ),
            ]);
          } catch (retryErr) {
            if (retryErr?.message !== 'ibm_embed_timeout_retry') {
              throw retryErr;
            }
            // Both the initial embed() and the retry timed out. The
            // player-plugin.js ready event has been permanently missed on
            // this page load. Return null to unblock _ibmKalturaEmbedQueue
            // so subsequent embed calls can still proceed.
            return null;
          }
        }
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

      root._ibmKalturaEmbedQueue = root._ibmKalturaEmbedQueue
        .catch(() => {})
        .then(() => legacyPromiseKWidget());
      return root._ibmKalturaEmbedQueue;
    });
  }
}

export default KalturaPlayerAPIV7;
