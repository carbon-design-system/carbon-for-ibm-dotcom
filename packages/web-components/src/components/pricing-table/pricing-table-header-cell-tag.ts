/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property } from 'lit/decorators.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSTagLink from '../tag-link/tag-link';
import styles from './pricing-table.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-header-cell-tag`)
class DDSPricingTableHeaderCellTag extends StableSelectorMixin(DDSTagLink) {
  @property({ reflect: true })
  slot = 'tag';

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-header-cell-tag`;
  }

  static styles = styles;
}

export default DDSPricingTableHeaderCellTag;
