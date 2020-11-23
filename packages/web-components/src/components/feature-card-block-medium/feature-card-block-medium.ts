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

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature Card Block Medium
 *
 * @element dds-feature-card-block-medium
 * @slot heading - The heading content.
 */
@customElement(`${ddsPrefix}-feature-card-block-medium`)
class DDSFeatureCardBlockMedium extends DDSFeatureCard {
  protected _renderInner() {
    const { _hasEyebrow: hasEyebrow, _handleSlotChange: handleSlotChange } = this;
    return html`
      ${this._renderImage()}
      <div class="${prefix}--card__wrapper">
        <div class="${prefix}--card__content">
          <p ?hidden="${!hasEyebrow}" class="${prefix}--card__eyebrow">
            <slot name="eyebrow" @slotchange="${handleSlotChange}"></slot>
          </p>
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
    const { _hasHeading: hasHeading, _handleSlotChange: handleSlotChange } = this;
    return html`
      <h3 ?hidden="${!hasHeading}" class="${prefix}--feature-card-block-medium__heading">
        <slot name="heading" @slotchange="${handleSlotChange}"></slot>
      </h3>
      <div class="${prefix}--feature-card" data-autoid="${ddsPrefix}--feature-card">
        ${super.render()}
      </div>
    `;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    const { _linkNode: linkNode } = this;
    if (linkNode) {
      linkNode.classList.remove(`${prefix}--link`);
      linkNode.classList.add(`${prefix}--card--inverse`);
      linkNode.classList.add(`${prefix}--feature-card`);
    }
  }

  static get stableSelector() {
    return `${ddsPrefix}--feature-card-block-medium`;
  }

  static styles = styles;
}
export default DDSFeatureCardBlockMedium;
