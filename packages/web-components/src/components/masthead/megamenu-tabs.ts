/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import BXTabs from '../../internal/vendor/@carbon/web-components/components/tabs/tabs';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Megamenu Tabs.
 *
 * @element dds-megamenu-tabs
 */
@customElement(`${ddsPrefix}-megamenu-tabs`)
class DDSMegaMenuTabs extends BXTabs {
  /**
   * A selector that will return megamenu tabs.
   */
  static get selectorItem() {
    return `${ddsPrefix}-megamenu-tab`;
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
