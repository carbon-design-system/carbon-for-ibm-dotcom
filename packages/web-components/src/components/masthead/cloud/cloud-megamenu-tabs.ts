/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CDSTabs from '../../../internal/vendor/@carbon/web-components/components/tabs/tabs.js';
import settings from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './cloud-masthead.scss';
import { carbonElement as customElement } from '../../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Cloud Megamenu Tabs.
 *
 * @element c4d-cloud-megamenu-tabs
 */
@customElement(`${c4dPrefix}-cloud-megamenu-tabs`)
class C4DCloudMegaMenuTabs extends CDSTabs {
  /**
   * A selector that will return megamenu tabs.
   */
  static get selectorItem() {
    return `${c4dPrefix}-cloud-megamenu-tab`;
  }

  /**
   * A selector that will return selected items.
   */
  static get selectorItemSelected() {
    return `${c4dPrefix}-cloud-megamenu-tab[selected]`;
  }

  static styles = styles;
}

export default C4DCloudMegaMenuTabs;
