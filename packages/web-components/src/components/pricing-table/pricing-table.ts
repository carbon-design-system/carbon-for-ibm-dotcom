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
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSStructuredList from '../structured-list/structured-list';
import styles from './pricing-table.scss';
import DDSPricingTableHeaderCell from './pricing-table-header-cell';
import DDSPricingTableHighlightLabel from './pricing-table-highlight-label';
import DDSPricingTableHeaderRow from './pricing-table-header-row';
import { PRICING_TABLE_HEADER_CELL_TYPES } from './defs';

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
   * Takes actions whenever the pricing table enters the viewport.
   */
  private _createIntersectionObservers() {
    const { _startSentinelNode, _endSentinelNode } = this;

    if (this.shadowRoot) {
      this._intersectionObserverStart = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this._unsetSticky();
          } else {
            this._setSticky();
          }
        });
      });

      this._intersectionObserverEnd = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this._setSticky();
          } else {
            this._unsetSticky();
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

  // eslint-disable-next-line class-methods-use-this
  private _animateHidden(element: HTMLElement) {
    const height = element.scrollHeight;
    const { transition } = element.style;
    element.style.transition = '';

    requestAnimationFrame(() => {
      element.style.height = `${height}px`;
      element.style.opacity = '1';
      element.style.transition = transition;

      requestAnimationFrame(() => {
        element.style.height = '0px';
        element.style.opacity = '0';
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private _animateUnhidden(element: HTMLElement) {
    const height = element.scrollHeight;
    element.style.height = `${height}px`;
    element.style.opacity = '1';

    element.addEventListener(
      'transitionend',
      () => {
        element.style.height = '';
        element.style.opacity = '';
      },
      { once: true }
    );
  }

  private async _animateElementsHidden() {
    const { _isSticky, _elementsToHide } = this;
    _elementsToHide.forEach(element => {
      if (_isSticky) {
        this._animateHidden(element);
      }
    });
  }

  private async _animateElementsUnhidden() {
    const { _isSticky, _elementsToHide } = this;
    _elementsToHide.forEach(element => {
      if (!_isSticky) {
        this._animateUnhidden(element);
      }
    });
  }

  private _setSticky() {
    const { _headerRow } = this;
    const { rowStickyClass, cellStickyClass } = this.constructor as typeof DDSPricingTable;

    // Set sticky property
    this._isSticky = true;

    // Set classes for CSS changes
    // this.classList.add(rowStickyClass);
    // Array.from(this.children).forEach(child => {
    //   child.classList.add(cellStickyClass);
    // });
    if (_headerRow) {
      _headerRow.classList.add(rowStickyClass);
      Array.from(_headerRow.children).forEach(cell => {
        cell.classList.add(cellStickyClass);
      });
    }

    // Hide elements
    this._animateElementsHidden();
  }

  private _unsetSticky() {
    const { _headerRow } = this;
    const { rowStickyClass, cellStickyClass } = this.constructor as typeof DDSPricingTable;

    // Set sticky property
    this._isSticky = false;

    // Remove classes for CSS changes
    // this.classList.remove(rowStickyClass);
    // Array.from(this.children).forEach(child => {
    //   child.classList.remove(cellStickyClass);
    // });
    if (_headerRow) {
      _headerRow.classList.remove(rowStickyClass);
      Array.from(_headerRow.children).forEach(cell => {
        cell.classList.remove(cellStickyClass);
      });
    }

    // Animate elements unhidden
    this._animateElementsUnhidden();
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
    this._createIntersectionObservers();

    const headerRow = this.querySelector(`${ddsPrefix}-pricing-table-head`)?.querySelector(
      `${ddsPrefix}-pricing-table-header-row`
    );
    if (headerRow instanceof DDSPricingTableHeaderRow) this._headerRow = headerRow;

    this._setMaxWidth();
    this._setElementsToHide();
  }

  disconnectedCallback() {
    this._cleanIntersectionObservers();
    super.disconnectedCallback();
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
  }

  render() {
    const sentinelClass = `${ddsPrefix}-pricing-table-sentinel`;

    return html`
      <span class="${sentinelClass}" id="start-sentinel"></span>
      ${super.render()}
      <span class="${sentinelClass}" id="end-sentinel"></span>
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
