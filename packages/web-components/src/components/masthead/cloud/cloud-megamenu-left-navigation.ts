/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit/decorators.js';
import ddsSettings from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
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
