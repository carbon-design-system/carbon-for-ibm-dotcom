/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import CDSTabs from '@carbon/web-components/es/components/tabs/tabs';

import styles from './tabs-extended.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * A component to present content inside a tabbed layout.
 *
 * @element c4d-tabs-extended
 */
@customElement(`${c4dPrefix}-tabs-extended`)
class C4DTabsExtended extends StableSelectorMixin(CDSTabs) {
  static get stableSelector() {
    return `${c4dPrefix}--tabs-extended`;
  }

  /**
   * A selector that will return tabs.
   */
  static get selectorItem() {
    return `${c4dPrefix}-tab`;
  }

  /**
   * A selector that will return enabled tabs.
   */
  static get selectorItemEnabled() {
    return `${c4dPrefix}-tab:not([disabled])`;
  }

  /**
   * A selector that will return highlighted tabs.
   */
  static get selectorItemHighlighted() {
    return `${c4dPrefix}-tab[highlighted]`;
  }

  /**
   * A selector that will return selected tabs.
   */
  static get selectorItemSelected() {
    return `${c4dPrefix}-tab[selected]`;
  }

  /**
   * The name of the custom event fired before a tab is selected upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   */
  static get eventBeforeSelect() {
    return `${c4dPrefix}-tabs-beingselected`;
  }

  /**
   * The name of the custom event fired after a a tab is selected upon a user gesture.
   */
  static get eventSelect() {
    return `${c4dPrefix}-tabs-selected`;
  }

  static styles = styles;
}

console.warn(
  'The tabs-extended orientation prop has been deprecated in favor for only horizontal variations. ' +
    'See tabs-extended documentation for more information.'
);

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DTabsExtended;
