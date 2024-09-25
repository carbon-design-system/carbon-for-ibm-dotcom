/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DCard from '../card/card';
import '../image/image';
import styles from './feature-card.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Feature Card.
 *
 * @element c4d-feature-card
 */
@customElement(`${c4dPrefix}-feature-card`)
class C4DFeatureCard extends StableSelectorMixin(C4DCard) {
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
    return `${c4dPrefix}--feature-card`;
  }

  /**
   * A selector that will return the child footer.
   */
  static get selectorFooter() {
    return `${c4dPrefix}-feature-card-footer`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DFeatureCard;
