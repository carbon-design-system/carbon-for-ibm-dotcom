/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit/decorators.js';
import BXTabs from '@carbon/web-components/es/components/tabs/tabs.js';
import ddsSettings from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './cloud-masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Cloud Megamenu Tabs.
 *
 * @element dds-cloud-megamenu-tabs
 */
@customElement(`${ddsPrefix}-cloud-megamenu-tabs`)
class DDSCloudMegaMenuTabs extends BXTabs {
  /**
   * A selector that will return megamenu tabs.
   */
  static get selectorItem() {
    return `${ddsPrefix}-cloud-megamenu-tab`;
  }

  /**
   * A selector that will return selected items.
   */
  static get selectorItemSelected() {
    return `${ddsPrefix}-cloud-megamenu-tab[selected]`;
  }

  static styles = styles;
}

export default DDSCloudMegaMenuTabs;
