/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import deprecate from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/deprecate/deprecate';
import C4DFeatureCard from '../feature-card/feature-card';
import styles from './feature-card-block-medium.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: ddsPrefix } = settings;

/**
 * Feature Card Block Medium
 *
 * @element c4d-feature-card-block-medium
 * @slot block-heading - The block heading content.
 */
@customElement(`${ddsPrefix}-feature-card-block-medium`)
class C4DFeatureCardBlockMedium extends C4DFeatureCard {
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
        data-autoid="${ddsPrefix}--feature-card">
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
  C4DFeatureCardBlockMedium,
  `The FeatureCardBlockMedium component has been deprecated in favor of the FeatureCard component. ` +
    `See FeatureCard's size attribute documentation for more information.`
);
