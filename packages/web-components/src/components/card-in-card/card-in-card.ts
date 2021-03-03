/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSFeatureCard from '../feature-card/feature-card';
import '../image/image';
import styles from './card-in-card.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card in Card.
 *
 * @element dds-card-in-card
 */
@customElement(`${ddsPrefix}-card-in-card`)
class DDSCardInCard extends StableSelectorMixin(DDSFeatureCard) {
  render() {
    return html`
      <div class="${prefix}--card-in-card__container">
        ${super.render()}
      </div>
    `;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    const { _linkNode: linkNode } = this;
    if (linkNode) {
      linkNode.classList.add(`${prefix}--card-in-card`);
    }
  }

  static get stableSelector() {
    return `${ddsPrefix}--card-in-card`;
  }

  static styles = styles;
}

export default DDSCardInCard;
