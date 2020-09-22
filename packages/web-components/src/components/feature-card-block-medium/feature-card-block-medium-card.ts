/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSFeatureCard from '../feature-card/feature-card';
import styles from './feature-card-block-medium.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature Card Block Medium Card
 *
 * @element dds-feature-card-block-medium-card
 */
@customElement(`${ddsPrefix}-feature-card-block-medium-card`)
class DDSFeatureCardBlockMediumCard extends DDSFeatureCard {
  updated(changedProperties) {
    super.updated(changedProperties);
    const { _linkNode: linkNode } = this;
    if (linkNode) {
      linkNode.classList.remove(`${prefix}--link`);
      linkNode.classList.add(`${prefix}--card--inverse`);
      linkNode.classList.add(`${prefix}--feature-card`);
    }
  }

  static get stableSelector() {
    return `${ddsPrefix}--feature-card-block-medium-card`;
  }

  static styles = styles;
}

export default DDSFeatureCardBlockMediumCard;
