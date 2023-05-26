/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import styles from './data-table.scss';

/**
 * Data table cell.
 *
 * @element cds-table-cell
 */
@customElement(`${prefix}-table-cell`)
class BXTableCell extends LitElement {
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify whether the header should be sticky.
   * Still experimental: may not work with every combination of table props
   */
  @property({ type: Boolean, reflect: true, attribute: 'sticky-header' })
  stickyHeader = false;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'cell');
    }
    super.connectedCallback();
  }

  render() {
    const { disabled, textContent } = this;

    const statusText = ['Starting', 'Active', 'Disabled'];
    const isStatus = statusText.some((word) => textContent?.includes(word));
    const isDisabled = textContent!.includes('Disabled');
    const cellClasses = classMap({
      [`${prefix}--link`]: isStatus,
      [`${prefix}--link--disabled`]: disabled || isDisabled,
    });
    return html`
      ${isStatus
        ? html` <div class="${cellClasses}">
            <slot></slot>
          </div>`
        : html`<slot></slot>`}
    `;
  }

  static styles = styles;
}

export default BXTableCell;
