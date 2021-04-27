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
import DDSTopNavName from '../top-nav-name';
import styles from './cloud-masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Cloud's brand name UI in top nav.
 *
 * @element dds-cloud-top-nav-name
 */
@customElement(`${ddsPrefix}-cloud-top-nav-name`)
class DDSCloudTopNavName extends DDSTopNavName {
  static styles = styles;
}

export default DDSCloudTopNavName;
