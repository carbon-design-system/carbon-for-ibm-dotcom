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
import DDSMegaMenuLeftNavigation from '../megamenu-left-navigation';
import styles from './cloud-masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Cloud Megamenu Right Navigation Section.
 *
 * @element dds-cloud-megamenu-right-navigation
 */
@customElement(`${ddsPrefix}-cloud-megamenu-right-navigation`)
class DDSCloudMegaMenuRightNavigation extends DDSMegaMenuLeftNavigation {
  static styles = styles;
}

export default DDSCloudMegaMenuRightNavigation;
