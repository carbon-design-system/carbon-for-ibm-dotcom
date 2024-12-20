/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import pauseIcon from '@carbon/web-components/es/icons/pause--outline--filled/32.js';
import playIcon from '@carbon/web-components/es/icons/play--filled/32.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './background-media.scss?lit';
import { GRADIENT_DIRECTION, MOBILE_POSITION } from './defs';
import C4DImage from '../image/image';
import C4DVideoPlayerContainer from '../video-player/video-player-container';
import C4DLeadSpace from '../leadspace/leadspace';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Background media.
 *
 * @element c4d-background-media
 * @csspart controls - The video player controls. Usage: `c4d-background-media::part(controls)`
 * @csspart gradient - The gradient covering the image. Usage: `c4d-background-media::part(gradient)`
 * @csspart container - The component's container. Usage: `c4d-background-media::part(container)`
 * @csspart item - The image container. Usage: `c4d-background-media::part(item)`
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
    const { videoPlayerContainer: video } = this;
    return classMap({
      [`${prefix}--background-media--container`]: true,
      [`${prefix}--background-media--mobile-position`]: true,
      [`${prefix}--background-media--mobile-position--${this.mobilePosition}`]:
        this.mobilePosition,
      [`${prefix}--background-media--image`]: video === null,
      [`${prefix}--background-media--video`]: video !== null,
    });
  }

  /**
   * The opacity of the background image or video. 100 is fully visible, 0 is fully transparent.
   */
  @property({ attribute: 'opacity', reflect: true })
  backgroundOpacity = 100;

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
  gradientHidden = false;

  /**
   * @deprecated
   *
   * Mobile Position (bottom (default) | top)
   */
  @property({ attribute: 'mobile-position', reflect: true })
  mobilePosition = MOBILE_POSITION.BOTTOM;

  /**
   * Query selector to get the child video player container
   */
  protected get videoPlayerContainer() {
    return this.querySelector(
      `${c4dPrefix}-video-player-container`
    ) as C4DVideoPlayerContainer | null;
  }

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
    ) as C4DVideoPlayerContainer[];

    if (assignedImages.length && !assignedVideos.length) {
      this.containsOnlyImages = true;
    }
  }

  toggleVideoState() {
    const { videoPlayerContainer: video } = this;

    if (video?.isPlaying) {
      video.pauseAllVideos();
    } else {
      video?.playAllVideos();
    }

    this.requestUpdate();
  }

  renderVideoControls() {
    const { toggleVideoState, videoPlayerContainer } = this;
    const { isPlaying } = videoPlayerContainer ?? {};

    return html`
      <button
        part="controls"
        @click=${toggleVideoState}
        class="${prefix}--video-player__controls"
        aria-pressed="${!isPlaying}"
        aria-label="${isPlaying ? 'Pause the video' : 'Play the video'}"
        hasTooltip>
        ${isPlaying ? pauseIcon() : playIcon()}
      </button>
    `;
  }

  renderGradient() {
    return html`
      <div part="gradient" class="${this._getGradientClass()}"></div>
    `;
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

    if (this.hasAttribute('default-src') && !this.videoPlayerContainer) {
      this.containsOnlyImages = true;
    }
  }

  render() {
    return html`
      <div part="container" class="${this._getMobilePositionClass()}">
        ${this.gradientHidden ? '' : this.renderGradient()}
        <div
          part="item"
          class="${prefix}--background-media--item"
          style="${this._getMediaOpacity()}">
          ${this.containsOnlyImages ? super.render() : ''}
          <slot @slotchange="${this._handleBackgroundMedia}"></slot>
        </div>
      </div>
      ${this.videoPlayerContainer ? this.renderVideoControls() : ''}
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--background-media`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DBackgroundMedia;
