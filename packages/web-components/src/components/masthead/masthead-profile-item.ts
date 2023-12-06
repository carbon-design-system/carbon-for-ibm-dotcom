/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CDSHeaderMenuItem from '../../internal/vendor/@carbon/web-components/components/ui-shell/header-menu-item.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Profile menu item in masthead.
 *
 * @element c4d-masthead-profile-item
 */
@customElement(`${c4dPrefix}-masthead-profile-item`)
class C4DMastheadProfileItem extends CDSHeaderMenuItem {
  static styles = styles;

  firstUpdated() {
    this.shadowRoot
      ?.querySelectorAll('[role="menuitem"]')
      .forEach((menuItem) => menuItem.removeAttribute('role'));
  }
}

export default C4DMastheadProfileItem;
