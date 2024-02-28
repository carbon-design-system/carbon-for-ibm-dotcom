/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { carbonElement as customElement } from '../../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
import C4DMegaMenuRightNavigation from '../megamenu-right-navigation';
import styles from './cloud-masthead.scss?lit';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Cloud Megamenu Left Navigation Section.
 *
 * @element c4d-cloud-megamenu-left-navigation
 */
@customElement(`${c4dPrefix}-cloud-megamenu-left-navigation`)
class C4DCloudMegaMenuLeftNavigation extends C4DMegaMenuRightNavigation {
  static styles = styles;
}

export default C4DCloudMegaMenuLeftNavigation;
