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
} from '@carbon/ibmdotcom-utilities/es/utilities/formatVideoCaption/formatVideoCaption.js';
import KalturaPlayerAPI from '@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer';
import C4DCard from '../card/card';
import '../card/card-heading';
import './card-cta-image';
import CTAMixin from '../../component-mixins/cta/cta-v1';
import VideoCTAMixin from '../../component-mixins/cta/video';
import C4DCardCTAFooter from './card-cta-footer';
import './card-cta-footer';
import { CTA_TYPE } from './defs';
import styles from './cta.scss?lit';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

export { CTA_TYPE };

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Card CTA.
 *
 * @element c4d-card-cta
 * @csspart heading - The heading content. Usage: `c4d-card-cta::part(heading)`
 */
@customElement(`${c4dPrefix}-card-cta`)
class C4DCardCTA extends VideoCTAMixin(CTAMixin(C4DCard)) {
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
        (this.constructor as typeof C4DCardCTA).eventVideoTitleUpdated,
        {
          bubbles: true,
          composed: true,
        }
      )
    );
    return html`
      <slot name="heading"></slot
      ><c4d-card-heading part="heading">${caption}</c4d-card-heading>
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
            <c4d-card-cta-image
              class="${prefix}--card__video-thumbnail"
              part="video-thumbnail"
              alt="${ifDefined(videoName)}"
              default-src="${ifDefined(thumbnail || videoThumbnailUrl)}">
              ${PlayVideo({ slot: 'icon' })}
            </c4d-card-cta-image>
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
      (this.constructor as typeof C4DCardCTA).selectorFooter
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
        `${c4dPrefix}-card-heading`
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
          footer as C4DCardCTAFooter
        ).altAriaLabel = `${ariaTitle}${ariaDuration}`;
        (footer as C4DCardCTAFooter).ctaType = ctaType;
        (footer as C4DCardCTAFooter).videoDuration = videoDuration;
        (footer as C4DCardCTAFooter).videoName = videoName;
        (footer as C4DCardCTAFooter).videoDescription = videoDescription;
        if (formatVideoCaptionInEffect) {
          (footer as C4DCardCTAFooter).formatVideoCaption =
            formatVideoCaptionInEffect;
        }
        if (formatVideoDurationInEffect) {
          (footer as C4DCardCTAFooter).formatVideoDuration =
            formatVideoDurationInEffect;
        }
      }
    }
  }

  static get stableSelector() {
    return `${c4dPrefix}--card-cta`;
  }

  /**
   * The name of the custom event fired when the video title is updated
   */
  static get eventVideoTitleUpdated() {
    return `${c4dPrefix}-card-cta-video-title-updated`;
  }

  /**
   * A selector that will return the child footer.
   */
  static get selectorFooter() {
    return `${c4dPrefix}-card-cta-footer`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

console.warn(
  `The c4d-card-cta component has been deprecated. All its features have been absorbed into
  the base c4d-card component. See migration guide for more information.`
);

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCardCTA;
