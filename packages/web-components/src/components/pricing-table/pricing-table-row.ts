/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DStructuredListRow from '../structured-list/structured-list-row';
import styles from './pricing-table.scss?lit';
import { setColumnWidth } from './utils';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

@customElement(`${c4dPrefix}-pricing-table-row`)
class C4DPricingTableRow extends StableSelectorMixin(C4DStructuredListRow) {
  @property()
  hasAnnotations = false;

  protected _handleSlotChange() {
    setColumnWidth(this);
  }

  private _hasAnnotations(): boolean {
    let hasAnnotations = false;
    Array.from(this.children).forEach((cell) => {
      const annotation = cell.querySelector(
        `${c4dPrefix}-pricing-table-cell-annotation`
      );
      if (annotation) {
        hasAnnotations = true;
      }
    });

    return hasAnnotations;
  }

  connectedCallback(): void {
    this.hasAnnotations = this._hasAnnotations();

    if (this.hasAnnotations) {
      const toggle = this.ownerDocument.createElement(
        'c4d-pricing-table-annotation-toggle'
      );
      this.children[0].append(toggle);
    }

    super.connectedCallback();
  }

  render() {
    return html` <slot @slotchange=${this._handleSlotChange}></slot> `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--pricing-table-row`;
  }

  static styles = styles;
}

export default C4DPricingTableRow;
