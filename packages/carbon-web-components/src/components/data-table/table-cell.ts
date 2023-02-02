/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html, customElement, LitElement } from 'lit-element';
import styles from './data-table.scss';

/**
 * Data table cell.
 *
 * @element bx-table-cell
 */
@customElement(`${prefix}-table-cell`)
class BXTableCell extends LitElement {
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'cell');
    }
    super.connectedCallback();
  }

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default BXTableCell;
