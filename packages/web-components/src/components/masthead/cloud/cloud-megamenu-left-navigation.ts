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
import DDSMegaMenuRightNavigation from '../megamenu-right-navigation';
import styles from './cloud-masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Cloud Megamenu Left Navigation Section.
 *
 * @element dds-cloud-megamenu-left-navigation
 */
@customElement(`${ddsPrefix}-cloud-megamenu-left-navigation`)
class DDSCloudMegaMenuLeftNavigation extends DDSMegaMenuRightNavigation {
  static styles = styles;
}

export default DDSCloudMegaMenuLeftNavigation;
