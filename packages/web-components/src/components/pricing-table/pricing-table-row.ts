/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, property } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSStructuredListRow from '../structured-list/structured-list-row';
import styles from './pricing-table.scss';
import { setColumnWidth } from './utils';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-row`)
class DDSPricingTableRow extends StableSelectorMixin(DDSStructuredListRow) {
  @property()
  hasAnnotations: boolean = false;

  protected _handleSlotChange() {
    setColumnWidth(this);
  }

  private _hasAnnotations(): boolean {
    let hasAnnotations = false;
    Array.from(this.children).forEach((cell) => {
      const annotation = cell.querySelector(
        `${ddsPrefix}-pricing-table-cell-annotation`
      );
      if (annotation) hasAnnotations = true;
    });

    return hasAnnotations;
  }

  connectedCallback(): void {
    this.hasAnnotations = this._hasAnnotations();

    if (this.hasAnnotations) {
      const toggle = this.ownerDocument.createElement(
        'dds-pricing-table-annotation-toggle'
      );
      this.children[0].append(toggle);
    }

    super.connectedCallback();
  }

  render() {
    return html` <slot @slotchange=${this._handleSlotChange}></slot> `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-row`;
  }

  static styles = styles;
}

export default DDSPricingTableRow;
