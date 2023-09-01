/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import deprecate from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/deprecate/deprecate';
import C4DFeatureCard from '../feature-card/feature-card';
import '../image/image';
import styles from './feature-card-block-large.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Feature Card Block Large.
 *
 * @element c4d-feature-card-block-large
 */
@customElement(`${c4dPrefix}-feature-card-block-large`)
class C4DFeatureCardBlockLarge extends StableSelectorMixin(C4DFeatureCard) {
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
    return `${c4dPrefix}--feature-card-block-large`;
  }

  static styles = styles;
}

export default deprecate(
  C4DFeatureCardBlockLarge,
  `The FeatureCardBlockLarge component has been deprecated in favor of the FeatureCard component. ` +
    `See FeatureCard's size attribute documentation for more information.`
);
