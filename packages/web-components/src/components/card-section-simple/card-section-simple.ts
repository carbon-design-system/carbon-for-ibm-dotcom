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
import styles from './card-section-simple.scss';
import C4DContentSection from '../content-section/content-section';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The Card Section Simple pattern
 *
 * @element c4d-card-section-simple
 */
@customElement(`${c4dPrefix}-card-section-simple`)
class C4DCardSectionSimple extends StableSelectorMixin(C4DContentSection) {
  static get stableSelector() {
    return `${c4dPrefix}--card-section-simple`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

console.warn(
  'The card-section-simple component has been deprecated in favor of the content-section/block component combined with card-group. ' +
    'See content-section/block and card group documentation for more information.'
);

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCardSectionSimple;
