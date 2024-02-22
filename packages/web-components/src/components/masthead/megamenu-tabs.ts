/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CDSTabs from '@carbon/web-components/es/components/tabs/tabs';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss?lit';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Megamenu Tabs.
 *
 * @element c4d-megamenu-tabs
 */
@customElement(`${c4dPrefix}-megamenu-tabs`)
class C4DMegaMenuTabs extends CDSTabs {
  protected _disableIntersectionObservers = true;

  /**
   * @inheritdoc
   */
  // eslint-disable-next-line class-methods-use-this
  protected renderPreviousButton() {
    // Button is not desirable for our vertical tabs display.
    return null;
  }

  /**
   * @inheritdoc
   */
  // eslint-disable-next-line class-methods-use-this
  protected renderNextButton() {
    // Button is not desirable for our vertical tabs display.
    return null;
  }

  /**
   * A selector that will return megamenu tabs.
   */
  static get selectorItem() {
    return `${c4dPrefix}-megamenu-tab`;
  }

  /**
   * A selector that will return enabled tab items.
   */
  static get selectorItemEnabled() {
    return `${c4dPrefix}-megamenu-tab:not([disabled])`;
  }

  /**
   * A selector that will return selected items.
   */
  static get selectorItemSelected() {
    return `${c4dPrefix}-megamenu-tab[selected]`;
  }

  /**
   * The name of the custom event fired before a tab is selected upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   */
  static get eventBeforeSelect() {
    return `${c4dPrefix}-megamenu-tabs-beingselected`;
  }

  static styles = styles;
}

export default C4DMegaMenuTabs;
