/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './data-table.scss';

/**
 * Data table cell content.
 *
 * @element cds-table-cell-content
 */
@customElement(`${prefix}-table-cell-content`)
class CDSTableCellContent extends LitElement {
  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default CDSTableCellContent;
