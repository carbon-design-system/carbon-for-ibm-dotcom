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
import DDSMastheadContainer from '../masthead-container';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Container component for masthead.
 *
 * @element dds-cloud-masthead-container
 */
@customElement(`${ddsPrefix}-cloud-masthead-container`)
class DDSCloudMastheadContainer extends DDSMastheadContainer {}

export default DDSCloudMastheadContainer;
