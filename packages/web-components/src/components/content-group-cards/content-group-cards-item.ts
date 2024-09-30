/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DCard from '../card/card';
import styles from './content-group-cards.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Content Group Card item.
 *
 * @element c4d-content-group-card-item
 */
@customElement(`${c4dPrefix}-content-group-cards-item`)
class C4DContentGroupCardsItem extends StableSelectorMixin(C4DCard) {
  static get stableSelector() {
    return `${c4dPrefix}--content-group-cards-item`;
  }

  static styles = styles;
}

console.warn(
  'The content-group-cards-item component has been deprecated in favor of the content-section/block and the card group component. ' +
    'See content-section/block and card-group documentation for more information.'
);

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DContentGroupCardsItem;
