/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, LitElement } from 'lit-element';
import { prefix } from '../../globals/settings';
import styles from './structured-list.scss';

/**
 * Structured list cell.
 *
 * @element bx-structured-list-cell
 */
@customElement(`${prefix}-structured-list-cell`)
class BXStructuredListCell extends LitElement {
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

export default BXStructuredListCell;
