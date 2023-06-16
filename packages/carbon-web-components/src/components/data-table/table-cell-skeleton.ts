/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CDSTableCell from './table-cell';

/**
 * Data table cell with skeleton content.
 *
 * @element cds-table-cell-skeleton
 */
@customElement(`${prefix}-table-cell-skeleton`)
class CDSTableCellSkeleton extends CDSTableCell {
  render() {
    return html` <span></span> `;
  }
}

export default CDSTableCellSkeleton;
