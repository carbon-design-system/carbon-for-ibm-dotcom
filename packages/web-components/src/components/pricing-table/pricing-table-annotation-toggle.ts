/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, LitElement, property } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import Info16 from 'carbon-web-components/es/icons/information/16';
import Close16 from 'carbon-web-components/es/icons/close/16';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './pricing-table.scss';
import DDSPricingTableRow from './pricing-table-row';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-annotation-toggle`)
class DDSPricingTableAnnotationToggle extends StableSelectorMixin(LitElement) {
  @property()
  toggled: boolean = false;

  @property()
  parentRow: DDSPricingTableRow | null = null;

  private _handleClick = () => {
    const newVal = !this.toggled;
    this.toggled = newVal;
    this.dispatchEvent(
      new CustomEvent('event-toggle-annotations', {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          emitter: this.parentRow,
          value: newVal,
        },
      })
    );
  };

  connectedCallback(): void {
    this.parentRow = this.closest(`${ddsPrefix}-pricing-table-row`);
    super.connectedCallback();
  }

  render() {
    const { toggled } = this;
    return html`
      <button @click="${this._handleClick}">
        ${toggled ? Close16() : Info16()}
      </button>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-highlight-label`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSPricingTableAnnotationToggle;
