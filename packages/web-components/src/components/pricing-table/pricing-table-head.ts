/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSStructuredListHead from '../structured-list/structured-list-head';
import styles from './pricing-table.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-head`)
class DDSPricingTableHead extends StableSelectorMixin(DDSStructuredListHead) {
  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-head`;
  }

  static styles = styles;
}

export default DDSPricingTableHead;
