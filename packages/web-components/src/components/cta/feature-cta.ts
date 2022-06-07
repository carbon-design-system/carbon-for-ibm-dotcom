/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, customElement, html } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import PlayVideo from '@carbon/ibmdotcom-styles/icons/svg/play-video.svg';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/formatVideoCaption/formatVideoCaption.js';
import DDSFeatureCard from '../feature-card/feature-card';
import CTAMixin from '../../component-mixins/cta/cta';
import VideoCTAMixin from '../../component-mixins/cta/video';
/* eslint-disable import/no-duplicates */
import DDSCardHeading from '../card/card-heading';
import '../card/card-heading';
import DDSFeatureCTAFooter from './feature-cta-footer';
import './feature-cta-footer';
/* eslint-enable import/no-duplicates */
import { CTA_TYPE } from './defs';
import styles from './cta.scss';

import '../card/card-eyebrow';
import '../image/image';

export { CTA_TYPE };

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature CTA.
 *
 * @element dds-feature-cta
 */
@customElement(`${ddsPrefix}-feature-cta`)
class DDSFeatureCTA extends VideoCTAMixin(CTAMixin(DDSFeatureCard)) {
  protected _renderHeading() {
    const { ctaType, videoName } = this;
    if (ctaType === CTA_TYPE.VIDEO) {
      this.captionHeading = this.formatVideoCaption({ name: videoName });
    }
    return super._renderHeading();
  }

  protected _renderImage() {
    const { ctaType, noPoster, thumbnail, videoName, videoThumbnailUrl } = this;
    const image =
      ctaType !== CTA_TYPE.VIDEO || noPoster
        ? undefined
        : html`
            <dds-image alt="${ifNonNull(videoName)}" default-src="${ifNonNull(thumbnail || videoThumbnailUrl)}" slot="image">
              ${PlayVideo({ slot: 'icon' })}
            </dds-image>
          `;
    return noPoster
      ? undefined
      : html`
          <slot name="image" @slotchange="${this._handleSlotChange}">${image}</slot>
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
    const { captionHeading, ctaType, videoName, videoDescription, videoDuration } = this;
    const { selectorFooter, selectorHeading } = this.constructor as typeof DDSFeatureCTA;
    if (changedProperties.has('ctaType') || changedProperties.has('videoName') || changedProperties.has('captionHeading')) {
      const footer = this.querySelector(selectorFooter);
      if (footer instanceof DDSFeatureCTAFooter) {
        footer.ctaType = ctaType;
        footer.altAriaLabel = videoName || captionHeading;
        footer.videoName = videoName;
        footer.videoDescription = videoDescription;
      }
    }
    if (changedProperties.has('captionHeading') && captionHeading) {
      const heading = this.querySelector(selectorHeading) as DDSCardHeading;
      heading.innerText = captionHeading;
    }
    if (changedProperties.has('videoDuration') && videoDuration) {
      const footer = this.querySelector(selectorFooter) as DDSFeatureCTAFooter;
      footer.innerText = this.formatVideoDuration({
        duration: videoDuration * 1000,
      });
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
