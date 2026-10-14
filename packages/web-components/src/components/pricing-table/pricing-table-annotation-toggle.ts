/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import ChevronDown16 from '@carbon/icons/es/chevron--down/16.js';
import Close16 from '@carbon/icons/es/close/16.js';
import iconLoader from '@carbon/web-components/es/globals/internal/icon-loader.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './pricing-table.scss';
import C4DPricingTableRow from './pricing-table-row';

const { stablePrefix: c4dPrefix } = settings;

/**
 * @element c4d-pricing-table-annotation-toggle
 *
 * @csspart button - The button. Usage `c4d-pricing-table-annotation-toggle::part(button)`
 */

@customElement(`${c4dPrefix}-pricing-table-annotation-toggle`)
class C4DPricingTableAnnotationToggle extends StableSelectorMixin(LitElement) {
  @property({ reflect: true })
  slot = 'toggle';

  @property()
  toggled = false;

  @property()
  parentRow: C4DPricingTableRow | null = null;

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
    this.parentRow = this.closest(`${c4dPrefix}-pricing-table-row`);
    super.connectedCallback();
  }

  render() {
    const { toggled } = this;
    return html`
      <button
        part="button"
        @click="${this._handleClick}"
        type="button"
        aria-pressed="${toggled}"
        aria-label="cell annotations visibility">
        ${toggled ? iconLoader(Close16) : iconLoader(ChevronDown16)}
      </button>
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--pricing-table-annotation-toggle`;
  }

  static styles = styles;
}

export default C4DPricingTableAnnotationToggle;
