/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, customElement, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import PlayVideo from '@carbon/ibmdotcom-styles/icons/svg/play-video.svg';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/formatVideoCaption/formatVideoCaption.js';
import DDSFeatureCard from '../feature-card/feature-card';
import CTAMixin from '../../component-mixins/cta/cta';
import VideoCTAMixin from '../../component-mixins/cta/video';
import DDSFeatureCTAFooter from './feature-cta-footer';
import './feature-cta-footer';
import { CTA_TYPE } from './defs';
import styles from './cta.scss';

import '../card/card-eyebrow';
import '../card/card-heading';
import '../image/image';

export { CTA_TYPE };

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature CTA.
 *
 * @element dds-feature-cta
 */
@customElement(`${ddsPrefix}-feature-cta`)
class DDSFeatureCTA extends VideoCTAMixin(CTAMixin(DDSFeatureCard)) {
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
      <div class="${prefix}--card__copy">
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
            <dds-image
              alt="${ifNonNull(videoName)}"
              default-src="${ifNonNull(thumbnail || videoThumbnailUrl)}"
              slot="image"
            >
              ${PlayVideo({ slot: 'icon' })}
            </dds-image>
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
    const { selectorFooter } = this.constructor as typeof DDSFeatureCTA;
    if (
      changedProperties.has('ctaType') ||
      changedProperties.has('videoName') ||
      changedProperties.has('captionHeading')
    ) {
      const { ctaType, videoName, videoDescription } = this;
      const footer = this.querySelector(selectorFooter);
      if (footer) {
        (footer as DDSFeatureCTAFooter).ctaType = ctaType;
        (footer as DDSFeatureCTAFooter).altAriaLabel =
          this.videoName || this.captionHeading;
        (footer as DDSFeatureCTAFooter).videoName = videoName;
        (footer as DDSFeatureCTAFooter).videoDescription = videoDescription;
      }
    }

    const heading = this.querySelector(
      (this.constructor as typeof DDSFeatureCTA).selectorHeading
    ) as HTMLElement;

    if (changedProperties.has('captionHeading') && heading) {
      heading!.innerText = this.captionHeading;
    }
  }

  /**
   * A selector that will return the child heading.
   */
  static get selectorHeading() {
    return `${ddsPrefix}-card-heading`;
  }

  /**
   * A selector that will return the child footer.
   */
  static get selectorFooter() {
    return `${ddsPrefix}-feature-cta-footer`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--feature-cta`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSFeatureCTA;
