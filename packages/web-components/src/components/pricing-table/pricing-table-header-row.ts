/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import sameHeight from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/sameHeight/sameHeight';
import C4DStructuredListHeaderRow from '../structured-list/structured-list-header-row';
import C4DPricingTableHeaderCell from './pricing-table-header-cell';
import styles from './pricing-table.scss';
import { setColumnWidth } from './utils';
import { PRICING_TABLE_HEADER_CELL_TYPES } from './defs';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

@customElement(`${c4dPrefix}-pricing-table-header-row`)
class C4DPricingTableHeaderRow extends StableSelectorMixin(
  C4DStructuredListHeaderRow
) {
  /**
   * Array full of tag wrapper elements within header cells.
   */
  private _tagWrappers: any[] = [];

  private _setSameHeight() {
    window.requestAnimationFrame(() => {
      sameHeight(this._tagWrappers);
    });
  }

  protected _handleSlotChange(e) {
    setColumnWidth(this);

    // Find cells that are eligible to have tags within them.
    const validCells = e.target.assignedNodes().filter((node) => {
      if (node instanceof C4DPricingTableHeaderCell) {
        return node.type === PRICING_TABLE_HEADER_CELL_TYPES.COMPLEX;
      }
      return false;
    });

    // Get wrapper markup for tag slot, which is always rendered regardless of
    // the presence of a tag.
    this._tagWrappers = validCells.reduce((acc, cell) => {
      if (cell.length !== 0) {
        const tag = cell.shadowRoot.querySelector(
          `.${C4DPricingTableHeaderCell.tagWrapperSelector}`
        );
        if (tag) {
          acc.push(tag);
        }
      }
      return acc;
    }, []);

    this._setSameHeight();

    const { eventSlotChange } = this
      .constructor as typeof C4DPricingTableHeaderRow;
    this.dispatchEvent(
      new CustomEvent(eventSlotChange, {
        bubbles: true,
        cancelable: true,
        composed: true,
      })
    );
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return html` <slot @slotchange=${this._handleSlotChange}></slot> `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--pricing-table-header-row`;
  }

  static get eventSlotChange() {
    return `${c4dPrefix}-pricing-table-header-row-slot-change`;
  }

  static styles = styles;
}

export default C4DPricingTableHeaderRow;
