/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ddsSettings from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { carbonElement } from '../../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
import DDSMegaMenuLeftNavigation from '../megamenu-left-navigation';
import styles from './cloud-masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Cloud Megamenu Right Navigation Section.
 *
 * @element dds-cloud-megamenu-right-navigation
 */
@carbonElement(`${ddsPrefix}-cloud-megamenu-right-navigation`)
class DDSCloudMegaMenuRightNavigation extends DDSMegaMenuLeftNavigation {
  static styles = styles;
}

export default DDSCloudMegaMenuRightNavigation;
