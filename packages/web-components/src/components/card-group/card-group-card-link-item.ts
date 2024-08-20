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
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';
import C4DCardLinkCTA from '../cta/card-link-cta';
import styles from './card-group.scss';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Card Group Card Link item.
 *
 * @element c4d-card-group-card-link-item
 */
@customElement(`${c4dPrefix}-card-group-card-link-item`)
class C4DCardGroupCardLinkItem extends C4DCardLinkCTA {
  /**
   * `true` if the card group is using border.
   */
  @property({ type: Boolean, reflect: true })
  border = false;

  /**
   * `true` if the card group item is empty.
   */
  @property({ type: Boolean, reflect: true })
  empty = false;

  /**
   * `true` if the card group item has the same background color as the pattern container.
   */
  @property({ type: Boolean, reflect: true })
  patternBackground = false;

  static get stableSelector() {
    return `${c4dPrefix}--card-group-card-link-item`;
  }

  /**
   * A selector that will return the child footer.
   */
  static get selectorFooter() {
    return `${c4dPrefix}-card-cta-footer`;
  }

  static styles = styles;
}

console.warn(
  'The card-group-card-link-item component has been deprecated in favor of default card or with content-item. ' +
    'See card-group documentation for more information.'
);
/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCardGroupCardLinkItem;
