/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSStructuredListHeaderCell from '../structured-list/structured-list-header-cell';
import styles from './pricing-table.scss';
import { PRICING_TABLE_HEADER_CELL_TYPES } from './defs';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-header-cell`)
class DDSPricingTableHeaderCell extends StableSelectorMixin(DDSStructuredListHeaderCell) {
  @property({ reflect: true })
  type: PRICING_TABLE_HEADER_CELL_TYPES = PRICING_TABLE_HEADER_CELL_TYPES.COMPLEX;

  render() {
    const { type } = this;
    const { tagWrapperSelector } = this.constructor as typeof DDSPricingTableHeaderCell;

    return type === PRICING_TABLE_HEADER_CELL_TYPES.COMPLEX
      ? html`
          <div class="${prefix}--pricing-table-header-cell-inner">
            <div>
              <slot name="highlight-label"></slot>
              <slot name="headline"></slot>
              <slot name="caption"></slot>
              <div class="${tagWrapperSelector}">
                <slot name="tag"></slot>
              </div>
              <div class="${prefix}--pricing-table-cell-inner">
                <div class="${prefix}--pricing-table-cell-content">
                  <slot></slot>
                </div>
                <slot name="toggle"></slot>
              </div>
            </div>
            <div>
              <slot name="cta"></slot>
            </div>
          </div>
        `
      : html`
          <div class="${prefix}--pricing-table-cell-inner">
            <div class="${prefix}--pricing-table-cell-content">
              ${super.render()}
            </div>
          </div>
        `;
  }

  static get tagWrapperSelector() {
    return `${prefix}--pricing-table-header-cell-tag-wrapper`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-header-cell`;
  }

  static styles = styles;
}

export default DDSPricingTableHeaderCell;
