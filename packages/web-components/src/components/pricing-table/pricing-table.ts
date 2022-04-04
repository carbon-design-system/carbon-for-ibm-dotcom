/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
// import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSStructuredList from '../structured-list/structured-list';
import styles from './pricing-table.scss';
import DDSPricingTableHeaderCell from './pricing-table-header-cell';
import DDSPricingTableHighlightLabel from './pricing-table-highlight-label';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table`)
class DDSPricingTable extends DDSStructuredList {
  @property({ reflect: true, attribute: 'highlight-column' })
  highlightColumn?: number;

  @property({ reflect: true, attribute: 'highlight-label' })
  highlightLabel?: string;

  @property()
  highlightClass = 'highlighted';

  protected _renderHighlightLabel(): DDSPricingTableHighlightLabel {
    const { highlightLabel } = this;
    const element = document.createElement(`${ddsPrefix}-pricing-table-highlight-label`) as DDSPricingTableHighlightLabel;
    element.innerText = highlightLabel || '';
    return element;
  }

  protected _unhighlightCells(cells): void {
    const { highlightClass } = this;
    cells.forEach(cell => {
      cell.classList.remove(highlightClass);
      cell.querySelector(`${ddsPrefix}-pricing-table-highlight-label`)?.remove();
      this.style.marginTop = '';
    });
  }

  protected _highlightCells(cells): void {
    const { highlightLabel, highlightClass } = this;
    cells.forEach(cell => cell.classList.add(highlightClass));
    if (highlightLabel) {
      const firstCell = cells[0];
      if (firstCell instanceof DDSPricingTableHeaderCell) {
        firstCell.prepend(this._renderHighlightLabel());
      }
      this._setMarginTop();
    }
  }

  protected _setMarginTop(): void {
    (async () => {
      return this.querySelector(`${ddsPrefix}-pricing-table-highlight-label`);
    })()
      .then(value => {
        this.style.marginTop = `${value?.getBoundingClientRect().height}px`;
      })
      .catch(() => {
        this.style.marginTop = '';
      });
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

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSPricingTable;
