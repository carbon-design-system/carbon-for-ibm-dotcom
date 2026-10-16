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
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './pricing-table.scss';

const { stablePrefix: c4dPrefix } = settings;

@customElement(`${c4dPrefix}-pricing-table-highlight-label`)
class C4DPricingTableHighlightLabel extends StableSelectorMixin(LitElement) {
  @property({ reflect: true })
  slot = 'highlight-label';

  connectedCallback() {
    this.setAttribute('slot', 'highlight-label');
    super.connectedCallback();
  }

  render() {
    return html` <slot></slot> `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--pricing-table-highlight-label`;
  }

  static styles = styles;
}

export default C4DPricingTableHighlightLabel;
