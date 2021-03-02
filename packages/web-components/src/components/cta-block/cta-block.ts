/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { internalProperty, customElement, html, LitElement, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './cta-block.scss';
import DDSContentItem from '../content-item/content-item';
import DDSPromoGroup from '../promo-group/promo-group';
import DDSPromoItem from '../promo-item/promo-item';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-cta-block`)
class DDSCtaBlock extends StableSelectorMixin(LitElement) {
  render() {
    return html`
      <h1>Hello Summit!</h1>
      <h2><slot></slot></h2>
    `;
  }
}

export default DDSCtaBlock;
