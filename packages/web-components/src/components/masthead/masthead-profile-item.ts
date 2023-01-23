/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import BXHeaderMenuItem from '../../internal/vendor/@carbon/web-components/components/ui-shell/header-menu-item.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Profile menu item in masthead.
 *
 * @element dds-masthead-profile-item
 */
@customElement(`${ddsPrefix}-masthead-profile-item`)
class DDSMastheadProfileItem extends BXHeaderMenuItem {
  static styles = styles;

  firstUpdated() {
    this.shadowRoot
      ?.querySelectorAll('[role="menuitem"]')
      .forEach((menuItem) => menuItem.removeAttribute('role'));
  }
}

export default DDSMastheadProfileItem;
