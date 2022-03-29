/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, LitElement, html, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './pricing-table.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-headline`)
class DDSPricingTableHeaderHeadline extends StableSelectorMixin(LitElement) {
  @property({ reflect: true })
  slot = 'headline';

  render() {
    return html`
      <div class=${`${prefix}--grid--full-width`}>
        <div class=${`${prefix}--row`}>
          <div class=${`${prefix}--col-lg-4`}>
            <slot name="heading"></slot>
          </div>
          <div class=${`${prefix}--col-lg-8`}>
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-headline`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSPricingTableHeaderHeadline;
