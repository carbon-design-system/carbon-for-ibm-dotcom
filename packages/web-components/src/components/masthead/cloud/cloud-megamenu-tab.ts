/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import BXTab from 'carbon-web-components/es/components/tabs/tab';
import styles from './cloud-masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Cloud Megamenu Tab.
 *
 * @element dds-cloud-megamenu-tab
 */
@customElement(`${ddsPrefix}-cloud-megamenu-tab`)
class DDSCloudMegamenuTab extends BXTab {
  static styles = styles;
}

export default DDSCloudMegamenuTab;
