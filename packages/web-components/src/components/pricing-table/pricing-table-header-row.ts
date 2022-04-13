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
import settings from 'carbon-components/es/globals/js/settings';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener';
import sameHeight from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/sameHeight/sameHeight';
import DDSStructuredListHeaderRow from '../structured-list/structured-list-header-row';
import DDSPricingTableHeaderCell from './pricing-table-header-cell';
import styles from './pricing-table.scss';
import { setColumnWidth } from './utils';
import { PRICING_TABLE_HEADER_CELL_TYPES } from './defs';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-header-row`)
class DDSPricingTableHeaderRow extends HostListenerMixin(DDSStructuredListHeaderRow) {
  /**
   * Array full of tag wrapper elements within header cells.
   */
  private _tagWrappers: any[] = [];

  /**
   * Observer that watches for viewport resizes.
   */
  private _resizeObserver: ResizeObserver | null = null;

  /**
   * Tracks width of the parent element.
   */
  private maxWidth: string = 'none';

  private _createResizeObserver() {
    // TODO: Wait for `.d.ts` update to support `ResizeObserver`
    // @ts-ignore
    this._resizeObserver = new ResizeObserver(() => {
      this._setSameHeight();
      this._setMaxWidth();
    });
    this._resizeObserver.observe(this.ownerDocument!.documentElement);
  }

  private _cleanResizeObserver() {
    if (this._resizeObserver instanceof ResizeObserver) {
      this._resizeObserver.disconnect();
    }
    this._resizeObserver = null;
  }

  private _setSameHeight = () => {
    window.requestAnimationFrame(() => {
      sameHeight(this._tagWrappers);
    });
  };

  private _setMaxWidth() {
    this.maxWidth = `${this.parentElement?.clientWidth}px`;
    this.style.setProperty('--max-width', this.maxWidth);
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

  private _setSticky() {
    const { rowStickyClass, cellStickyClass } = this.constructor as typeof DDSPricingTableHeaderRow;

    this.classList.add(rowStickyClass);
    Array.from(this.children).forEach(child => {
      child.classList.add(cellStickyClass);
    });
    if (this.parentElement instanceof HTMLElement) {
      this.parentElement.style.marginTop = `${this.getBoundingClientRect().height}px`;
    }
  }

  private _unsetSticky() {
    const { rowStickyClass, cellStickyClass } = this.constructor as typeof DDSPricingTableHeaderRow;

    this.classList.remove(rowStickyClass);
    Array.from(this.children).forEach(child => {
      child.classList.remove(cellStickyClass);
    });
    if (this.parentElement instanceof HTMLElement) {
      this.parentElement.style.marginTop = '';
    }
    this._setSameHeight();
  }

  @HostListener('window:scroll')
  protected _handleScroll = () => {
    if (this.offsetTop < window.pageYOffset) {
      this._setSticky();
    } else {
      this._unsetSticky();
    }
  };

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

  static get rowStickyClass() {
    return `${prefix}--pricing-table-header-row--sticky`;
  }

  static get cellStickyClass() {
    return `${prefix}--pricing-table-header-cell--sticky`;
  }

  static styles = styles;
}

export default DDSPricingTableHeaderRow;
