/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import pauseIcon from '../../internal/vendor/@carbon/web-components/icons/pause--outline--filled/32.js';
import playIcon from '../../internal/vendor/@carbon/web-components/icons/play--filled/32.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './background-media.scss';
import { GRADIENT_DIRECTION, MOBILE_POSITION } from './defs';
import C4DImage from '../image/image';
import C4DVideoPlayer from '../video-player/video-player';
import C4DVideoPlayerContainer from '../video-player/video-player-container';
import C4DLeadSpace from '../leadspace/leadspace';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Background media.
 *
 * @element c4d-background-media
 */

@customElement(`${c4dPrefix}-background-media`)
class C4DBackgroundMedia extends C4DImage {
  /**
   * Returns a class-name based on the Gradient Direction type
   */
  protected _getGradientClass() {
    return classMap({
      [`${prefix}--background-media--gradient`]: true,
      [`${prefix}--background-media--gradient--${this.gradientDirection}`]:
        this.gradientDirection,
    });
  }

  /**
   * Returns a class-name based on the Mobile Position type
   */
  protected _getMobilePositionClass() {
    return classMap({
      [`${prefix}--background-media--container`]: true,
      [`${prefix}--background-media--mobile-position`]: true,
      [`${prefix}--background-media--mobile-position--${this.mobilePosition}`]:
        this.mobilePosition,
      [`${prefix}--background-media--image`]: this.videoPlayer === null,
      [`${prefix}--background-media--video`]: this.videoPlayer !== null,
    });
  }

  /**
   * The opacity of the background image or video. 100 is fully visible, 0 is fully transparent.
   */
  @property({ attribute: 'opacity', reflect: true })
  backgroundOpacity: number = 100;

  /**
   * Set to true in _handleBackgroundMedia if all children are `c4d-image-item`
   */
  @property()
  containsOnlyImages = false;

  /**
   * Gradient Direction (left-to-right (default) | top-to-bottom)
   */
  @property({ attribute: 'gradient-direction', reflect: true })
  gradientDirection = GRADIENT_DIRECTION.LEFT_TO_RIGHT;

  /**
   * Option to hide gradient. Automatically set to yes if parent is c4d-leadspace
   */
  @property()
  gradientHidden: boolean = false;

  /**
   * @deprecated
   *
   * Mobile Position (bottom (default) | top)
   */
  @property({ attribute: 'mobile-position', reflect: true })
  mobilePosition = MOBILE_POSITION.BOTTOM;

  /**
   * Internal storage of the video ID
   */
  @property()
  videoId: String | null = null;

  /**
   * Current state of video playback
   */
  @property()
  videoIsPlaying: Boolean = false;

  /**
   * Internal storage of the video player comonent
   */
  @property()
  videoPlayer: C4DVideoPlayer | null = null;

  /**
   * Conditionally runs super.render() if all children are `c4d-image-item`
   */
  private _handleBackgroundMedia(event: Event) {
    const assignedElements = (
      event.target as HTMLSlotElement
    )?.assignedElements();
    const assignedImages = assignedElements.filter(
      (el) => el.tagName === `${c4dPrefix}-image-item`.toUpperCase()
    );
    const assignedVideos = assignedElements.filter(
      (el) => el.tagName === `${c4dPrefix}-video-player-container`.toUpperCase()
    );

    if (
      assignedElements.length === assignedImages.length &&
      !assignedVideos.length
    ) {
      this.containsOnlyImages = true;
    }

    if (assignedVideos.length) {
      const [video] = assignedVideos;
      this.videoId = video.getAttribute('video-id');
      this.videoPlayer = video.querySelector(`${c4dPrefix}-video-player`);
      this.videoIsPlaying = (video as C4DVideoPlayerContainer).isPlaying;
    }
  }

  toggleVideoState() {
    this.videoPlayer?.userInitiatedTogglePlaybackState();
    this.videoIsPlaying = !this.videoIsPlaying;
  }

  renderVideoControls() {
    const { toggleVideoState, videoIsPlaying } = this;

    return html`
      <button
        @click=${toggleVideoState}
        class="${prefix}--video-player__controls"
        aria-pressed="${!videoIsPlaying}"
        aria-label="${videoIsPlaying ? 'Pause the video' : 'Play the video'}"
        hasTooltip>
        ${videoIsPlaying ? pauseIcon() : playIcon()}
      </button>
    `;
  }

  renderGradient() {
    return html` <div class="${this._getGradientClass()}"></div> `;
  }

  _getMediaOpacity() {
    if (this.backgroundOpacity <= 100 && this.backgroundOpacity >= 0) {
      return `opacity:${this.backgroundOpacity / 100}`;
    }
    return '';
  }

  /**
   * Append the c4d-background-media to the parent element where this component is being used.
   */
  updated() {
    // mobilePosition attribute deprecated
    if (this.mobilePosition === MOBILE_POSITION.TOP) {
      this.parentElement?.shadowRoot?.prepend(this);
    }

    if (this.parentElement instanceof C4DLeadSpace) {
      this.gradientHidden = true;
    }

    if (this.hasAttribute('default-src') && !this.videoId) {
      this.containsOnlyImages = true;
    }
  }

  render() {
    return html`
      <div class="${this._getMobilePositionClass()}">
        ${this.gradientHidden ? '' : this.renderGradient()}
        <div
          class="${prefix}--background-media--item"
          style="${this._getMediaOpacity()}">
          ${this.containsOnlyImages ? super.render() : ''}
          <slot @slotchange="${this._handleBackgroundMedia}"></slot>
        </div>
      </div>
      ${this.videoId ? this.renderVideoControls() : ''}
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--background-media`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DBackgroundMedia;
