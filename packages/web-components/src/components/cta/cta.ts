/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, customElement, html, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import styles from './cta.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

import {
  formatVideoCaption,
  formatVideoDuration,
} from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/formatVideoCaption/formatVideoCaption.js';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * CTA component
 *
 * @element dds-cta
 */
@customElement(`${ddsPrefix}-cta`)
class DDSCTAHead extends HostListenerMixin(StableSelectorMixin(LitElement)) {
  @property({ attribute: 'cta-style' })
  ctaStyle = 'text';

  @property({ attribute: 'cta-type' })
  ctaType;

  @property({ attribute: 'custom-video-title', reflect: true })
  customVideoTitle;

  @property({ attribute: 'footer-text' })
  @property({ attribute: 'video-duration', reflect: true })
  videoDuration;

  @property({ attribute: 'video-thumbnail-url', reflect: true })
  videoThumbnailUrl;

  @property({ reflect: true })
  thumbnail;

  updated() {
    // transpose attributes from parent cta handler to desired cta style
    Array.from(this.attributes).forEach((e) => {
      this.shadowRoot?.children[0]!.setAttribute(
        (e as any).name,
        (e as any).value
      );
    });

    // ensure children components are used within the desired cta style
    Array.from(this.children).forEach((component) => {
      this.shadowRoot?.children[0].append(component);
    });
  }

  /**
   * Handles card with video heading and applies the set same height function.
   *
   * @param event The event.
   */
  @HostListener(`document:eventRequestAdditionalVideoData`)
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleVideoTitleUpdate = async (event: FocusEvent) => {
    if (event) {
      const { videoDuration, videoName, videoThumbnailUrl } =
        event.detail as any;
      const formattedVideoDuration = formatVideoDuration({
        duration: !videoDuration ? videoDuration : videoDuration * 1000,
      });
      this.videoThumbnailUrl
        ? null
        : (this.videoThumbnailUrl = videoThumbnailUrl);
      this.videoDuration ? null : (this.videoDuration = formattedVideoDuration);

      if (this.ctaStyle !== 'card' && this.ctaStyle !== 'feature') {
        const heading = formatVideoCaption({
          duration: formattedVideoDuration,
          name: videoName,
        });

        const ctaComponent = this.shadowRoot!.querySelector(
          `dds-${this.ctaStyle}-cta`
        );
        const spanElement = ctaComponent?.shadowRoot!.querySelector('span');

        spanElement
          ? (spanElement.textContent = heading)
          : (ctaComponent!.textContent = heading);
      } else {
        if (!this.getAttribute('no-poster')) {
          const imageQuery =
            this.ctaStyle === 'card'
              ? `${ddsPrefix}-card-cta-image`
              : `${ddsPrefix}-image`;
          const imageComponent = this.shadowRoot
            ?.querySelector(`${ddsPrefix}-${this.ctaStyle}-cta`)
            ?.shadowRoot!.querySelector(imageQuery);
          const imageUrl = this.thumbnail
            ? this.thumbnail
            : this.videoThumbnailUrl;
          imageComponent?.setAttribute('default-src', imageUrl);
        }

        const footer = this.shadowRoot
          ?.querySelector(`${ddsPrefix}-${this.ctaStyle}-cta`)
          ?.querySelector(`${ddsPrefix}-${this.ctaStyle}-cta-footer`);
        footer?.textContent ? null : (footer!.textContent = this.videoDuration);
      }
    }
  };

  /**
   * Handles card with video heading and applies the set same height function.
   *
   * @param event The event.
   */
  @HostListener(`document:eventUpdateButtonGroup`)
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleButtonGroupupdate = async (event: FocusEvent) => {
    if (event) {
      const button = this.shadowRoot?.querySelector(`${ddsPrefix}-button-cta`)!;
      if (this.ctaStyle === 'button' && button && this.getAttribute('kind')) {
        button.setAttribute('kind', this?.getAttribute('kind')!);
      }
    }
  };

  render() {
    return html`
      ${this.ctaStyle === 'feature'
        ? html` <dds-feature-cta></dds-feature-cta> `
        : ``}
      ${this.ctaStyle === 'card'
        ? html` <dds-card-cta><slot></slot></dds-card-cta> `
        : ``}
      ${this.ctaStyle === 'card-link'
        ? html` <dds-card-link-cta><slot></slot></dds-card-link-cta> `
        : ``}
      ${this.ctaStyle === 'text'
        ? html` <dds-text-cta><slot></slot></dds-text-cta> `
        : ``}
      ${this.ctaStyle === 'button'
        ? html` <dds-button-cta><slot></slot></dds-button-cta> `
        : ``}
    `;
  }

  /**
   * The name of the custom event fired when there is a user gesture to run the action.
   */
  static get eventRequestAdditionalVideoData() {
    return `${ddsPrefix}-cta-request-additional-video-data`;
  }

  /**
   * The name of the custom event fired when there is a user gesture to run the action.
   */
  static get eventUpdateButtonGroup() {
    return `${ddsPrefix}-button-group-update`;
  }

  static get stableSelector() {
    return `${ddsPrefix}-cta`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCTAHead;
