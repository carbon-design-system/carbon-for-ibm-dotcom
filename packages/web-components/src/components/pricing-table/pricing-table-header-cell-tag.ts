/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property } from 'lit-element';
// import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './pricing-table.scss';
import DDSTagLink from '../tag-link/tag-link';

// const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-header-cell-tag`)
class DDSPricingTableHeaderCellTag extends StableSelectorMixin(DDSTagLink) {
  @property({ reflect: true })
  slot = 'tag';

  connectedCallback(): void {
    super.connectedCallback();
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-header-cell-tag`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSPricingTableHeaderCellTag;
