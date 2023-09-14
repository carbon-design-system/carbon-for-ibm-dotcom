/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import CDSTabs from '../../internal/vendor/@carbon/web-components/components/tabs/tabs';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = settings;

/**
 * Megamenu Tabs.
 *
 * @element dds-megamenu-tabs
 */
@customElement(`${ddsPrefix}-megamenu-tabs`)
class DDSMegaMenuTabs extends CDSTabs {
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
    return `${ddsPrefix}-megamenu-tab`;
  }

  /**
   * A selector that will return enabled tab items.
   */
  static get selectorItemEnabled() {
    return `${ddsPrefix}-megamenu-tab:not([disabled])`;
  }

  /**
   * A selector that will return selected items.
   */
  static get selectorItemSelected() {
    return `${ddsPrefix}-megamenu-tab[selected]`;
  }

  /**
   * The name of the custom event fired before a tab is selected upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   */
  static get eventBeforeSelect() {
    return `${ddsPrefix}-megamenu-tabs-beingselected`;
  }

  static styles = styles;
}

export default DDSMegaMenuTabs;
