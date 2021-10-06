/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import PlayVideo from '@carbon/ibmdotcom-styles/icons/svg/play-video.svg';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '@carbon/ibmdotcom-utilities/es/utilities/formatVideoCaption/formatVideoCaption.js';
import root from 'window-or-global';
import DDSCard from '../card/card';
import '../card/card-heading';
import './card-cta-image';
import CTAMixin from '../../component-mixins/cta/cta';
import VideoCTAMixin from '../../component-mixins/cta/video';
/* eslint-disable import/no-duplicates */
import DDSCardCTAFooter from './card-cta-footer';
import './card-cta-footer';
/* eslint-enable import/no-duplicates */
import { CTA_TYPE } from './defs';
import styles from './cta.scss';

export { CTA_TYPE };

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card CTA.
 *
 * @element dds-card-cta
 */
@customElement(`${ddsPrefix}-card-cta`)
class DDSCardCTA extends VideoCTAMixin(CTAMixin(DDSCard)) {
  protected _renderHeading() {
    const { ctaType, videoName, formatVideoCaption: formatVideoCaptionInEffect } = this;
    if (ctaType !== CTA_TYPE.VIDEO) {
      return super._renderHeading();
    }
    const caption = formatVideoCaptionInEffect({ name: videoName });
    return html`
      <slot name="heading"></slot><dds-card-heading>${caption}</dds-card-heading>
    `;
  }

  protected _renderImage() {
    const { ctaType, videoName, videoThumbnailUrl, _hasImage: hasImage, noPoster } = this;
    const thumbnail =
      hasImage || ctaType !== CTA_TYPE.VIDEO || noPoster
        ? undefined
        : html`
            <dds-card-cta-image alt="${ifNonNull(videoName)}" default-src="${ifNonNull(videoThumbnailUrl)}">
              ${PlayVideo({ slot: 'icon' })}
            </dds-card-cta-image>
          `;
    return html`
      <slot name="image" @slotchange="${this._handleSlotChange}"></slot>${thumbnail}
    `;
  }

  private static formatTime(number, unit) {
    const locale = root.document.documentElement.lang || root.navigator.language;

    return new Intl.NumberFormat(locale, {
      style: 'unit',
      // @ts-ignore: TS lacking support for standard option
      unitDisplay: 'long',
      unit,
    }).format(number);
  }

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
  formatVideoDuration?: typeof formatVideoDuration;

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
  @property({ attribute: 'video-thumbnail-url' })
  videoThumbnailUrl?: string;

  /**
   * Set `true` if Poster Video Image should not be shown.
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-poster' })
  noPoster = false;

  updated(changedProperties) {
    super.updated(changedProperties);
    const footer = this.querySelector((this.constructor as typeof DDSCardCTA).selectorFooter);
    if (
      changedProperties.has('ctaType') ||
      changedProperties.has('formatCaption') ||
      changedProperties.has('formatDuration') ||
      changedProperties.has('videoDuration')
    ) {
      const {
        ctaType,
        videoDuration,
        videoName,
        videoDescription,
        formatVideoCaption: formatVideoCaptionInEffect,
        formatVideoDuration: formatVideoDurationInEffect,
      } = this;
      const headingText = this.querySelector(`${ddsPrefix}-card-heading`)?.textContent;
      const copyText = this.textContent;
      if (footer) {
        const ariaTitle = videoName || headingText || copyText;
        let ariaDuration = '';
        if (videoDuration !== undefined) {
          const s = Math.floor(videoDuration % 60);
          const m = Math.floor((videoDuration / 60) % 60);
          const h = Math.floor((videoDuration / (60 * 60)) % 24);
          const seconds = DDSCardCTA.formatTime(s, 'second');
          const minutes = h || m ? DDSCardCTA.formatTime(m, 'minute') : '';
          const hours = h ? DDSCardCTA.formatTime(h, 'hour') : '';
          ariaDuration = `${hours} ${minutes} ${seconds}`.trim();
        }
        (footer as DDSCardCTAFooter).altAriaLabel = `${ariaTitle}, ${ariaDuration}`;
        (footer as DDSCardCTAFooter).ctaType = ctaType;
        (footer as DDSCardCTAFooter).videoDuration = videoDuration;
        (footer as DDSCardCTAFooter).videoName = videoName;
        (footer as DDSCardCTAFooter).videoDescription = videoDescription;
        if (formatVideoCaptionInEffect) {
          (footer as DDSCardCTAFooter).formatVideoCaption = formatVideoCaptionInEffect;
        }
        if (formatVideoDurationInEffect) {
          (footer as DDSCardCTAFooter).formatVideoDuration = formatVideoDurationInEffect;
        }
      }
    }
  }

  static get stableSelector() {
    return `${ddsPrefix}--card-cta`;
  }

  /**
   * A selector that will return the child footer.
   */
  static get selectorFooter() {
    return `${ddsPrefix}-card-cta-footer`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCardCTA;
