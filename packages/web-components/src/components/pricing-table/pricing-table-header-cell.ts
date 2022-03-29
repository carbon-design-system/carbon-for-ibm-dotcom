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
import DDSStructuredListHeaderCell from '../structured-list/structured-list-header-cell';
import styles from './pricing-table.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-header-cell`)
class DDSPricingTableHeaderCell extends DDSStructuredListHeaderCell {
  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <div class=${`${prefix}--grid`}>
        <slot name="headline"></slot>
        <slot name="subheadline"></slot>
        <slot name="tag"></slot>
        <slot name="content"></slot>
        <slot name="cta"></slot>
      </div>
    `;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSPricingTableHeaderCell;
