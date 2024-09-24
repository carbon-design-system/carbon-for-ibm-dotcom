/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @ts-nocheck

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import PlayVideo from '@carbon/ibmdotcom-styles/icons/svg/play-video.svg';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/formatVideoCaption/formatVideoCaption.js';
import C4DFeatureCard from '../feature-card/feature-card';
import CTAMixin from '../../component-mixins/cta/cta-v1';
import VideoCTAMixin from '../../component-mixins/cta/video';
import C4DFeatureCTAFooter from './feature-cta-footer';
import './feature-cta-footer';
import { CTA_TYPE } from './defs';
import styles from './cta.scss';

import '../card/card-eyebrow';
import '../card/card-heading';
import '../image/image';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

export { CTA_TYPE };

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Feature CTA.
 *
 * @element c4d-feature-cta
 * @csspart copy - The copy content. Usage: `c4d-feature-cta::part(copy)`
 */
@customElement(`${c4dPrefix}-feature-cta`)
class C4DFeatureCTA extends VideoCTAMixin(CTAMixin(C4DFeatureCard)) {
  protected _renderCopy() {
    const {
      ctaType,
      videoDuration,
      videoName,
      formatVideoCaption: formatCaptionInEffect,
      formatVideoDuration: formatDurationInEffect,
    } = this;
    if (ctaType !== CTA_TYPE.VIDEO) {
      return super._renderCopy();
    }
    const caption = formatCaptionInEffect({
      duration: formatDurationInEffect({
        duration: !videoDuration ? videoDuration : videoDuration * 1000,
      }),
      name: videoName,
    });

    this.captionHeading = caption;

    return html`
      <div class="${prefix}--card__copy" part="copy">
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `;
  }

  protected _renderImage() {
    const { ctaType, noPoster, thumbnail, videoName, videoThumbnailUrl } = this;
    const image =
      ctaType !== CTA_TYPE.VIDEO || noPoster
        ? undefined
        : html`
            <c4d-image
              alt="${ifDefined(videoName)}"
              default-src="${ifDefined(thumbnail || videoThumbnailUrl)}"
              slot="image">
              ${PlayVideo({ slot: 'icon' })}
            </c4d-image>
          `;
    return noPoster
      ? undefined
      : html`
          <slot name="image" @slotchange="${this._handleSlotChange}"
            >${image}</slot
          >
        `;
  }

  /**
   * The video caption to replace the heading with.
   */
  @property({ attribute: false })
  captionHeading;

  /**
   * The CTA type.
   */
  @property({ reflect: true, attribute: 'cta-type' })
  ctaType = CTA_TYPE.REGULAR;

  /**
   * The formatter for the video caption, composed with the video name and the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatVideoCaption = formatVideoCaption;

  /**
   * The formatter for the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatVideoDuration = formatVideoDuration;

  /**
   * Set `true` if Poster Video Image should not be shown.
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-poster' })
  noPoster = false;

  /**
   * Optional custom video thumbnail
   */
  @property({ reflect: true, attribute: 'thumbnail' })
  thumbnail?: '';

  /**
   * The video duration.
   */
  @property({ type: Number, attribute: 'video-duration' })
  videoDuration?: number;

  /**
   * The video name.
   */
  @property({ attribute: 'video-name' })
  videoName?: string;

  /**
   * The custom video description.
   */
  @property({ attribute: 'video-description' })
  videoDescription?: string;

  /**
   * The video thumbnail URL.
   */
  videoThumbnailUrl?: string;

  updated(changedProperties) {
    super.updated(changedProperties);
    const { selectorFooter } = this.constructor as typeof C4DFeatureCTA;
    if (
      changedProperties.has('ctaType') ||
      changedProperties.has('videoName') ||
      changedProperties.has('captionHeading')
    ) {
      const { ctaType, videoName, videoDescription } = this;
      const footer = this.querySelector(selectorFooter);
      if (footer) {
        (footer as C4DFeatureCTAFooter).ctaType = ctaType;
        (footer as C4DFeatureCTAFooter).altAriaLabel =
          this.videoName || this.captionHeading;
        (footer as C4DFeatureCTAFooter).videoName = videoName;
        (footer as C4DFeatureCTAFooter).videoDescription = videoDescription;
      }
    }
    if (changedProperties.has('captionHeading')) {
      const heading = this.querySelector(
        (this.constructor as typeof C4DFeatureCTA).selectorHeading
      ) as HTMLElement;

      if (heading) {
        heading!.innerText = this.captionHeading;
      }
    }
  }

  /**
   * A selector that will return the child heading.
   */
  static get selectorHeading() {
    return `${c4dPrefix}-card-heading`;
  }

  /**
   * A selector that will return the child footer.
   */
  static get selectorFooter() {
    return `${c4dPrefix}-feature-cta-footer`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--feature-cta`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

console.warn(
  `The c4d-feature-cta component has been deprecated. All its features have been absorbed into
  the base c4d-feature-card component. See migration guide for more information.`
);

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DFeatureCTA;
