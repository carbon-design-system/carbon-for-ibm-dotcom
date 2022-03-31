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
import DDSStructuredListRow from '../structured-list/structured-list-row';
import styles from './pricing-table.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-row`)
class DDSPricingTableRow extends DDSStructuredListRow {
  protected _handleSlotChange() {
    const columnCount = this.children.length;
    let defaultColumnWidth = '2';
    if (columnCount <= 3) {
      defaultColumnWidth = '4';
    } else if (columnCount <= 6) {
      defaultColumnWidth = '3';
    }
    this.style.setProperty('--default-cols', defaultColumnWidth);
  }

  render() {
    return html`
      <slot @slotchange=${this._handleSlotChange}></slot>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-row`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSPricingTableRow;
