/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2025
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
import { property } from 'lit/decorators.js';
import KalturaPlayerAPI from '@carbon/ibmdotcom-services/es/services/KalturaPlayerV7/KalturaPlayer.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import store from '../../internal/vendor/@carbon/ibmdotcom-services-store/store.js';
import {
  MediaData,
  MediaPlayerAPIState,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/kalturaPlayerAPIv7';
import { loadMediaData } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/kalturaPlayerAPIv7.js';
import { MediaPlayerAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/kalturaPlayerAPIv7';
import { Constructor } from '../../globals/defs';
import ConnectMixin from '../../globals/mixins/connect';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DAudioPlayerComposite from './audio-player-composite';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The Redux state used for `<c4d-audio-player-container>`.
 */
export interface AudioPlayerContainerState {
  /**
   * The Redux state for `KalturaPlayerAPI`.
   */
  kalturaPlayerAPI?: MediaPlayerAPIState;
}

/**
 * The properties for `<c4d-audio-player-container>` from Redux state.
 */
export interface AudioPlayerContainerStateProps {
  /**
   * The media data, keyed by the media ID.
   */
  mediaData?: { [videoId: string]: MediaData };
}

export type AudioPlayerActions = ReturnType<typeof loadMediaData>;

/**
 * @param state The Redux state for audio player.
 * @returns The converted version of the given state, tailored for `<c4d-audio-player-container>`.
 */
export function mapStateToProps(
  state: AudioPlayerContainerState
): AudioPlayerContainerStateProps {
  const { kalturaPlayerAPI } = state;
  const { mediaData } = kalturaPlayerAPI ?? {};
  return !mediaData ? {} : { mediaData };
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<c4d-audio-player-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch<MediaPlayerAPIActions>) {
  return bindActionCreators<
    AudioPlayerActions,
    ActionCreatorsMapObject<AudioPlayerActions>
  >(
    {
      _loadVideoData: loadMediaData,
    },
    dispatch as Dispatch
  );
}

/**
 * @param Base The base class.
 * @returns A mix-in that implements audio embedding API calls.
 */
export const C4DAudioPlayerContainerMixin = <
  T extends Constructor<HTMLElement>
>(
  Base: T
) => {
  /**
   * A mix-in class for audio player container functionality.
   */
  abstract class C4DAudioPlayerContainerMixinImpl extends StableSelectorMixin(
    Base
  ) {
    /**
     * The audio player.
     */
    abstract _audioPlayer?: HTMLElement;

    /**
     * The embedded Kaltura player element (that has APIs), keyed by the media ID.
     */
    abstract embeddedVideos?: { [videoId: string]: any };

    /**
     * The request for the embedded Kaltura player element, keyed by the media ID.
     *
     * @protected
     */
    _requestsEmbedVideo: { [videoId: string]: Promise<any> } = {};

    /**
     * Custom audio title.
     */
    @property({ type: String, attribute: 'audio-title' })
    audioTitle = '';

    /**
     * Optional: Override the default UI configuration ID.
     * Defaults to audio-specific configuration.
     */
    @property({ attribute: 'ui-conf-id' })
    uiConfId?: string;

    /**
     * Optional: Override the default partner ID.
     */
    @property({ attribute: 'partner-id' })
    partnerId?: string;

    /**
     * Sets the state that the API call for embedding the audio is in progress.
     *
     * @param mediaId The media ID.
     * @param request The promise of the API call.
     * @private
     */
    _setRequestEmbedVideoInProgress(mediaId: string, request: Promise<any>) {
      const { _requestsEmbedVideo: oldRequestsEmbedVideo } = this;
      this._requestsEmbedVideo = {
        ...oldRequestsEmbedVideo,
        [mediaId]: request,
      };
    }

    /**
     * Set the state that the API call for embedding failed.
     *
     * @param mediaId The media ID.
     * @param error An error from the API call.
     * @private
     */
    _setErrorRequestEmbedVideo(mediaId: string, error: Error) {
      this._setRequestEmbedVideoInProgress(mediaId, Promise.reject(error));
    }

    /**
     * Sets the given embedded Kaltura player element.
     *
     * @param mediaId The media ID.
     * @param kalturaPlayer The embedded Kaltura player element.
     * @private
     */
    _setEmbeddedVideo(mediaId: string, kalturaPlayer: any) {
      this._setRequestEmbedVideoInProgress(
        mediaId,
        Promise.resolve(kalturaPlayer)
      );
      const { embeddedVideos: oldEmbeddedVideos } = this;
      this.embeddedVideos = {
        ...oldEmbeddedVideos,
        [mediaId]: kalturaPlayer,
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

      if (storedValue === null) {
        return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      } else {
        return Boolean(parseInt(storedValue, 10));
      }
    }

    _getPlayerOptions() {
      const { autoPlay, muted } =
        this as unknown as C4DAudioPlayerComposite;

      const audioTitle = this.audioTitle || this?.['audioTitle'];
      const autoplayPreference = this._getAutoplayPreference();

      const playerOptions: any = {
        playerType: 'AUDIO',
        playerUiConfId: this.uiConfId || '57792222',
        partnerId: this.partnerId || '1773841',
        muted,
        autoPlay: autoPlay ? autoplayPreference : false,
      };

      if (audioTitle) {
        playerOptions.mediaTitle = audioTitle;
      }

      return playerOptions;
    }

    /**
     * Sets up and sends the API call for embedding audio.
     *
     * @param mediaId The media ID.
     * @private
     */
    async _embedVideoImpl(mediaId: string) {
      const doc = Object.prototype.hasOwnProperty.call(this, 'getRootNode')
        ? (this.getRootNode() as Document | ShadowRoot)
        : this.ownerDocument;
      
      const { _audioPlayer: audioPlayer } = this;
      if (!audioPlayer) {
        throw new TypeError(
          'Cannot find the audio player component to put the audio content into.'
        );
      }

      // Check if audio is already embedded
      const existingWrapper = audioPlayer.querySelector(
        `[data-video-id="${mediaId}"]`
      );
      
      if (existingWrapper) {
        const existingPlayer = this.embeddedVideos?.[mediaId];
        if (existingPlayer) {
          return existingPlayer;
        }
        existingWrapper.remove();
      }

      // Create unique player ID
      const playerId = `audio-player-${mediaId}-${Math.random().toString(36).slice(2)}`;
      
      // Create wrapper container for isolation
      const wrapper = document.createElement('div');
      wrapper.className = `${c4dPrefix}--audio-player__wrapper`;
      wrapper.dataset.videoId = mediaId;
      
      // Create player div
      const div = document.createElement('div');
      div.id = playerId;
      div.className = `${c4dPrefix}--audio-player__player`;
      
      // Nest div inside wrapper
      wrapper.appendChild(div);
      audioPlayer.appendChild(wrapper);

      try {
        const embedVideoHandle = await KalturaPlayerAPI.embedMedia(
          mediaId,
          playerId,
          this._getPlayerOptions()
        );
        
        return embedVideoHandle;
      } catch (error) {
        // Clean up on error
        wrapper.remove();
        throw error;
      }
    }

    /**
     * Sends the API call for embedding audio and tracks progress.
     *
     * @param mediaId The media ID.
     * @internal
     */
    _embedMedia = async (mediaId: string) => {
      const { _requestsEmbedVideo: requestsEmbedVideo } = this;
      const requestEmbedVideo = requestsEmbedVideo[mediaId];

      if (requestEmbedVideo) {
        return requestEmbedVideo;
      }

      const promiseEmbedVideo = this._embedVideoImpl(mediaId);

      this._setRequestEmbedVideoInProgress(mediaId, promiseEmbedVideo);
      try {
        this._setEmbeddedVideo(mediaId, await promiseEmbedVideo);
      } catch (error) {
        this._setErrorRequestEmbedVideo(mediaId, error as Error);
      }
      return promiseEmbedVideo;
    };

    /**
     * The audio player element.
     */
    protected get _audioPlayer() {
      return this.querySelector(`${c4dPrefix}-audio-player`);
    }

    prefersAutoplayStorageKey = `${c4dPrefix}-audio-player-prefers-autoplay`;
  }

  return C4DAudioPlayerContainerMixinImpl;
};

/**
 * Container component for audio player.
 *
 * @element c4d-audio-player-container
 */
@customElement(`${c4dPrefix}-audio-player-container`)
class C4DAudioPlayerContainer extends ConnectMixin<
  AudioPlayerContainerState,
  MediaPlayerAPIActions,
  AudioPlayerContainerStateProps,
  ActionCreatorsMapObject<AudioPlayerActions>
>(
  store as Store<AudioPlayerContainerState, MediaPlayerAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(C4DAudioPlayerContainerMixin(C4DAudioPlayerComposite)) {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DAudioPlayerContainer;
