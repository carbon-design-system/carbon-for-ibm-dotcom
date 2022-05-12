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
import { slow01 } from '@carbon/motion/es/index';
import StickyHeader from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/StickyHeader/StickyHeader';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSStructuredList from '../structured-list/structured-list';
import styles from './pricing-table.scss';
import DDSPricingTableHeaderCell from './pricing-table-header-cell';
import DDSPricingTableHighlightLabel from './pricing-table-highlight-label';
import DDSPricingTableHead from './pricing-table-head';
import DDSPricingTableHeaderRow from './pricing-table-header-row';
import { PRICING_TABLE_HEADER_CELL_TYPES } from './defs';
import { slideHidden, slideUnhidden, convertStyleToObject } from './utils';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;
const animationTiming = Number(slow01.substring(0, slow01.indexOf('ms')));

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

  /**
   * This table's DDSPricingTableHead node.
   */
  public head?: DDSPricingTableHead;

  /**
   * This table's DDSPricingTableHeaderRow node.
   */
  public headerRow?: DDSPricingTableHeaderRow;

  /**
   * This table's DDSPricingTableHeaderCell nodes.
   */
  public headerCells?: DDSPricingTableHeaderCell[];

  /**
   * Tracks whether the row is set to sticky.
   */
  public isSticky: boolean = false;

  /**
   * Tracks width of the parent element so we know how wide the fixed header
   * row should be.
   */
  private _maxWidth: number | undefined;

  /**
   * Tracks elements in header cells that should be hidden when set to sticky.
   */
  private _elementsToHide: HTMLElement[] = [];

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
   * Observer that watches intersection of window and start of pricing table.
   */
  private _intersectionObserverStart: IntersectionObserver | null = null;

  /**
   * Observer that watches intersection of window and end of pricing table.
   */
  private _intersectionObserverEnd: IntersectionObserver | null = null;

  /**
   * Observer that watches document root for style attribute changes.
   */
  private _mutationObserverHeaderHeight: MutationObserver | null = null;

  /**
   * Observer that watches for viewport resizes.
   */
  // TODO: Wait for `.d.ts` update to support `ResizeObserver`
  // @ts-ignore
  private _resizeObserver: ResizeObserver | null = null;

  /**
   * The height of the header row.
   */
  private _getHeaderHeight(): number {
    return this.headerRow?.getBoundingClientRect().height || 0;
  }

  /**
   * The height of the last row in the table body.
   */
  private _getLastRowHeight(): number {
    const rows = this.querySelectorAll(`${ddsPrefix}-pricing-table-row`);
    return rows[rows.length - 1].getBoundingClientRect().height || 0;
  }

  /**
   * Takes actions whenever the viewport is resized.
   */
  private _createResizeObserver() {
    // TODO: Wait for `.d.ts` update to support `ResizeObserver`
    // @ts-ignore
    this._resizeObserver = new ResizeObserver(() => {
      this._setMaxWidth();
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

  /**
   * Creates a mutation observer that watches the root element for style
   * attribute changes and resets the table's intersection observers.
   */
  private _createMutationObsever() {
    const { customPropertyName } = StickyHeader;
    this._mutationObserverHeaderHeight = new MutationObserver(entries => {
      entries.forEach(entry => {
        const currentValue = getComputedStyle(entry.target as HTMLElement).getPropertyValue(customPropertyName);

        // If previously there was no `style` and now we have a valid custom prop value...
        if (entry.oldValue === null && currentValue) {
          this._cleanIntersectionObservers();
          this._createIntersectionObservers();
        }
        // Else if the old value did include a valid custom prop value and we have a valid current value...
        else if (entry.oldValue !== null && entry.oldValue.indexOf(customPropertyName) !== -1 && currentValue) {
          const styleObj = convertStyleToObject(entry.oldValue);
          const oldValue = styleObj[customPropertyName] || null;

          if (currentValue !== oldValue) {
            this._cleanIntersectionObservers();
            this._createIntersectionObservers();
          }
        }
      });
    });

    this._mutationObserverHeaderHeight.observe(StickyHeader.global.ownerDocument.querySelector('html'), {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['style'],
    });
  }

  /**
   * Safely disconnects and removes the mutation observer.
   */
  private _cleanMutationObserver() {
    if (this._mutationObserverHeaderHeight instanceof MutationObserver) {
      this._mutationObserverHeaderHeight.disconnect();
    }
    this._mutationObserverHeaderHeight = null;
  }

  /**
   * Takes actions whenever the pricing table enters the viewport.
   */
  private _createIntersectionObservers() {
    const { _startSentinelNode, _endSentinelNode } = this;
    const stuckElementsHeight = StickyHeader.global.height || 0;
    const endObserverMargin = stuckElementsHeight + this._getLastRowHeight() + 1;

    if (this.shadowRoot) {
      this._intersectionObserverStart = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            const { isIntersecting, boundingClientRect } = entry;

            if (!isIntersecting && boundingClientRect.top <= stuckElementsHeight && !this.isSticky) {
              this._setSticky(true);
            } else if (isIntersecting && this.isSticky) {
              this._setSticky(false);
            }
          });
        },
        {
          rootMargin: `-${stuckElementsHeight}px 0px 0px 0px`,
          threshold: 0,
        }
      );

      this._intersectionObserverEnd = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            const { isIntersecting, boundingClientRect } = entry;

            if (!isIntersecting && boundingClientRect.top < endObserverMargin && this.headerRow) {
              this.headerRow.style.top = `-${this._getHeaderHeight()}px`;
            }

            if (isIntersecting && boundingClientRect.top >= -1 && this.headerRow) {
              this.headerRow.style.top = '';
            }
          });
        },
        {
          rootMargin: `-${endObserverMargin}px 0px 0px 0px`,
          threshold: 0,
        }
      );

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
   * Sets a CSS custom property that constrains the width of the fixed header.
   */
  private _setMaxWidth() {
    this._maxWidth = this.getBoundingClientRect().width;
    this.style.setProperty('--max-width', `${this._maxWidth}px`);
  }

  /**
   * Builds an array of references to elements that should be hidden when the
   * header is sticky.
   */
  private _setElementsToHide() {
    const { headerCells } = this;
    this._elementsToHide = [];
    const selectors = [`.${prefix}--pricing-table-header-cell-tag-wrapper`, `.${prefix}--pricing-table-cell-inner`];

    if (headerCells) {
      const validCells = headerCells.filter(cell => {
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

  /**
   * Animates header cells when transitioning between sticky states.
   */
  private _animateCells() {
    const { _elementsToHide, isSticky } = this;
    _elementsToHide.forEach(element => {
      if (!isSticky) {
        slideUnhidden(element);
      } else {
        slideHidden(element);
      }
    });
  }

  /**
   * Animates the header row when transitioning between sticky states.
   */
  private _animateHeaderRow() {
    const { head, headerRow, isSticky } = this;
    const { rowStickyClass } = this.constructor as typeof DDSPricingTable;
    if (head && headerRow) {
      if (!isSticky) {
        headerRow.classList.remove(rowStickyClass);
      } else {
        headerRow.classList.add(rowStickyClass);
      }
    }
  }

  /**
   * Set or unset sticky state of pricing table header row.
   */
  private _setSticky(sticky: boolean = !this.isSticky) {
    const { head, headerRow, headerCells } = this;
    const { cellStickyClass } = this.constructor as typeof DDSPricingTable;

    if (!head || !headerRow || !headerCells) return;

    this.isSticky = sticky;

    // Set CSS classes
    if (sticky) {
      headerCells.forEach(cell => {
        cell.classList.add(cellStickyClass);
      });
    } else {
      headerCells.forEach(cell => {
        cell.classList.remove(cellStickyClass);
      });
    }

    // Animate elements
    if (sticky) {
      this._animateCells();
      setTimeout(() => {
        this._animateHeaderRow();
        this._endSentinelNode.style.top = `-${this._getHeaderHeight()}px`;
      }, animationTiming);
    } else {
      this._animateCells();
      this._animateHeaderRow();
    }
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
      this.head = head;
    }

    const headerRow = head?.querySelector(`${ddsPrefix}-pricing-table-header-row`);
    if (headerRow instanceof DDSPricingTableHeaderRow) {
      this.headerRow = headerRow;
      this.headerCells = Array.from(headerRow.children) as DDSPricingTableHeaderCell[];
    }

    this._setMaxWidth();
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
    this._cleanIntersectionObservers();
    this._createIntersectionObservers();
  }

  connectedCallback() {
    this._createMutationObsever();
    this._createResizeObserver();
    super.connectedCallback();
  }

  disconnectedCallback() {
    this._cleanIntersectionObservers();
    this._cleanMutationObserver();
    this._cleanResizeObserver();
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

  static get rowStickyClass() {
    return `${prefix}--pricing-table-header-row--sticky`;
  }

  static get cellStickyClass() {
    return `${prefix}--pricing-table-header-cell--sticky`;
  }

  static styles = styles;
}

export default DDSPricingTable;
