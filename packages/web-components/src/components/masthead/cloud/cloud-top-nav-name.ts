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
import C4DTopNavName from '../top-nav-name';
import styles from './cloud-masthead.scss?lit';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Cloud's brand name UI in top nav.
 *
 * @element c4d-cloud-top-nav-name
 */
@customElement(`${c4dPrefix}-cloud-top-nav-name`)
class C4DCloudTopNavName extends C4DTopNavName {
  static styles = styles;
}

export default C4DCloudTopNavName;
