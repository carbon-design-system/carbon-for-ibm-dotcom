/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import C4DButton from '../cta/button-cta';
import { BUTTON_KIND } from '@carbon/web-components/es/components/button/button';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './pricing-table.scss?lit';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

@customElement(`${c4dPrefix}-pricing-table-header-cell-cta`)
class C4DPricingTableHeaderCellCta extends StableSelectorMixin(C4DButton) {
  @property({ reflect: true })
  slot = 'cta';

  connectedCallback(): void {
    this.kind = BUTTON_KIND.TERTIARY;
    super.connectedCallback();
  }

  static get stableSelector() {
    return `${c4dPrefix}--pricing-table-header-cell-cta`;
  }

  static styles = styles;
}

export default C4DPricingTableHeaderCellCta;
