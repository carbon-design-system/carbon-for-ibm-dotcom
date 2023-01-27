/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { DDSButtonCTABase } from '../cta/button-cta';
import { BUTTON_KIND } from '../button/button';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './pricing-table.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-header-cell-cta`)
class DDSPricingTableHeaderCellCta extends StableSelectorMixin(
  DDSButtonCTABase
) {
  @property({ reflect: true })
  slot = 'cta';

  connectedCallback(): void {
    this.kind = BUTTON_KIND.TERTIARY;
    super.connectedCallback();
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-header-cell-cta`;
  }

  static styles = styles;
}

export default DDSPricingTableHeaderCellCta;
