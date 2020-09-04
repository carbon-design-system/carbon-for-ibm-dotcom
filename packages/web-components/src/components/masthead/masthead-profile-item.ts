/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import BXHeaderMenuItem from 'carbon-web-components/es/components/ui-shell/header-menu-item.js';
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
}

export default DDSMastheadProfileItem;
