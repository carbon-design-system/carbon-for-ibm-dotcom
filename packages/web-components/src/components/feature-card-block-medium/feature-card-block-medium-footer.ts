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
 * Feature card block medium footer.
 *
 * @element dds-feature-card-block-medium-footer
 */
@customElement(`${ddsPrefix}-feature-card-block-medium-footer`)
class DDSFeatureCardBlockMediumFooter extends DDSCardFooter {}

export default DDSFeatureCardBlockMediumFooter;
