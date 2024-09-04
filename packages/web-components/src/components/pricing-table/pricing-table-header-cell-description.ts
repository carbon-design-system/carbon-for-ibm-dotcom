/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './pricing-table.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

@customElement(`${c4dPrefix}-pricing-table-header-cell-description`)
class C4DPricingTableHeaderCellDescription extends StableSelectorMixin(
  LitElement
) {
  render() {
    return html` <slot></slot> `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--pricing-table-header-cell-description`;
  }

  static styles = styles;
}

export default C4DPricingTableHeaderCellDescription;
