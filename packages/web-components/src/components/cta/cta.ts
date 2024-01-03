/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import styles from './cta.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

import {
  formatVideoCaption,
  formatVideoDuration,
} from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/formatVideoCaption/formatVideoCaption.js';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * CTA component
 *
 * @element c4d-cta
 */
@customElement(`${c4dPrefix}-cta`)
class C4DCTAHead extends HostListenerMixin(StableSelectorMixin(LitElement)) {
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
      const { videoDuration, videoName } = event.detail as any;
      const formattedVideoDuration = formatVideoDuration({
        duration: !videoDuration ? videoDuration : videoDuration * 1000,
      });
      this.videoDuration ? null : (this.videoDuration = formattedVideoDuration);

      if (this.ctaStyle !== 'card' && this.ctaStyle !== 'feature') {
        const heading = formatVideoCaption({
          duration: formattedVideoDuration,
          name: videoName,
        });

        const ctaComponent = this.shadowRoot!.querySelector(
          `c4d-${this.ctaStyle}-cta`
        );
        const spanElement = ctaComponent?.shadowRoot!.querySelector('span');

        spanElement
          ? (spanElement.textContent = heading)
          : (ctaComponent!.textContent = heading);
      } else {
        const footer = this.shadowRoot
          ?.querySelector(`${c4dPrefix}-${this.ctaStyle}-cta`)
          ?.querySelector(`${c4dPrefix}-${this.ctaStyle}-cta-footer`);
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
      const button = this.shadowRoot?.querySelector(`${c4dPrefix}-button-cta`);
      if (this.ctaStyle === 'button' && button && this.getAttribute('kind')) {
        button.setAttribute('kind', this.getAttribute('kind')!);
      }
    }
  };

  render() {
    return html`
      ${this.ctaStyle === 'feature'
        ? html` <c4d-feature-cta></c4d-feature-cta> `
        : ``}
      ${this.ctaStyle === 'card'
        ? html` <c4d-card-cta><slot></slot></c4d-card-cta> `
        : ``}
      ${this.ctaStyle === 'card-link'
        ? html` <c4d-card-link-cta><slot></slot></c4d-card-link-cta> `
        : ``}
      ${this.ctaStyle === 'text'
        ? html` <c4d-text-cta><slot></slot></c4d-text-cta> `
        : ``}
      ${this.ctaStyle === 'button'
        ? html` <c4d-button-cta><slot></slot></c4d-button-cta> `
        : ``}
    `;
  }

  /**
   * The name of the custom event fired when there is a user gesture to run the action.
   */
  static get eventRequestAdditionalVideoData() {
    return `${c4dPrefix}-cta-request-additional-video-data`;
  }

  /**
   * The name of the custom event fired when there is a user gesture to run the action.
   */
  static get eventUpdateButtonGroup() {
    return `${c4dPrefix}-button-group-update`;
  }

  static get stableSelector() {
    return `${c4dPrefix}-cta`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

console.warn(
  `The c4d-cta component has been deprecated in favor of the c4d-card, c4d-feature-card, c4d-link-with-icon,
  and c4d-button-group. See migration guide for more information.`
);

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCTAHead;
