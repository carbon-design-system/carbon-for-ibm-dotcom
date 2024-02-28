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
import C4DMegaMenuLeftNavigation from '../megamenu-left-navigation';
import styles from './cloud-masthead.scss?lit';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Cloud Megamenu Right Navigation Section.
 *
 * @element c4d-cloud-megamenu-right-navigation
 */
@customElement(`${c4dPrefix}-cloud-megamenu-right-navigation`)
class C4DCloudMegaMenuRightNavigation extends C4DMegaMenuLeftNavigation {
  static styles = styles;
}

export default C4DCloudMegaMenuRightNavigation;
