/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import styles from './pricing-table.scss';
import DDSPricingTableHeaderCellDescription from './pricing-table-header-cell-description';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-cell-annotation`)
class DDSPricingTableCellAnnotation extends DDSPricingTableHeaderCellDescription {
  @property({ reflect: true })
  slot = 'annotation';

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-group-annotation`;
  }

  static styles = styles;
}

export default DDSPricingTableCellAnnotation;
