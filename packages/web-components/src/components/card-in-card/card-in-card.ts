/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, customElement, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ifNonNull from '../../internal/vendor/@carbon/web-components/globals/directives/if-non-null.js';
import PlayVideo from '@carbon/ibmdotcom-styles/icons/svg/play-video.svg';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import DDSCardCTA, { CTA_TYPE } from '../cta/card-cta';
import './card-in-card-image';
import styles from './card-in-card.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card in Card.
 *
 * @element dds-card-in-card
 */
@customElement(`${ddsPrefix}-card-in-card`)
class DDSCardInCard extends StableSelectorMixin(DDSCardCTA) {
  protected _renderImage() {
    const {
      ctaType,
      videoName,
      videoThumbnailUrl,
      thumbnail,
      _hasImage: hasImage,
    } = this;
    const image =
      hasImage || ctaType !== CTA_TYPE.VIDEO
        ? undefined
        : html`
            <dds-card-in-card-image
              alt="${ifNonNull(videoName)}"
              default-src="${ifNonNull(thumbnail || videoThumbnailUrl)}">
              ${PlayVideo({ slot: 'icon' })}
            </dds-card-in-card-image>
          `;
    return html`
      <slot name="image" @slotchange="${this._handleSlotChange}"></slot>${image}
    `;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    const { _linkNode: linkNode } = this;
    if (linkNode) {
      linkNode.classList.add(`${prefix}--card-in-card`);
    }

    const cardInCardImage = this.querySelector(
      `${ddsPrefix}-card-in-card-image`
    );
    const cardInCardImageVideo = this.parentElement
      ?.querySelector(`${ddsPrefix}-card-in-card`)
      ?.shadowRoot?.querySelector('dds-card-in-card-image');

    // fires the card cta footer when card image is clicked
    if (cardInCardImage || cardInCardImageVideo) {
      (
        (cardInCardImage as HTMLElement) ||
        (cardInCardImageVideo as HTMLElement)
      ).onclick = () =>
        this.querySelector(`${ddsPrefix}-card-cta-footer`)
          ?.shadowRoot?.querySelector(`a`)
          ?.click();
    }
  }

  static get stableSelector() {
    return `${ddsPrefix}--card-in-card`;
  }

  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCardInCard;
