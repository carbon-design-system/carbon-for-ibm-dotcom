/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import DDSStructuredListCell from '../structured-list/structured-list-cell';
import DDSPricingTableGroup from './pricing-table-group';
import styles from './pricing-table.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-cell`)
class DDSPricingTableCell extends DDSStructuredListCell {
  _parentGroup: DDSPricingTableGroup | null = this.closest(`${ddsPrefix}-pricing-table-group`);

  connectedCallback() {
    super.connectedCallback();
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-group`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSPricingTableCell;
