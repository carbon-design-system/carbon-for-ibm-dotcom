/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import DDSStructuredListHeaderRow from '../structured-list/structured-list-header-row';
import styles from './pricing-table.scss';
import { setColumnWidth } from './utils';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-header-row`)
class DDSPricingTableHeaderRow extends DDSStructuredListHeaderRow {
  protected _handleSlotChange() {
    setColumnWidth(this);
  }

  render() {
    return html`
      <slot @slotchange=${this._handleSlotChange}></slot>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-header-row`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSPricingTableHeaderRow;
