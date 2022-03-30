/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSCard from '../card/card';
import '../image/image';
import styles from './feature-card.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature Card.
 *
 * @element dds-feature-card
 */
@customElement(`${ddsPrefix}-feature-card`)
class DDSFeatureCard extends StableSelectorMixin(DDSCard) {
  /**
   * The size property to render either Medium (default) or Large Feature Card variants.
   */
  @property()
  size;

  updated(changedProperties) {
    super.updated(changedProperties);
    const { _linkNode: linkNode } = this;
    if (linkNode) {
      linkNode.classList.remove(`${prefix}--link`);
      linkNode.classList.add(`${prefix}--feature-card__card`);
    }
  }

  static get stableSelector() {
    return `${ddsPrefix}--feature-card`;
  }

  /**
   * A selector that will return the child footer.
   */
  static get selectorFooter() {
    return `${ddsPrefix}-feature-card-footer`;
  }

  static styles = styles;
}

export default DDSFeatureCard;
