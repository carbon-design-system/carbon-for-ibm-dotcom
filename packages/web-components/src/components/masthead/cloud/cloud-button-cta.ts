/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { CTA_TYPE } from '../../cta/defs';
import C4DButtonExpressive from '../../button/button';
import styles from './cloud-masthead.scss';
import { carbonElement as customElement } from '../../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

export { CTA_TYPE };

const { stablePrefix: c4dPrefix } = settings;

/**
 * Cloud Button CTA.
 *
 * @element c4d-cloud-button-cta
 */
@customElement(`${c4dPrefix}-cloud-button-cta`)
class C4DCloudButtonCTA extends C4DButtonExpressive {
  static styles = styles;
}

export default C4DCloudButtonCTA;
