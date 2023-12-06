/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DStructuredListGroup from '../structured-list/structured-list-group';
import styles from './pricing-table.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
const { stablePrefix: c4dPrefix } = settings;

@customElement(`${c4dPrefix}-pricing-table-group`)
class C4DPricingTableGroup extends StableSelectorMixin(C4DStructuredListGroup) {
  static get stableSelector() {
    return `${c4dPrefix}--pricing-table-group`;
  }

  static styles = styles;
}

export default C4DPricingTableGroup;
