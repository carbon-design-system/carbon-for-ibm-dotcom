/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit/decorators.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSStructuredListGroup from '../structured-list/structured-list-group';
import styles from './pricing-table.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-group`)
class DDSPricingTableGroup extends StableSelectorMixin(DDSStructuredListGroup) {
  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-group`;
  }

  static styles = styles;
}

export default DDSPricingTableGroup;
