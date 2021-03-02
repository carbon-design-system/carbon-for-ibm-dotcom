/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import settings from 'carbon-components/es/globals/js/settings';
import DDSContentItem from '../content-item/content-item';
import styles from './promo-item.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { DDS_PROMO_GROUP } from '../../globals/internal/feature-flags';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Promo Item.
 *
 * @element dds-promo-item
 * @slot heading - The Card heading.
 * @slot image - The Image content.
 * @slot statistic - The statistic content.
 * @slot pictogram - The pictogram content.
 * @slot copy - The Content Item Copy.
 * @slot footer - The link with icon content.
 */
@customElement(`${ddsPrefix}-promo-item`)
class DDSPromoItem extends StableSelectorMixin(DDSContentItem) {
  render() {
    return html`
      <div class="${prefix}--promo-item__heading">
        <slot name="heading"></slot>
      </div>
      <div class="${prefix}--promo-item__media">
        <slot class="${prefix}--promo-item__image" name="image" @slotchange="${this._handleSlotChange}"></slot>
        <slot class="${prefix}--promo-item__statistic" name="statistic" @slotchange="${this._handleSlotChange}"></slot>
        <slot class="${prefix}--promo-item__pictogram" name="pictogram" @slotchange="${this._handleSlotChange}"></slot>
      </div>
      <div class="${prefix}--promo-item__content">
        <slot class="${prefix}--promo-item__copy" name="copy"></slot>
      </div>
      <div class="${prefix}--promo-item__footer">
        <slot class="${prefix}--promo-item__cta" name="footer"></slot>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--promo-item`;
  }

  static styles = styles;
}

export default DDSPromoItem;
