/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property, query, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import StickyHeader from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/StickyHeader/StickyHeader';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSStructuredList from '../structured-list/structured-list';
import styles from './pricing-table.scss';
import DDSPricingTableHeaderCell from './pricing-table-header-cell';
import DDSPricingTableHighlightLabel from './pricing-table-highlight-label';
import DDSPricingTableHead from './pricing-table-head';
import DDSPricingTableHeaderRow from './pricing-table-header-row';
import { PRICING_TABLE_HEADER_CELL_TYPES } from './defs';
import { slideHidden, slideUnhidden } from './utils';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table`)
class DDSPricingTable extends StableSelectorMixin(DDSStructuredList) {
  @property({ reflect: true, attribute: 'highlight-column' })
  highlightColumn?: number;

  @property({ reflect: true, attribute: 'highlight-label' })
  highlightLabel?: string;

  @property()
  highlightClass = 'highlighted';

  @property()
  highlightGap: number = 0;

  private _head?: DDSPricingTableHead;

  private _headerRow?: DDSPricingTableHeaderRow;

  /**
   * Node to track focus going outside of modal content.
   */
  @query('#start-sentinel')
  private _startSentinelNode!: HTMLSpanElement;

  /**
   * Node to track focus going outside of modal content.
   */
  @query('#end-sentinel')
  private _endSentinelNode!: HTMLSpanElement;

  /**
   * Observer that watches for viewport resizes.
   */
  private _intersectionObserverStart: IntersectionObserver | null = null;

  /**
   * Observer that watches for viewport resizes.
   */
  private _intersectionObserverEnd: IntersectionObserver | null = null;

  /**
   * The height of the header row.
   */
  private _getHeaderHeight() {
    return this._headerRow?.getBoundingClientRect().height || 0;
  }

  /**
   * Takes actions whenever the pricing table enters the viewport.
   */
  private _createIntersectionObservers() {
    const { _startSentinelNode, _endSentinelNode } = this;

    if (this.shadowRoot) {
      this._intersectionObserverStart = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          // console.log('DEBUG: start entry', entry);
          const { isIntersecting, boundingClientRect } = entry;
          if (!isIntersecting && boundingClientRect.top < 0 && !this._isSticky) {
            this._setSticky(true);
          } else if (this._isSticky) {
            this._setSticky(false);
          }
        });
      });

      this._intersectionObserverEnd = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          console.log('DEBUG: end entry', entry);

          const { isIntersecting, boundingClientRect } = entry;

          if (!isIntersecting && boundingClientRect.top < -1) {
            // this._setSticky(false);
            this._headerRow.style.display = 'none';
          }

          if (isIntersecting && boundingClientRect.top >= -1) {
            // this._setSticky(true);
            this._headerRow.style.display = '';
          }
        });
      });

      this._intersectionObserverStart.observe(_startSentinelNode);
      this._intersectionObserverEnd.observe(_endSentinelNode);
    }
  }

  /**
   * Safely disconnects and removes the intersection observer.
   */
  private _cleanIntersectionObservers() {
    if (this._intersectionObserverStart instanceof IntersectionObserver) {
      this._intersectionObserverStart.disconnect();
    }
    this._intersectionObserverStart = null;

    if (this._intersectionObserverEnd instanceof IntersectionObserver) {
      this._intersectionObserverEnd.disconnect();
    }
    this._intersectionObserverEnd = null;
  }

  /**
   * Clean any set intersection observers, then create new ones.
   */
  private _cleanAndCreateIntersectionObservers() {
    if (this._intersectionObserverStart && this._intersectionObserverEnd) {
      this._cleanIntersectionObservers();
    }

    if (!this._intersectionObserverStart && !this._intersectionObserverEnd) {
      this._createIntersectionObservers();
    }
  }

  /**
   * Tracks whether the row is set to sticky.
   */
  private _isSticky: boolean = false;

  /**
   * Tracks width of the parent element so we know how wide the fixed header
   * row should be.
   */
  private _maxWidth: number | undefined;

  /**
   * Tracks elements in header cells that should be hidden when set to sticky.
   */
  private _elementsToHide: HTMLElement[] = [];

  private _setMaxWidth() {
    this._maxWidth = this.getBoundingClientRect().width;
    this.style.setProperty('--max-width', `${this._maxWidth}px`);
  }

  private _setElementsToHide() {
    const { _headerRow } = this;
    this._elementsToHide = [];
    const selectors = [`.${prefix}--pricing-table-header-cell-tag-wrapper`, `.${prefix}--pricing-table-cell-inner`];

    if (_headerRow) {
      const validCells = Array.from(_headerRow.children).filter(cell => {
        return cell instanceof DDSPricingTableHeaderCell && cell.getAttribute('type') !== PRICING_TABLE_HEADER_CELL_TYPES.SIMPLE;
      });
      validCells.forEach(cell => {
        selectors.forEach(selector => {
          if (cell.shadowRoot !== null) {
            const element = cell.shadowRoot.querySelector(selector);
            if (element instanceof HTMLElement) {
              this._elementsToHide.push(element);
            }
          }
        });
      });
    }
  }

  private async _animateElements(visible: boolean) {
    const { _elementsToHide } = this;
    _elementsToHide.forEach(element => {
      if (visible) {
        slideUnhidden(element);
      } else {
        slideHidden(element);
      }
    });
  }

  private _setSticky(sticky: boolean = !this._isSticky) {
    const { _head, _headerRow } = this;
    const { tableStickyClass, rowStickyClass, cellStickyClass } = this.constructor as typeof DDSPricingTable;

    console.log('DEBUG: setting sticky to', sticky);

    // Toggle sticky property
    this._isSticky = sticky;

    // Adjust classes.
    if (_head && _headerRow) {
      const cells = Array.from(_headerRow.children);

      if (sticky) {
        // Table
        this.classList.add(tableStickyClass);

        // Head
        _head.style.display = 'block';
        _head.style.height = `${this._getHeaderHeight()}px`;

        // Row
        _headerRow.classList.add(rowStickyClass);

        // Cells
        cells.forEach(cell => {
          cell.classList.add(cellStickyClass);
        });
      } else {
        // Table
        this.classList.remove(tableStickyClass);

        // Head
        _head.style.display = '';
        _head.style.height = '';

        // Row
        _headerRow.classList.remove(rowStickyClass);

        // Cells
        cells.forEach(cell => {
          cell.classList.remove(cellStickyClass);
        });
      }
    }

    // Animate elements.
    this._animateElements(!sticky);
  }

  protected _renderHighlightLabel(): DDSPricingTableHighlightLabel {
    const { highlightLabel } = this;
    const element = this.ownerDocument.createElement(
      `${ddsPrefix}-pricing-table-highlight-label`
    ) as DDSPricingTableHighlightLabel;
    element.innerText = highlightLabel || '';
    return element;
  }

  protected _unhighlightCells(cells: NodeListOf<Element>): void {
    const { highlightClass } = this;
    cells.forEach(cell => {
      cell.classList.remove(highlightClass);
      cell.querySelector(`${ddsPrefix}-pricing-table-highlight-label`)?.remove();
      this.style.marginTop = '';
    });
  }

  protected _highlightCells(cells: NodeListOf<Element>): void {
    const { highlightLabel, highlightClass } = this;
    cells.forEach(cell => cell.classList.add(highlightClass));
    if (highlightLabel) {
      const firstCell = cells[0];
      if (firstCell instanceof DDSPricingTableHeaderCell) {
        firstCell.prepend(this._renderHighlightLabel());
      }
      this._setHighlightGap();
    }
  }

  protected _setHighlightGap(): void {
    const wrapper = this.shadowRoot?.getElementById(DDSStructuredList.wrapperId) || this;
    (async () => {
      return this.querySelector(`${ddsPrefix}-pricing-table-highlight-label`);
    })()
      .then(value => {
        this.highlightGap = value?.getBoundingClientRect().height || 0;
        wrapper.style.marginTop = `${this.highlightGap}px`;
      })
      .catch(() => {
        wrapper.style.marginTop = '';
      });
  }

  firstUpdated() {
    const head = this.querySelector(`${ddsPrefix}-pricing-table-head`);
    if (head instanceof DDSPricingTableHead) {
      this._head = head;
    }

    const headerRow = head?.querySelector(`${ddsPrefix}-pricing-table-header-row`);
    if (headerRow instanceof DDSPricingTableHeaderRow) {
      this._headerRow = headerRow;
    }

    this._setMaxWidth();
    // this._createIntersectionObservers();

    if (StickyHeader.isNecessary()) {
      StickyHeader.global.pricingTable = this;
    }
  }

  updated(): void {
    const { highlightColumn } = this;
    if (highlightColumn) {
      this._unhighlightCells(
        this.querySelectorAll(`
        ${ddsPrefix}-pricing-table-cell,
        ${ddsPrefix}-pricing-table-header-cell`)
      );
      this._highlightCells(
        this.querySelectorAll(`
        ${ddsPrefix}-pricing-table-cell:nth-child(${highlightColumn}),
        ${ddsPrefix}-pricing-table-header-cell:nth-child(${highlightColumn})
      `)
      );
    }

    this._setElementsToHide();
    this._cleanAndCreateIntersectionObservers();
  }

  disconnectedCallback() {
    this._cleanIntersectionObservers();
    super.disconnectedCallback();
  }

  render() {
    const sentinelClass = `${ddsPrefix}-pricing-table-sentinel`;

    return html`
      <section id="section" class="${`${prefix}--structured-list`}">
        <span class="${sentinelClass}" id="start-sentinel"></span>
        <slot></slot>
        <span class="${sentinelClass}" id="end-sentinel"></span>
      </section>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table`;
  }

  static get tableStickyClass() {
    return `${prefix}--pricing-table--header-sticky`;
  }

  static get rowStickyClass() {
    return `${prefix}--pricing-table-header-row--sticky`;
  }

  static get cellStickyClass() {
    return `${prefix}--pricing-table-header-cell--sticky`;
  }

  static styles = styles;
}

export default DDSPricingTable;
