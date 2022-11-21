/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import deprecate from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/deprecate/deprecate';
import DDSFeatureCard from '../feature-card/feature-card';
import styles from './feature-card-block-medium.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature Card Block Medium
 *
 * @element dds-feature-card-block-medium
 * @slot block-heading - The block heading content.
 */
@customElement(`${ddsPrefix}-feature-card-block-medium`)
class DDSFeatureCardBlockMedium extends DDSFeatureCard {
  protected _renderInner() {
    return html` ${this._renderImage()}${super._renderInner()} `;
  }

  /**
   * @returns The copy content.
   */
  protected _renderCopy() {
    return html` <slot @slotchange="${this._handleSlotChange}"></slot> `;
  }

  render() {
    return html`
      <slot name="block-heading"></slot>
      <div
        class="${prefix}--feature-card"
        data-autoid="${ddsPrefix}--feature-card"
      >
        ${super.render()}
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--feature-card-block-medium`;
  }

  static styles = styles;
}
export default deprecate(
  DDSFeatureCardBlockMedium,
  `The FeatureCardBlockMedium component has been deprecated in favor of the FeatureCard component. ` +
    `See FeatureCard's size attribute documentation for more information.`
);
