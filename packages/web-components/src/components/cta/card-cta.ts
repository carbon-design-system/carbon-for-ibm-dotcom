/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import PlayVideo from '@carbon/ibmdotcom-styles/icons/svg/play-video.svg';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '@carbon/ibmdotcom-utilities/es/utilities/formatVideoCaption/formatVideoCaption.js';
import KalturaPlayerAPI from '@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer';
import DDSCard from '../card/card';
import '../card/card-heading';
import './card-cta-image';
import CTAMixin from '../../component-mixins/cta/cta';
import VideoCTAMixin from '../../component-mixins/cta/video';
import DDSCardCTAFooter from './card-cta-footer';
import './card-cta-footer';
import { CTA_TYPE } from './defs';
import styles from './cta.scss';

export { CTA_TYPE };

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card CTA.
 *
 * @element dds-card-cta
 */
@customElement(`${ddsPrefix}-card-cta`)
class DDSCardCTA extends VideoCTAMixin(CTAMixin(DDSCard)) {
  protected _renderHeading() {
    const {
      ctaType,
      videoName,
      formatVideoCaption: formatVideoCaptionInEffect,
    } = this;
    if (ctaType !== CTA_TYPE.VIDEO) {
      return super._renderHeading();
    }
    const caption = formatVideoCaptionInEffect({ name: videoName });

    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof DDSCardCTA).eventVideoTitleUpdated,
        {
          bubbles: true,
          composed: true,
        }
      )
    );
    return html`
      <slot name="heading"></slot
      ><dds-card-heading>${caption}</dds-card-heading>
    `;
  }

  protected _renderImage() {
    const {
      ctaType,
      videoName,
      videoThumbnailUrl,
      thumbnail,
      _hasImage: hasImage,
      noPoster,
    } = this;
    const image =
      hasImage || ctaType !== CTA_TYPE.VIDEO || noPoster
        ? undefined
        : html`
            <dds-card-cta-image
              class="${prefix}--card__video-thumbnail"
              alt="${ifNonNull(videoName)}"
              default-src="${ifNonNull(thumbnail || videoThumbnailUrl)}"
            >
              ${PlayVideo({ slot: 'icon' })}
            </dds-card-cta-image>
          `;
    return html`
      <slot name="image" @slotchange="${this._handleSlotChange}"></slot>${image}
    `;
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
   * Optional custom video thumbnail
   */
  @property({ reflect: true, attribute: 'thumbnail' })
  thumbnail?: '';

  /**
   * Set `true` if Poster Video Image should not be shown.
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-poster' })
  noPoster = false;

  updated(changedProperties) {
    super.updated(changedProperties);
    const footer = this.querySelector(
      (this.constructor as typeof DDSCardCTA).selectorFooter
    );
    if (
      changedProperties.has('ctaType') ||
      changedProperties.has('formatCaption') ||
      changedProperties.has('formatDuration') ||
      changedProperties.has('videoDuration') ||
      changedProperties.has('videoName')
    ) {
      const {
        ctaType,
        videoDuration,
        videoName,
        videoDescription,
        formatVideoCaption: formatVideoCaptionInEffect,
        formatVideoDuration: formatVideoDurationInEffect,
      } = this;
      const headingText = this.querySelector(
        `${ddsPrefix}-card-heading`
      )?.textContent;
      const copyText = this.textContent;
      if (footer) {
        const ariaTitle = videoName || headingText || copyText;
        let ariaDuration = '';
        if (videoDuration !== undefined) {
          ariaDuration = `, DURATION ${KalturaPlayerAPI.getMediaDurationFormatted(
            videoDuration,
            false
          )}`;
        }
        (
          footer as DDSCardCTAFooter
        ).altAriaLabel = `${ariaTitle}${ariaDuration}`;
        (footer as DDSCardCTAFooter).ctaType = ctaType;
        (footer as DDSCardCTAFooter).videoDuration = videoDuration;
        (footer as DDSCardCTAFooter).videoName = videoName;
        (footer as DDSCardCTAFooter).videoDescription = videoDescription;
        if (formatVideoCaptionInEffect) {
          (footer as DDSCardCTAFooter).formatVideoCaption =
            formatVideoCaptionInEffect;
        }
        if (formatVideoDurationInEffect) {
          (footer as DDSCardCTAFooter).formatVideoDuration =
            formatVideoDurationInEffect;
        }
      }
    }
  }

  static get stableSelector() {
    return `${ddsPrefix}--card-cta`;
  }

  /**
   * The name of the custom event fired when the video title is updated
   */
  static get eventVideoTitleUpdated() {
    return `${ddsPrefix}-card-cta-video-title-updated`;
  }

  /**
   * A selector that will return the child footer.
   */
  static get selectorFooter() {
    return `${ddsPrefix}-card-cta-footer`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCardCTA;
