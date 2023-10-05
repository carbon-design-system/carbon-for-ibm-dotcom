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
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DTagLink from '../tag-link/tag-link';
import styles from './pricing-table.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

@customElement(`${c4dPrefix}-pricing-table-header-cell-tag`)
class C4DPricingTableHeaderCellTag extends StableSelectorMixin(C4DTagLink) {
  @property({ reflect: true })
  slot = 'tag';

  static get stableSelector() {
    return `${c4dPrefix}--pricing-table-header-cell-tag`;
  }

  static styles = styles;
}

export default C4DPricingTableHeaderCellTag;
