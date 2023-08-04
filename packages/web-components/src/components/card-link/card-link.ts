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
import DDSCard from '../card/card';
import styles from './card-link.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: ddsPrefix } = settings;

/**
 * Card Link.
 *
 * @element dds-card-link
 */
@customElement(`${ddsPrefix}-card-link`)
class DDSCardLink extends DDSCard {
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
    return `${ddsPrefix}--card-link`;
  }

  static styles = styles;
}

console.warn(
  'The card-link component has been deprecated in favor of the card (link variant) component. ' +
    'See card documentation for more information.'
);

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCardLink;
