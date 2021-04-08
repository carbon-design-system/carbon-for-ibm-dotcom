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
import { CTA_TYPE } from '../../cta/defs';
import DDSButtonExpressive from '../../button/button';
import styles from './cloud-masthead.scss';

export { CTA_TYPE };

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Cloud Button CTA.
 *
 * @element dds-cloud-button-cta
 */
@customElement(`${ddsPrefix}-cloud-button-cta`)
class DDSCloudButtonCTA extends DDSButtonExpressive {
  static styles = styles;
}

export default DDSCloudButtonCTA;
