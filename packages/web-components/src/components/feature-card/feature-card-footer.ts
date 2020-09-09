/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import DDSCardFooter from '../card/card-footer';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature card footer.
 *
 * @element dds-feature-card-footer
 */
@customElement(`${ddsPrefix}-feature-card-footer`)
class DDSFeatureCardFooter extends DDSCardFooter {}

export default DDSFeatureCardFooter;
