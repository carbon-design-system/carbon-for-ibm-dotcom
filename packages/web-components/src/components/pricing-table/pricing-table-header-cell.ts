/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSStructuredListHeaderCell from '../structured-list/structured-list-header-cell';
import styles from './pricing-table.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-header-cell`)
class DDSPricingTableHeaderCell extends StableSelectorMixin(DDSStructuredListHeaderCell) {
  render() {
    return html`
      <div class=${`${prefix}--pricing-table-header-cell`}>
        <div>
          <slot name="highlight-label"></slot>
          <slot name="headline"></slot>
          <slot name="caption"></slot>
          <slot name="tag"></slot>
          <slot></slot>
        </div>
        <div>
          <slot name="cta"></slot>
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-header-cell`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSPricingTableHeaderCell;
