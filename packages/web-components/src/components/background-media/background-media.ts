/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { getAttributes, toSVG } from '@carbon/icon-helpers';
import pauseIcon32 from '@carbon/icons/es/pause--outline--filled/32';
import playIcon32 from '@carbon/icons/es/play--filled/32';
import styles from './background-media.scss';
import { GRADIENT_DIRECTION, MOBILE_POSITION } from './defs';
import DDSImage from '../image/image';
import DDSVideoPlayer from '../video-player/video-player';
import DDSVideoPlayerContainer from '../video-player/video-player-container';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;
const playIcon = toSVG({
  ...playIcon32,
  attrs: getAttributes(playIcon32.attrs),
});
const pauseIcon = toSVG({
  ...pauseIcon32,
  attrs: getAttributes(pauseIcon32.attrs),
});

/**
 * Background media.
 *
 * @element dds-background-media
 */

@customElement(`${ddsPrefix}-background-media`)
class DDSBackgroundMedia extends DDSImage {
  /**
   * Returns a class-name based on the Gradient Direction type
   */
  protected _getGradientClass() {
    return classMap({
      [`${prefix}--background-media--gradient`]: true,
      [`${prefix}--background-media--gradient--${this.gradientDirection}`]: this.gradientDirection,
    });
  }

  /**
   * Returns a class-name based on the Mobile Position type
   */
  protected _getMobilePositionClass() {
    return classMap({
      [`${prefix}--background-media--mobile-position`]: true,
      [`${prefix}--background-media--mobile-position--${this.mobilePosition}`]: this.mobilePosition,
    });
  }

  /**
   * Gradient Direction (left-to-right (default) | top-to-bottom)
   */
  @property({ attribute: 'gradient-direction', reflect: true })
  gradientDirection = GRADIENT_DIRECTION.LEFT_TO_RIGHT;

  /**
   * Mobile Position (bottom (default) | top)
   */
  @property({ attribute: 'mobile-position', reflect: true })
  mobilePosition = MOBILE_POSITION.BOTTOM;

  /**
   * Set to true in _handleBackgroundMedia if all children are `dds-image-item`
   */
  @property()
  containsOnlyImages = false;

  /**
   * Set to true in _handleBackgroundMedia if any children are `dds-video-player-container`
   */
  @property()
  videoId: String | null = null;

  @property()
  videoPlayer: DDSVideoPlayer | null = null;

  @property()
  videoIsPlaying: Boolean = false;

  @property({ attribute: 'opacity', reflect: true })
  backgroundOpacity: number = 100;

  /**
   * Conditionally runs super.render() if all children are `dds-image-item`
   */
  private _handleBackgroundMedia(event: Event) {
    const assignedElements = (event.target as HTMLSlotElement)?.assignedElements();
    const assignedImages = assignedElements.filter(el => el.tagName === `${ddsPrefix}-image-item`.toUpperCase());
    const assignedVideos = assignedElements.filter(el => el.tagName === `${ddsPrefix}-video-player-container`.toUpperCase());

    if (assignedElements.length === assignedImages.length && assignedImages.length > 0) {
      this.containsOnlyImages = true;
    }

    if (assignedVideos.length) {
      const [video] = assignedVideos;
      this.videoId = video.getAttribute('video-id');
      this.videoPlayer = video.querySelector(`${ddsPrefix}-video-player`);
      this.videoIsPlaying = (video as DDSVideoPlayerContainer).isPlaying;
    }
  }

  toggleVideoState() {
    this.videoPlayer?.userInitiatedTogglePlaybackState();
    this.videoIsPlaying = !this.videoIsPlaying;
  }

  /**
   * Append the dds-background-media to the parent element where this component is being used.
   */
  updated() {
    if (this.mobilePosition === MOBILE_POSITION.TOP) {
      this.parentElement?.shadowRoot?.prepend(this);
    }
  }

  renderVideoControls() {
    const { toggleVideoState, videoIsPlaying } = this;

    return html`
      <button
        @click=${toggleVideoState}
        class="${prefix}--video-player__controls"
        aria-pressed="${!videoIsPlaying}"
        aria-label="${videoIsPlaying ? 'Pause the video' : 'Play the video'}"
        hasTooltip
      >
        ${videoIsPlaying ? pauseIcon : playIcon}
      </button>
    `;
  }

  _getMediaOpacity() {
    if (this.backgroundOpacity <= 100 && this.backgroundOpacity >= 0) {
      return `opacity:${this.backgroundOpacity / 100}`;
    }
    return '';
  }

  render() {
    return html`
      <div class="${this._getMobilePositionClass()}">
        <div class="${this._getGradientClass()}"></div>
        <div class="background-media" style="${this._getMediaOpacity()}">
          ${this.containsOnlyImages ? super.render() : ''}
          <slot @slotchange="${this._handleBackgroundMedia}"></slot>
        </div>
        ${this.videoId ? this.renderVideoControls() : ''}
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--background-media`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSBackgroundMedia;
