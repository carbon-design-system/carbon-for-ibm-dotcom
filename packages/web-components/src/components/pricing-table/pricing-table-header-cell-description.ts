/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './pricing-table.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-header-cell-description`)
class DDSPricingTableHeaderCellDescription extends StableSelectorMixin(LitElement) {
  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement).assignedNodes();
    hasContent.forEach(e => this.shadowRoot?.querySelector(`.${prefix}--pricing-table-header-cell-description-body`)?.append(e));
  }

  render() {
    return html`
      <div class="${prefix}--pricing-table-header-cell-description-body"></div>
      <slot @slotchange="${this._handleSlotChange}"></slot>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-header-cell-description`;
  }

  static styles = styles;
}

export default DDSPricingTableHeaderCellDescription;
