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
import DDSCard from '../card/card';
import styles from './feature-card-block-large.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature Card Block Large.
 *
 * @element dds-feature-card-block-large
 */
@customElement(`${ddsPrefix}-feature-card-block-large`)
class DDSFeatureCardBlockLarge extends DDSCard {
  render() {
    return html`
      <div class="${prefix}--feature-card-block-large__container">
        ${super.render()}
      </div>
    `;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    const { _linkNode: linkNode } = this;
    if (linkNode) {
      linkNode.classList.add(`${prefix}--card--inverse`);
      linkNode.classList.add(`${prefix}--feature-card-block-large`);
    }
  }

  static get stableSelector() {
    return `${ddsPrefix}--feature-card-block-large`;
  }

  static styles = styles;
}

export default DDSFeatureCardBlockLarge;
