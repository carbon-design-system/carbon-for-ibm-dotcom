/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import ifNonNull from '@carbon/carbon-web-components/es/globals/directives/if-non-null.js';
import FocusMixin from '@carbon/carbon-web-components/es/globals/mixins/focus.js';
import PlayVideo from '@carbon/ibmdotcom-styles/icons/svg/play-video.svg';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/formatVideoCaption/formatVideoCaption.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import KalturaPlayerAPI from '../../internal/vendor/@carbon/ibmdotcom-services/services/KalturaPlayer/KalturaPlayer';
import { VIDEO_PLAYER_CONTENT_STATE, VIDEO_PLAYER_PLAYING_MODE } from './defs';
import '../image/image';
import styles from './video-player.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSVideoPlayerContainer from './video-player-container';
import ParentVisibilityMixin from '../../component-mixins/parent-visibility/parent-visibility';

export { VIDEO_PLAYER_CONTENT_STATE };
export { VIDEO_PLAYER_PLAYING_MODE };

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Video player.
 *
 * @element dds-video-player
 */
@customElement(`${ddsPrefix}-video-player`)
class DDSVideoPlayer extends FocusMixin(
  StableSelectorMixin(ParentVisibilityMixin(LitElement))
) {
  /**
   * The video player's mode showing Inline or Lightbox.
   */
  @property({ reflect: true, attribute: 'playing-mode' })
  playingMode = VIDEO_PLAYER_PLAYING_MODE.INLINE;

  /**
   * Handles `click` event on the video thumbnail.
   */
  private _handleClickOverlay() {
    if (this.playingMode === VIDEO_PLAYER_PLAYING_MODE.INLINE) {
      this.contentState = VIDEO_PLAYER_CONTENT_STATE.VIDEO;
    }
    const { videoId, name, customVideoDescription } = this;
    const { eventContentStateChange } = this
      .constructor as typeof DDSVideoPlayer;
    this.dispatchEvent(
      new CustomEvent(eventContentStateChange, {
        bubbles: true,
        composed: true,
        detail: {
          videoId,
          contentState: VIDEO_PLAYER_CONTENT_STATE.VIDEO,
          playingMode: this.playingMode,
          name,
          customVideoDescription,
        },
      })
    );
  }

  /**
   * @returns The video content.
   */
  private _renderContent() {
    const { contentState, name, thumbnailUrl, backgroundMode } = this;
    return contentState === VIDEO_PLAYER_CONTENT_STATE.THUMBNAIL &&
      !backgroundMode
      ? html`
          <div class="${prefix}--video-player__video">
            <button
              class="${prefix}--video-player__image-overlay"
              @click="${this._handleClickOverlay}">
              <dds-image default-src="${thumbnailUrl}" alt="${ifNonNull(name)}">
                ${PlayVideo({ slot: 'icon' })}
              </dds-image>
            </button>
          </div>
        `
      : html` <slot></slot> `;
  }

  /**
   * Updates video thumbnail url to match video width
   */
  private _updateThumbnailUrl() {
    const thumbnailSrc = new URL(this.thumbnailUrl || '');

    // If current thumbnail is from Kaltura and includes this video's ID we should be able to safely update it.
    if (
      thumbnailSrc.host.toLowerCase().includes('kaltura') &&
      thumbnailSrc.pathname.includes(this.videoId!)
    ) {
      this.thumbnailUrl = KalturaPlayerAPI.getThumbnailUrl({
        mediaId: this.videoId,
        width: String(this.offsetWidth),
      });
    }
  }

  public _onParentVisible() {
    this._updateThumbnailUrl();
  }

  /**
   * userInitiatedTogglePlaybackState
   */
  public userInitiatedTogglePlaybackState() {
    const { videoId } = this;
    const { eventPlaybackStateChange } = this
      .constructor as typeof DDSVideoPlayer;
    this.dispatchEvent(
      new CustomEvent(eventPlaybackStateChange, {
        bubbles: true,
        composed: true,
        detail: {
          videoId,
          playingMode: this.playingMode,
        },
      })
    );
  }

  /**
   * The video player's content state.
   */
  @property({ reflect: true, attribute: 'content-state' })
  contentState = VIDEO_PLAYER_CONTENT_STATE.THUMBNAIL;

  /**
   * The video duration.
   */
  @property({ type: Number })
  duration?: number;

  /**
   * The formatter for the video caption, composed with the video name and the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatCaption = formatVideoCaption;

  /**
   * The formatter for the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatDuration = formatVideoDuration;

  /**
   * `true` to hide the caption.
   */
  @property({ type: Boolean, attribute: 'hide-caption' })
  hideCaption = false;

  /**
   * The video name.
   */
  @property()
  name = '';

  /**
   * `true` to autoplay, mute video, and hide UI
   */
  @property({ attribute: 'background-mode', reflect: true })
  backgroundMode: boolean = false;

  /**
   * Custom video description. This property should only be set when using `playing-mode="lightbox"`
   */
  @property({ attribute: 'video-description' })
  customVideoDescription?: string;

  /**
   * The thumbnail URL.
   */
  @property({ attribute: 'thumbnail-url' })
  thumbnailUrl = '';

  /**
   * The video ID.
   */
  @property({ attribute: 'video-id' })
  videoId?: string;

  /**
   * Override default aspect ratio of `16x9`.
   * Available aspect ratios:
   *
   * `16x9`, `9x16`, `2x1`, `1x2`, `4x3`, `3x4`, `1x1`
   */
  @property({ attribute: 'aspect-ratio' })
  aspectRatio?: string;

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus:
        Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <=
        537,
    });
  }

  render() {
    const {
      aspectRatio,
      duration,
      formatCaption,
      formatDuration,
      hideCaption,
      name,
    } = this;

    const aspectRatioClass = classMap({
      [`${prefix}--video-player__video-container`]: true,
      [`${prefix}--video-player__aspect-ratio--${aspectRatio}`]: !!aspectRatio,
    });

    return html`
      <div class="${aspectRatioClass}">${this._renderContent()}</div>
      ${hideCaption
        ? undefined
        : html`
            <div class="${prefix}--video-player__video-caption">
              ${formatCaption({
                duration: formatDuration({
                  duration: !duration ? duration : duration * 1000,
                }),
                name,
              })}
            </div>
          `}
    `;
  }

  updated(changedProperties) {
    if (
      changedProperties.has('duration') ||
      changedProperties.has('formatCaption') ||
      changedProperties.has('name') ||
      changedProperties.has('backgroundMode')
    ) {
      const { duration, formatCaption, formatDuration, name } = this;
      const caption = formatCaption({
        duration: formatDuration({
          duration: !duration ? duration : duration * 1000,
        }),
        name,
      });
      if (caption) {
        this.setAttribute('aria-label', caption);
      }
    }

    if (this.offsetWidth > 0) {
      this._updateThumbnailUrl();
    }
  }

  firstUpdated() {
    this.tabIndex = 0;

    this.backgroundMode = (
      this.parentElement as DDSVideoPlayerContainer
    ).backgroundMode;
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

  static get stableSelector() {
    return `${ddsPrefix}--video-player`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSVideoPlayer;
