/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import FocusMixin from '@carbon/web-components/es/globals/mixins/focus.js';
import PlayVideo from '../../../es/icons/play-video.js';
import PlayOutline from '@carbon/web-components/es/icons/play--outline/20.js';
import PauseOutline from '@carbon/web-components/es/icons/pause--outline/20.js';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '@carbon/ibmdotcom-utilities/es/utilities/formatVideoCaption/formatVideoCaption.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import KalturaPlayerAPI from '@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer.js';
import {
  BUTTON_POSITION,
  VIDEO_PLAYER_CONTENT_STATE,
  VIDEO_PLAYER_PLAYING_MODE,
} from './defs';
import '../image/image';
import styles from './video-player.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import ifNonEmpty from '@carbon/web-components/es/globals/directives/if-non-empty.js';
import C4DVideoPlayerComposite from './video-player-composite';

export { VIDEO_PLAYER_CONTENT_STATE };
export { VIDEO_PLAYER_PLAYING_MODE };

const { stablePrefix: c4dPrefix } = settings;

/**
 * Video player.
 *
 * @element c4d-video-player
 * @csspart video - The video. Usage `c4d-video-player::part(video)`
 * @csspart button - The play button. Usage `c4d-video-player::part(button)`
 * @csspart image - The thumbnail image. Usage `c4d-video-player::part(image)`
 * @csspart video-container - The video container. Usage `c4d-video-player::part(video-container)`
 * @csspart caption - The caption. Usage `c4d-video-player::part(caption)`
 */
@customElement(`${c4dPrefix}-video-player`)
class C4DVideoPlayer extends FocusMixin(StableSelectorMixin(LitElement)) {
  /**
   * The video player's mode showing Inline or Lightbox.
   */
  @property({ reflect: true, attribute: 'playing-mode' })
  playingMode = VIDEO_PLAYER_PLAYING_MODE.INLINE;

  /**
   * Triggers playback on intersection with the viewport / carousel.
   */
  @property({ attribute: 'intersection-mode', reflect: true, type: Boolean })
  intersectionMode = false;

  /**
   * The current playback state, inherited from the parent.
   */
  @property()
  isPlaying = false;

  /**
   * The position of the toggle playback button.
   */
  @property({ attribute: 'button-position', reflect: true })
  buttonPosition = BUTTON_POSITION.BOTTOM_RIGHT;

  /**
   * Handles `click` event on the video thumbnail.
   */
  protected _handleClickOverlay = () => {
    if (this.playingMode === VIDEO_PLAYER_PLAYING_MODE.INLINE) {
      this.contentState = VIDEO_PLAYER_CONTENT_STATE.VIDEO;
    }
    const { videoId, name, customVideoDescription } = this;
    const { eventContentStateChange } = this
      .constructor as typeof C4DVideoPlayer;
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
  };

  protected _handleTogglePlayback = () => {
    const { videoId } = this;
    const { eventTogglePlayback } = this.constructor as typeof C4DVideoPlayer;
    this.dispatchEvent(
      new CustomEvent(eventTogglePlayback, {
        bubbles: true,
        composed: true,
        detail: {
          videoId,
        },
      })
    );
  };

  /**
   * @returns The video content.
   */
  protected _renderContent = () => {
    const {
      contentState,
      name,
      thumbnailUrl,
      backgroundMode,
      _handleClickOverlay: handleClickOverlay,
      intersectionMode,
    } = this;
    if (intersectionMode) {
      return html`
        <div class="${c4dPrefix}--video-player__video">
          ${contentState === VIDEO_PLAYER_CONTENT_STATE.THUMBNAIL
            ? html`
                <c4d-image
                  default-src="${thumbnailUrl}"
                  alt="${ifNonEmpty(name)}"
                  part="image">
                </c4d-image>
              `
            : html` <slot></slot> `}
        </div>
      `;
    } else {
      return contentState === VIDEO_PLAYER_CONTENT_STATE.THUMBNAIL &&
        !backgroundMode &&
        !this.autoplay
        ? html`
            <div class="${c4dPrefix}--video-player__video" part="video">
              <button
                class="${c4dPrefix}--video-player__image-overlay"
                part="button"
                @click="${handleClickOverlay}">
                <c4d-image
                  default-src="${thumbnailUrl}"
                  alt="${ifNonEmpty(name)}"
                  part="image">
                  ${PlayVideo({ slot: 'icon' })}
                </c4d-image>
              </button>
            </div>
          `
        : html` <slot></slot> `;
    }
  };

  /**
   * Updates video thumbnail url to match video width
   */
  protected _updateThumbnailUrl() {
    let thumbnailSrc: false | URL = false;

    try {
      thumbnailSrc = new URL(this.thumbnailUrl);
    } catch (error) {
      // Do nothing.
    }

    // If current thumbnail is from Kaltura and includes this video's ID we should be able to safely update it.
    if (
      thumbnailSrc &&
      thumbnailSrc.host.toLowerCase().includes('kaltura') &&
      thumbnailSrc.pathname.includes(this.videoId!)
    ) {
      this.thumbnailUrl = KalturaPlayerAPI.getThumbnailUrl({
        mediaId: this.videoId,
        width: String(this.offsetWidth),
      });
    }
  }

  /**
   * userInitiatedTogglePlaybackState
   */
  public userInitiatedTogglePlaybackState() {
    const { videoId } = this;
    const { eventPlaybackStateChange } = this
      .constructor as typeof C4DVideoPlayer;
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
  @property({ attribute: 'background-mode', reflect: true, type: Boolean })
  backgroundMode = false;

  /**
   * `true` to autoplay
   */
  @property({ attribute: 'auto-play', reflect: true, type: Boolean })
  autoplay = false;

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

  render() {
    const {
      aspectRatio,
      duration,
      formatCaption,
      formatDuration,
      hideCaption,
      name,
      buttonPosition,
      intersectionMode,
      _handleTogglePlayback: handleTogglePlayback,
      _renderContent: renderContent,
    } = this;

    const aspectRatioClass = classMap({
      [`${c4dPrefix}--video-player__video-container`]: true,
      [`${c4dPrefix}--video-player__aspect-ratio--${aspectRatio}`]:
        !!aspectRatio,
    });
    const togglePlaybackClass = classMap({
      [`${c4dPrefix}--video-player__toggle-playback`]: true,
      [`${c4dPrefix}--video-player__toggle-playback--${buttonPosition}`]: true,
    });

    return html`
      <div class="${aspectRatioClass}">
        ${intersectionMode
          ? html`
              <button
                class="${togglePlaybackClass}"
                @click="${handleTogglePlayback}"
                tabindex="0"
                part="button">
                ${this.isPlaying
                  ? PauseOutline({ 'aria-label': 'Pause' })
                  : PlayOutline({ 'aria-label': 'Play' })}
              </button>
            `
          : null}
        ${renderContent()}
      </div>
      ${hideCaption
        ? undefined
        : html`
            <div
              class="${c4dPrefix}--video-player__video-caption"
              part="caption">
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

    // Move measurement & API call to callback queue & wait for update to complete.
    setTimeout(async () => {
      await this.updateComplete;
      if (!this.thumbnailUrl.endsWith(`${this.offsetWidth}`)) {
        this._updateThumbnailUrl();
      }
    }, 0);
  }

  firstUpdated() {
    this.tabIndex = 0;
    this.backgroundMode = Boolean(
      (this.parentElement as C4DVideoPlayerComposite)?.backgroundMode
    );
    this.intersectionMode = Boolean(
      (this.parentElement as C4DVideoPlayerComposite)?.intersectionMode
    );
    this.autoplay = Boolean(
      (this.parentElement as C4DVideoPlayerComposite)?.autoPlay
    );
  }

  /**
   * The name of the custom event fired after video content state is changed upon a user gesture.
   */
  static get eventContentStateChange() {
    return `${c4dPrefix}-video-player-content-state-changed`;
  }

  /**
   * The name of the custom event fired requesting playback state change.
   */
  static get eventPlaybackStateChange() {
    return `${c4dPrefix}-video-player-playback-state-changed`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--video-player`;
  }

  /**
   * The name of the custom event fired when a user action toggles playback.
   */
  static get eventTogglePlayback() {
    return `${c4dPrefix}-video-player-toggle-playback`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DVideoPlayer;
