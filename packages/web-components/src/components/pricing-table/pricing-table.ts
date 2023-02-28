/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property, query, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import ddsSettings from '../../../src/internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSStructuredList from '../structured-list/structured-list';
import styles from './pricing-table.scss';
import DDSPricingTableHeaderCell from './pricing-table-header-cell';
import DDSPricingTableHighlightLabel from './pricing-table-highlight-label';
import DDSPricingTableHead from './pricing-table-head';
import DDSPricingTableHeaderRow from './pricing-table-header-row';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table`)
class DDSPricingTable extends HostListenerMixin(
  StableSelectorMixin(DDSStructuredList)
) {
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
   * Collect and store references to current header elements.
   */
  protected _getHeaderElements() {
    this.head = undefined;
    this.headerRow = undefined;
    this.headerCells = undefined;

    const head = this.querySelector(`${ddsPrefix}-pricing-table-head`);
    if (head instanceof DDSPricingTableHead) {
      this.head = head;
    }

    const headerRow = head?.querySelector(
      `${ddsPrefix}-pricing-table-header-row`
    );
    if (headerRow instanceof DDSPricingTableHeaderRow) {
      this.headerRow = headerRow;
      this.headerCells = Array.from(
        headerRow.children
      ) as DDSPricingTableHeaderCell[];
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
    cells.forEach((cell) => {
      cell.classList.remove(highlightClass);
      cell
        .querySelector(`${ddsPrefix}-pricing-table-highlight-label`)
        ?.remove();
      this.style.marginTop = '';
    });
  }

  protected _highlightCells(cells: NodeListOf<Element>): void {
    const { highlightLabel, highlightClass } = this;
    cells.forEach((cell) => cell.classList.add(highlightClass));
    if (highlightLabel) {
      const firstCell = cells[0];
      if (firstCell instanceof DDSPricingTableHeaderCell) {
        firstCell.prepend(this._renderHighlightLabel());
      }
      this._setHighlightGap();
    }
  }

  protected _setHighlightGap(): void {
    const wrapper =
      this.shadowRoot?.getElementById(DDSStructuredList.wrapperId) || this;
    (async () => {
      return this.querySelector(`${ddsPrefix}-pricing-table-highlight-label`);
    })()
      .then((value) => {
        this.highlightGap = value?.getBoundingClientRect().height || 0;
        wrapper.style.marginTop = `${this.highlightGap}px`;
      })
      .catch(() => {
        wrapper.style.marginTop = '';
      });
  }

  /**
   * Host listener for updating header element references when cells are
   * updated.
   *
   * @protected
   */
  @HostListener('document:eventHeaderRowSlotchange')
  protected _handleHeaderRowSlotChange = () => {
    this._getHeaderElements();
  };

  updated(): void {
    const { highlightColumn } = this;

    this._getHeaderElements();

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

  connectedCallback() {
    this._newChildObserver.observe(this, {
      childList: true,
      subtree: true,
      attributes: false,
    });

    this._resetIntersectionObserver();
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  renderInner() {
    const { sentinelClass } = this.constructor as typeof DDSPricingTable;

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

  /**
   * The name of the custom event captured when the header row's slot changes.
   */
  static get eventHeaderRowSlotchange() {
    return DDSPricingTableHeaderRow.eventSlotChange;
  }

  static get sentinelClass() {
    return `${ddsPrefix}-pricing-table-sentinel`;
  }

  static get cellSelector() {
    return `${ddsPrefix}-pricing-table-cell, ${ddsPrefix}-pricing-table-header-cell`;
  }

  static styles = styles;
}

export default DDSPricingTable;
