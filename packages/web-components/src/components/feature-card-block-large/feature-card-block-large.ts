/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import deprecate from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/deprecate/deprecate';
import { DDSFeatureCardBase } from '../feature-card/feature-card';
import '../image/image';
import styles from './feature-card-block-large.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature Card Block Large.
 *
 * @element dds-feature-card-block-large
 */
@customElement(`${ddsPrefix}-feature-card-block-large`)
class DDSFeatureCardBlockLarge extends StableSelectorMixin(DDSFeatureCardBase) {
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
      linkNode.classList.remove(`${prefix}--feature-card`);
      linkNode.classList.add(`${prefix}--feature-card-block-large`);
    }
  }

  static get stableSelector() {
    return `${ddsPrefix}--feature-card-block-large`;
  }

  static styles = styles;
}

export default deprecate(
  DDSFeatureCardBlockLarge,
  `The FeatureCardBlockLarge component has been deprecated in favor of the FeatureCard component. ` +
    `See FeatureCard's size attribute documentation for more information.`
);
