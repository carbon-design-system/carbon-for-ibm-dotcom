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
import { ifDefined } from 'lit/directives/if-defined.js';
import FocusMixin from '@carbon/web-components/es/globals/mixins/focus.js';
import PlayVideo from '../../../es/icons/play-video.js';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '@carbon/ibmdotcom-utilities/es/utilities/formatVideoCaption/formatVideoCaption.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import KalturaPlayerAPI from '@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer.js';
import { VIDEO_PLAYER_CONTENT_STATE, VIDEO_PLAYER_PLAYING_MODE } from './defs';
import '../image/image';
import styles from './video-player.scss?lit';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DVideoPlayerContainer from './video-player-container';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

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
   * Handles `click` event on the video thumbnail.
   */
  private _handleClickOverlay() {
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
  }

  /**
   * @returns The video content.
   */
  private _renderContent() {
    const { contentState, name, thumbnailUrl, backgroundMode } = this;
    return contentState === VIDEO_PLAYER_CONTENT_STATE.THUMBNAIL &&
      !backgroundMode
      ? html`
          <div class="${c4dPrefix}--video-player__video" part="video">
            <button
              class="${c4dPrefix}--video-player__image-overlay"
              part="button"
              @click="${this._handleClickOverlay}">
              <c4d-image
                default-src="${thumbnailUrl}"
                alt="${ifDefined(name)}"
                part="image">
                ${PlayVideo()}
              </c4d-image>
            </button>
          </div>
        `
      : html` <slot></slot> `;
  }

  /**
   * Updates video thumbnail url to match video width
   */
  private _updateThumbnailUrl() {
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
  @property({ attribute: 'background-mode', reflect: true })
  backgroundMode = false;

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
    } = this;

    const aspectRatioClass = classMap({
      [`${c4dPrefix}--video-player__video-container`]: true,
      [`${c4dPrefix}--video-player__aspect-ratio--${aspectRatio}`]:
        !!aspectRatio,
    });

    return html`
      <div class="${aspectRatioClass}" part="video-container">
        ${this._renderContent()}
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
    const parentIsBackground = Boolean(
      (this.parentElement as C4DVideoPlayerContainer)?.backgroundMode
    );

    this.backgroundMode = parentIsBackground;
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

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DVideoPlayer;
