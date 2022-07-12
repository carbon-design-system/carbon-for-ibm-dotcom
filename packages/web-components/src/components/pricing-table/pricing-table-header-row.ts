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
import sameHeight from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/sameHeight/sameHeight';
import DDSStructuredListHeaderRow from '../structured-list/structured-list-header-row';
import DDSPricingTableHeaderCell from './pricing-table-header-cell';
import styles from './pricing-table.scss';
import { setColumnWidth } from './utils';
import { PRICING_TABLE_HEADER_CELL_TYPES } from './defs';
import DDSPricingTable from './pricing-table';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-header-row`)
class DDSPricingTableHeaderRow extends DDSStructuredListHeaderRow {
  /**
   * Array full of tag wrapper elements within header cells.
   */
  private _tagWrappers: any[] = [];

  /**
   * Observer that watches for viewport resizes.
   */
  // TODO: Wait for `.d.ts` update to support `ResizeObserver`
  // @ts-ignore
  private _resizeObserver: ResizeObserver | null = null;

  /**
   * Takes actions whenever the viewport is resized.
   */
  private _createResizeObserver() {
    // TODO: Wait for `.d.ts` update to support `ResizeObserver`
    // @ts-ignore
    this._resizeObserver = new ResizeObserver(() => {
      if (!(this.closest(`${ddsPrefix}-pricing-table`) as DDSPricingTable)?.isSticky) {
        this._setSameHeight();
      }
    });
    this._resizeObserver.observe(this.ownerDocument!.documentElement);
  }

  /**
   * Safely disconnects and removes the resize observer.
   */
  private _cleanResizeObserver() {
    // TODO: Wait for `.d.ts` update to support `ResizeObserver`
    // @ts-ignore
    if (this._resizeObserver instanceof ResizeObserver) {
      this._resizeObserver.disconnect();
    }
    this._resizeObserver = null;
  }

  private _setSameHeight() {
    window.requestAnimationFrame(() => {
      sameHeight(this._tagWrappers);
    });
  }

  protected _handleSlotChange(e) {
    setColumnWidth(this);

    // Find cells that are eligible to have tags within them.
    const validCells = e.target.assignedNodes().filter(node => {
      if (node instanceof DDSPricingTableHeaderCell) {
        return node.type === PRICING_TABLE_HEADER_CELL_TYPES.COMPLEX;
      }
      return false;
    });

    // Get wrapper markup for tag slot, which is always rendered regardless of
    // the presence of a tag.
    this._tagWrappers = validCells.reduce((acc, cell) => {
      if (cell.length !== 0) {
        const tag = cell.shadowRoot.querySelector(`.${DDSPricingTableHeaderCell.tagWrapperSelector}`);
        if (tag) acc.push(tag);
      }
      return acc;
    }, []);

    this._setSameHeight();
  }

  connectedCallback() {
    super.connectedCallback();
    this._createResizeObserver();
  }

  disconnectedCallback() {
    this._cleanResizeObserver();
    super.disconnectedCallback();
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

export default DDSPricingTableHeaderRow;
