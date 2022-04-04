/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import DDSPricingTableHeaderRow from './pricing-table-header-row';
import DDSPricingTableRow from './pricing-table-row';

export const setColumnWidth = (row: DDSPricingTableHeaderRow | DDSPricingTableRow) => {
  const columnCount = row.children.length;
  let defaultColumnWidth = '2';
  if (columnCount <= 3) {
    defaultColumnWidth = '4';
  } else if (columnCount <= 6) {
    defaultColumnWidth = '3';
  }
  row.style.setProperty('--default-cols', defaultColumnWidth);
};

export default setColumnWidth;
