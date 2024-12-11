/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import C4DCard from '../card/card';
import styles from './card-link.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Card Link.
 *
 * @element c4d-card-link
 */
@customElement(`${c4dPrefix}-card-link`)
class C4DCardLink extends C4DCard {
  /**
   * `true` to disable the card link.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  updated(changedProperties) {
    super.updated(changedProperties);
    const { _linkNode: linkNode } = this;
    if (linkNode) {
      linkNode.classList.add(`${prefix}--card__CTA`);
      if (changedProperties.has('disabled')) {
        const { disabled } = this;
        linkNode.classList.toggle(`${prefix}--card__CTA--disabled`, disabled);
      }
    }
  }

  static get stableSelector() {
    return `${c4dPrefix}--card-link`;
  }

  static styles = styles;
}

console.warn(
  'The card-link component has been deprecated in favor of the card (link variant) component. ' +
    'See card documentation for more information.'
);

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCardLink;
