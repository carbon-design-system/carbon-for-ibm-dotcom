/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ActionCreatorsMapObject,
  Dispatch,
  Store,
  bindActionCreators,
} from 'redux';
import {} from 'lit';
import KalturaPlayerAPI from '@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import store from '../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import {
  MediaData,
  MediaPlayerAPIState,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/kalturaPlayerAPI.d';
import { loadMediaData } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/kalturaPlayerAPI';
import { MediaPlayerAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/kalturaPlayerAPI.d';
import { Constructor } from '../../globals/defs';
import ConnectMixin from '../../globals/mixins/connect';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DVideoPlayerComposite from './video-player-composite';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The Redux state used for `<c4d-video-player-container>`.
 */
export interface VideoPlayerContainerState {
  /**
   * The Redux state for `KalturaPlayerAPI`.
   */
  kalturaPlayerAPI?: MediaPlayerAPIState;
}

/**
 * The properties for `<c4d-video-player-container>` from Redux state.
 */
export interface VideoPlayerContainerStateProps {
  /**
   * The video data, keyed by the video ID.
   */
  mediaData?: { [videoId: string]: MediaData };
}

export type VideoPlayerActions = ReturnType<typeof loadMediaData>;

/**
 * @param state The Redux state for video player.
 * @returns The converted version of the given state, tailored for `<c4d-video-player-container>`.
 */
export function mapStateToProps(
  state: VideoPlayerContainerState
): VideoPlayerContainerStateProps {
  const { kalturaPlayerAPI } = state;
  const { mediaData } = kalturaPlayerAPI ?? {};
  return !mediaData ? {} : { mediaData };
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<c4d-video-player-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch<MediaPlayerAPIActions>) {
  return bindActionCreators<
    VideoPlayerActions,
    ActionCreatorsMapObject<VideoPlayerActions>
  >(
    {
      _loadVideoData: loadMediaData,
    },
    dispatch as Dispatch // TS definition of `bindActionCreators()` seems to have no templated `Dispatch`
  );
}

/**
 * @param Base The base class.
 * @returns A mix-in that implements video embedding API calls.
 */
export const C4DVideoPlayerContainerMixin = <
  T extends Constructor<HTMLElement>
>(
  Base: T
) => {
  /**
   * A mix-in class that sets up and cleans up event listeners defined by `@HostListener` decorator.
   */
  abstract class C4DVideoPlayerContainerMixinImpl extends StableSelectorMixin(
    Base
  ) {
    /**
     * The video player.
     */
    abstract _videoPlayer?: HTMLElement;

    /**
     * The embedded Kaltura player element (that has `.sendNotification()`, etc. APIs), keyed by the video ID.
     */
    abstract embeddedVideos?: { [videoId: string]: any };

    /**
     * The request for the embedded Kaltura player element (that has `.sendNotification()`, etc. APIs), keyed by the video ID.
     *
     * @protected
     */
    // Not using TypeScript `private` due to: microsoft/TypeScript#17744
    _requestsEmbedVideo: { [videoId: string]: Promise<any> } = {};

    /**
     * Sets the state that the API call for embedding the video for the given video ID is in progress.
     *
     * @param videoId The video ID.
     * @param request The promise of the API call for embedding the video of the given video ID that is in progress.
     * @private
     */
    // Not using TypeScript `private` due to: microsoft/TypeScript#17744
    _setRequestEmbedVideoInProgress(videoId: string, request: Promise<any>) {
      const { _requestsEmbedVideo: oldRequestsEmbedVideo } = this;
      this._requestsEmbedVideo = {
        ...oldRequestsEmbedVideo,
        [videoId]: request,
      };
    }

    /**
     * Set the state that the API call for embedding the video for the given video ID is failed.
     *
     * @param videoId The video ID.
     * @param error An error from the API call for embedding the video of the given video ID.
     * @private
     */
    // Not using TypeScript `private` due to: microsoft/TypeScript#17744
    _setErrorRequestEmbedVideo(videoId: string, error: Error) {
      this._setRequestEmbedVideoInProgress(videoId, Promise.reject(error));
    }

    /**
     * Sets the given embedded Kaltura player element (that has `.sendNotification()`, etc. APIs) for the given video ID.
     *
     * @param videoId The video ID.
     * @param kWidget The embedded Kaltura player element (that has `.sendNotification()`, etc. APIs).
     * @private
     */
    // Not using TypeScript `private` due to: microsoft/TypeScript#17744
    _setEmbeddedVideo(videoId: string, kWidget: any) {
      this._setRequestEmbedVideoInProgress(videoId, Promise.resolve(kWidget));
      const { embeddedVideos: oldEmbeddedVideos } = this;
      this.embeddedVideos = {
        ...oldEmbeddedVideos,
        [videoId]: kWidget,
      };
    }

    _setAutoplayPreference(preference: boolean) {
      const updatedValue = preference ? '1' : '0';
      localStorage.setItem(`${this.prefersAutoplayStorageKey}`, updatedValue);
    }

    _getAutoplayPreference() {
      const storedValue = localStorage.getItem(
        `${this.prefersAutoplayStorageKey}`
      );
      const returnValue =
        storedValue === null ? null : Boolean(parseInt(storedValue, 10));
      return returnValue;
    }

    _getPlayerOptions(backgroundMode = false) {
      let playerOptions = {};

      if (backgroundMode) {
        const storedMotionPreference: boolean | null =
          this._getAutoplayPreference();

        let autoplayPreference: boolean | undefined;

        if (storedMotionPreference === null) {
          autoplayPreference = !window.matchMedia(
            '(prefers-reduced-motion: reduce)'
          ).matches;
        } else {
          autoplayPreference = storedMotionPreference;
        }
        playerOptions = {
          'topBarContainer.plugin': false,
          'controlBarContainer.plugin': false,
          'largePlayBtn.plugin': false,
          'loadingSpinner.plugin': false,
          'unMuteOverlayButton.plugin': false,
          'EmbedPlayer.DisableVideoTagSupport': false,
          loop: true,
          autoMute: true,
          autoPlay: autoplayPreference,
          // Turn off CTA's including mid-roll card and end cards.
          'ibm.callToActions': false,
          // Turn off captions display, background/ambient videos have no
          // audio.
          closedCaptions: {
            plugin: false,
          },
        };
      }

      return playerOptions;
    }

    /**
     * Sets up and sends the API call for embedding video for the given video ID.
     *
     * @param videoId The video ID.
     * @private
     */
    // Not using TypeScript `private` due to: microsoft/TypeScript#17744
    async _embedVideoImpl(videoId: string, backgroundMode = false) {
      const doc = Object.prototype.hasOwnProperty.call(this, 'getRootNode')
        ? (this.getRootNode() as Document | ShadowRoot)
        : this.ownerDocument;
      // Given Kaltura replaces the `<div>` here with `<iframe>` with the video player,
      // rendering this `<div>` in `renderLightDOM()` will cause the video player being clobbered
      const playerId = Math.random().toString(36).slice(2);
      const div = document.createElement('div');
      div.id = playerId;
      div.className = `${c4dPrefix}--video-player__video`;
      const { _videoPlayer: videoPlayer } = this;
      if (!videoPlayer) {
        throw new TypeError(
          'Cannot find the video player component to put the video content into.'
        );
      }
      videoPlayer.appendChild(div);

      const embedVideoHandle = await KalturaPlayerAPI.embedMedia(
        videoId,
        playerId,
        this._getPlayerOptions(backgroundMode)
      );
      const { width, height } = await KalturaPlayerAPI.api(videoId);
      videoPlayer.style.setProperty('--native-file-width', `${width}px`);
      videoPlayer.style.setProperty('--native-file-height', `${height}px`);
      videoPlayer.style.setProperty(
        '--native-file-aspect-ratio',
        `${width} / ${height}`
      );

      doc!.getElementById(playerId)!.dataset.videoId = videoId;
      const videoEmbed = doc!.getElementById(playerId)?.firstElementChild;
      if (videoEmbed) {
        (videoEmbed as HTMLElement).focus();
      }
      return embedVideoHandle.kWidget();
    }

    /**
     * Sends the API call for embedding video for the given video ID, and tracks the progress and the error of the REST call.
     *
     * @param videoId The video ID.
     * @internal
     */
    _embedMedia = async (videoId: string, backgroundMode = false) => {
      const { _requestsEmbedVideo: requestsEmbedVideo } = this;
      const requestEmbedVideo = requestsEmbedVideo[videoId];

      if (requestEmbedVideo) {
        return requestEmbedVideo;
      }

      const promiseEmbedVideo = this._embedVideoImpl(videoId, backgroundMode);

      this._setRequestEmbedVideoInProgress(videoId, promiseEmbedVideo);
      try {
        this._setEmbeddedVideo(videoId, await promiseEmbedVideo);
      } catch (error) {
        this._setErrorRequestEmbedVideo(videoId, error as Error);
      }
      return promiseEmbedVideo;
    };

    /**
     * Calls the data-* attribute transpose function to target `c4d-video-player`'s button element.
     */
    firstUpdated() {
      window.requestAnimationFrame(() => {
        const button =
          this.querySelector('c4d-video-player')?.shadowRoot?.querySelector(
            'button'
          );
        if (!this.getAttribute('href') && this.getAttribute('video-id')) {
          this.setAttribute(
            'href',
            `https://mediacenter.ibm.com/id/${this.getAttribute('video-id')}`
          );
        }
        this.transposeAttributes(button, ['href']);
      });
    }

    prefersAutoplayStorageKey = `${c4dPrefix}-background-video-prefers-autoplay`;
  }

  return C4DVideoPlayerContainerMixinImpl;
};

/**
 * Container component for video player.
 *
 * @element c4d-video-player-container
 */
@customElement(`${c4dPrefix}-video-player-container`)
class C4DVideoPlayerContainer extends ConnectMixin<
  VideoPlayerContainerState,
  MediaPlayerAPIActions,
  VideoPlayerContainerStateProps,
  ActionCreatorsMapObject<VideoPlayerActions>
>(
  store as Store<VideoPlayerContainerState, MediaPlayerAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(C4DVideoPlayerContainerMixin(C4DVideoPlayerComposite)) {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DVideoPlayerContainer;
