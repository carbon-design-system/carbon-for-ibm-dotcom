/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DStructuredList from '../structured-list/structured-list';
import styles from './pricing-table.scss?lit';
import C4DPricingTableHeaderCell from './pricing-table-header-cell';
import C4DPricingTableHighlightLabel from './pricing-table-highlight-label';
import C4DPricingTableHead from './pricing-table-head';
import C4DPricingTableHeaderRow from './pricing-table-header-row';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

@customElement(`${c4dPrefix}-pricing-table`)
class C4DPricingTable extends HostListenerMixin(
  StableSelectorMixin(C4DStructuredList)
) {
  @property({ reflect: true, attribute: 'highlight-column' })
  highlightColumn?: number;

  @property({ reflect: true, attribute: 'highlight-label' })
  highlightLabel?: string;

  @property()
  highlightClass = 'highlighted';

  @property()
  highlightGap = 0;

  /**
   * This table's C4DPricingTableHead node.
   */
  public head?: C4DPricingTableHead;

  /**
   * This table's C4DPricingTableHeaderRow node.
   */
  public headerRow?: C4DPricingTableHeaderRow;

  /**
   * This table's C4DPricingTableHeaderCell nodes.
   */
  public headerCells?: C4DPricingTableHeaderCell[];

  /**
   * Collect and store references to current header elements.
   */
  protected _getHeaderElements() {
    this.head = undefined;
    this.headerRow = undefined;
    this.headerCells = undefined;

    const head = this.querySelector(`${c4dPrefix}-pricing-table-head`);
    if (head instanceof C4DPricingTableHead) {
      this.head = head;
    }

    const headerRow = head?.querySelector(
      `${c4dPrefix}-pricing-table-header-row`
    );
    if (headerRow instanceof C4DPricingTableHeaderRow) {
      this.headerRow = headerRow;
      this.headerCells = Array.from(
        headerRow.children
      ) as C4DPricingTableHeaderCell[];
    }
  }

  protected _renderHighlightLabel(): C4DPricingTableHighlightLabel {
    const { highlightLabel } = this;
    const element = this.ownerDocument.createElement(
      `${c4dPrefix}-pricing-table-highlight-label`
    ) as C4DPricingTableHighlightLabel;
    element.innerText = highlightLabel || '';
    return element;
  }

  protected _unhighlightCells(cells: NodeListOf<Element>): void {
    const { highlightClass } = this;
    cells.forEach((cell) => {
      cell.classList.remove(highlightClass);
      cell
        .querySelector(`${c4dPrefix}-pricing-table-highlight-label`)
        ?.remove();
      this.style.marginTop = '';
    });
  }

  protected _highlightCells(cells: NodeListOf<Element>): void {
    const { highlightLabel, highlightClass } = this;
    cells.forEach((cell) => cell.classList.add(highlightClass));
    if (highlightLabel) {
      const firstCell = cells[0];
      if (firstCell instanceof C4DPricingTableHeaderCell) {
        firstCell.prepend(this._renderHighlightLabel());
      }
      this._setHighlightGap();
    }
  }

  protected _setHighlightGap(): void {
    const wrapper =
      this.shadowRoot?.getElementById(C4DStructuredList.wrapperId) || this;
    (async () => {
      return this.querySelector(`${c4dPrefix}-pricing-table-highlight-label`);
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
        ${c4dPrefix}-pricing-table-cell,
        ${c4dPrefix}-pricing-table-header-cell`)
      );
      this._highlightCells(
        this.querySelectorAll(`
        ${c4dPrefix}-pricing-table-cell:nth-child(${highlightColumn}),
        ${c4dPrefix}-pricing-table-header-cell:nth-child(${highlightColumn})
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
    const { sentinelClass } = this.constructor as typeof C4DPricingTable;

    return html`
      <section id="section" class="${`${prefix}--structured-list`}">
        <span class="${sentinelClass}" id="start-sentinel"></span>
        <slot></slot>
        <span class="${sentinelClass}" id="end-sentinel"></span>
      </section>
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--pricing-table`;
  }

  /**
   * The name of the custom event captured when the header row's slot changes.
   */
  static get eventHeaderRowSlotchange() {
    return C4DPricingTableHeaderRow.eventSlotChange;
  }

  static get sentinelClass() {
    return `${c4dPrefix}-pricing-table-sentinel`;
  }

  static get cellSelector() {
    return `${c4dPrefix}-pricing-table-cell, ${c4dPrefix}-pricing-table-header-cell`;
  }

  static styles = styles;
}

export default C4DPricingTable;
