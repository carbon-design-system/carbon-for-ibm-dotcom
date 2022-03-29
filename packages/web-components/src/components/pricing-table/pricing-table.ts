/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSStructuredList from '../structured-list/structured-list';
import styles from './pricing-table.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table`)
class DDSPricingTable extends StableSelectorMixin(DDSStructuredList) {
  connectedCallback() {
    super.connectedCallback();
  }

  protected _renderHeadline = () => {
    return html`
      <slot name="headline"></slot>
    `;
  };

  render() {
    return html`
      ${this._renderHeadline()} ${super.render()}
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSPricingTable;
