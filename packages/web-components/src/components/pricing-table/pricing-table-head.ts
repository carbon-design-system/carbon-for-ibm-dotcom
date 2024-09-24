/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DStructuredListHead from '../structured-list/structured-list-head';
import styles from './pricing-table.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

@customElement(`${c4dPrefix}-pricing-table-head`)
class C4DPricingTableHead extends StableSelectorMixin(C4DStructuredListHead) {
  static get stableSelector() {
    return `${c4dPrefix}--pricing-table-head`;
  }

  static styles = styles;
}

export default C4DPricingTableHead;
