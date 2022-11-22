/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import KalturaPlayerAPI from '../../internal/vendor/@carbon/ibmdotcom-services/services/KalturaPlayer/KalturaPlayer';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import { MediaData } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/kalturaPlayerAPI.d';
import {
  VIDEO_PLAYER_CONTENT_STATE,
  VIDEO_PLAYER_PLAYING_MODE,
} from './video-player';
// Above import is interface-only ref and thus code won't be brought into the build
import './video-player';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Component that renders video player from its metadata, etc.
 *
 * @element dds-video-player-composite
 */
@customElement(`${ddsPrefix}-video-player-composite`)
class DDSVideoPlayerComposite extends HybridRenderMixin(
  HostListenerMixin(LitElement)
) {
  /**
   * The placeholder for `_loadVideoData()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadVideoData?: (videoId: string) => Promise<MediaData>;

  /**
   * The placeholder for `_loadVideoData()` Redux action that may be mixed in.
   *
   * @internal
   */
  _embedMedia?: (videoId: string, backgroundMode?: boolean) => Promise<any>;

  /**
   * The placeholder for `_setAutoplayPreference()` Redux action that may be mixed in.
   */
  // @ts-ignore
  _setAutoplayPreference: (preference: boolean) => void;

  /**
   * The placeholder for `_getAutoplayPreference()` Redux action that may be mixed in.
   */
  // @ts-ignore
  _getAutoplayPreference: () => null | boolean;

  /**
   * Activate the DOM nodes for the embedded video of the given video ID, and deactivates others.
   *
   * @param videoId The video ID to activate.
   */
  protected _activateEmbeddedVideo(videoId: string) {
    const { embeddedVideos = {} } = this;
    Object.keys(embeddedVideos).forEach((key) => {
      embeddedVideos[key].sendNotification(
        key === videoId ? 'doPlay' : 'doStop'
      );
    });
  }

  /**
   * The video player.
   */
  protected get _videoPlayer() {
    const { selectorVideoPlayer } = this
      .constructor as typeof DDSVideoPlayerComposite;
    return this.querySelector(selectorVideoPlayer);
  }

  /**
   * Handles `dds-video-player-content-state-changed` event.
   * Such event is fired when user changes video content state, e.g. from thumbnail to video player.
   *
   * @param event The event.
   */
  @HostListener('eventContentStateChange')
  protected _handleContentStateChange(event: CustomEvent) {
    const { contentState, playingMode, videoId } = event.detail;
    if (
      contentState === VIDEO_PLAYER_CONTENT_STATE.VIDEO &&
      playingMode === VIDEO_PLAYER_PLAYING_MODE.INLINE &&
      videoId
    ) {
      this._embedMedia?.(videoId, this.backgroundMode);
    }
  }

  @HostListener('eventPlaybackStateChange')
  protected _handlePlaybackStateChange(event: CustomEvent) {
    const { videoId } = event.detail;
    const { embeddedVideos = {} } = this;

    if (this.isPlaying) {
      embeddedVideos[videoId].sendNotification('doPause');
      this.isPlaying = false;
    } else {
      embeddedVideos[videoId].sendNotification('doPlay');
      this.isPlaying = true;
    }

    this._setAutoplayPreference(this.isPlaying);
  }

  pauseAllVideos() {
    const { embeddedVideos = {} } = this;

    Object.keys(embeddedVideos).forEach((videoId) => {
      embeddedVideos[videoId].sendNotification('doPause');
    });
    this.isPlaying = false;
  }

  playAllVideos() {
    const { embeddedVideos = {} } = this;

    Object.keys(embeddedVideos).forEach((videoId) => {
      embeddedVideos[videoId].sendNotification('doPlay');
    });
    this.isPlaying = false;
  }

  /**
   * `true` to autoplay the videos.
   */
  @property({ type: Boolean, attribute: 'auto-play' })
  autoPlay = false;

  /**
   * The embedded Kaltura player element (that has `.sendNotification()`, etc. APIs), keyed by the video ID.
   */
  @property({ attribute: false })
  embeddedVideos?: { [videoId: string]: any };

  /**
   * Optional custom video caption.
   */
  @property({ reflect: true, attribute: 'caption' })
  caption?: '';

  /**
   * Custom video description. This property should only be set when `playing-mode="lightbox"`.
   */
  @property({ reflect: true, attribute: 'video-description' })
  customVideoDescription?: string;

  /**
   * The formatter for the video caption, composed with the video name and the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatCaption?: ({
    duration,
    name,
  }: {
    duration?: string;
    name?: string;
  }) => string;

  /**
   * The formatter for the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatDuration?: ({ duration }: { duration?: number }) => string;

  /**
   * `true` to hide the caption.
   */
  @property({ type: Boolean, attribute: 'hide-caption' })
  hideCaption = false;

  /**
   * `true` to autoplay, mute, and hide player UI.
   */
  @property({ type: Boolean, attribute: 'background-mode' })
  backgroundMode = false;

  /**
   * The video data, keyed by the video ID.
   */
  @property({ attribute: false })
  mediaData?: { [videoId: string]: MediaData };

  /**
   * The video ID.
   */
  @property({ attribute: 'video-id' })
  videoId = '';

  /**
   * The aspect ratio.
   */
  @property({ attribute: 'aspect-ratio' })
  aspectRatio?: '';

  /**
   * The current playback state
   */
  @property()
  isPlaying = false;

  /**
   * The video player's mode showing Inline or Lightbox.
   */
  @property({ reflect: true, attribute: 'playing-mode' })
  playingMode = VIDEO_PLAYER_PLAYING_MODE.INLINE;

  /**
   * Optional custom video thumbnail
   */
  @property({ reflect: true, attribute: 'thumbnail' })
  thumbnail?: '';

  /**
   * The video thumbnail width.
   */
  @property({ type: Number, attribute: 'video-thumbnail-width' })
  videoThumbnailWidth = 3;

  connectedCallback() {
    super.connectedCallback();

    if (this.backgroundMode) {
      this.hideCaption = true;
    }

    if (this.autoPlay || this.backgroundMode) {
      const storedPreference = this._getAutoplayPreference();
      if (storedPreference === null) {
        this.isPlaying = !window.matchMedia('(prefers-reduced-motion: reduce)')
          .matches;
      } else {
        this.isPlaying = storedPreference;
      }
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('videoId')) {
      const { autoPlay, videoId, backgroundMode } = this;
      this._activateEmbeddedVideo(videoId);
      if (videoId) {
        this._loadVideoData?.(videoId);
        if (autoPlay || backgroundMode) {
          this._embedMedia?.(videoId, backgroundMode);
        }
      }
    }
  }

  renderLightDOM() {
    const {
      aspectRatio,
      formatCaption,
      formatDuration,
      hideCaption,
      caption,
      customVideoDescription,
      mediaData = {},
      videoId,
      videoThumbnailWidth,
      thumbnail,
      playingMode,
    } = this;
    const { [videoId]: currentVideoData = {} as MediaData } = mediaData;
    const { duration, name } = currentVideoData;
    const thumbnailUrl =
      thumbnail ||
      KalturaPlayerAPI.getThumbnailUrl({
        mediaId: videoId,
        width: String(videoThumbnailWidth),
      });
    return html`
      <dds-video-player
        duration="${ifNonNull(duration)}"
        ?hide-caption=${hideCaption}
        name="${ifNonNull(caption || name)}"
        video-description="${ifNonNull(customVideoDescription)}"
        thumbnail-url="${ifNonNull(thumbnailUrl)}"
        video-id="${ifNonNull(videoId)}"
        aspect-ratio="${ifNonNull(aspectRatio)}"
        .formatCaption="${ifNonNull(formatCaption)}"
        .formatDuration="${ifNonNull(formatDuration)}"
        playing-mode="${ifNonNull(playingMode)}">
      </dds-video-player>
    `;
  }

  render() {
    return html` <slot></slot> `;
  }

  /**
   * A selector selecting the video player component.
   */
  static get selectorVideoPlayer() {
    return `${ddsPrefix}-video-player`;
  }

  /**
   * The name of the custom event fired after video content state is changed upon a user gesture.
   */
  static get eventContentStateChange() {
    return `${ddsPrefix}-video-player-content-state-changed`;
  }

  /**
   * The name of the custom event fired requesting playback state change.
   */
  static get eventPlaybackStateChange() {
    return `${ddsPrefix}-video-player-playback-state-changed`;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSVideoPlayerComposite;
