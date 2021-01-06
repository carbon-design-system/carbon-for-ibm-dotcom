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
import DDSFeatureCard from '../feature-card/feature-card';
import styles from './feature-card-block-medium.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature Card Block Medium
 *
 * @element dds-feature-card-block-medium
 * @slot heading - The heading content.
 */
@customElement(`${ddsPrefix}-feature-card-block-medium`)
class DDSFeatureCardBlockMedium extends StableSelectorMixin(DDSFeatureCard) {
  protected _renderInner() {
    return html`
      ${this._renderImage()}
      <div class="${prefix}--card__wrapper">
        <div class="${prefix}--card__content">
          <slot name="eyebrow"></slot>
          <h3 class="${prefix}--card__heading">${this._renderCopy()}</h3>
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  /**
   * @returns The copy content.
   */
  protected _renderCopy() {
    return html`
      <slot @slotchange="${this._handleSlotChange}"></slot>
    `;
  }

  render() {
    return html`
      <slot name="heading"></slot>
      <div class="${prefix}--feature-card" data-autoid="${ddsPrefix}--feature-card">
        ${super.render()}
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--feature-card-block-medium`;
  }

  static styles = styles;
}
export default DDSFeatureCardBlockMedium;
