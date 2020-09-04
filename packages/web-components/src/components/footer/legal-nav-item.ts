/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSFooterNavItem from './footer-nav-item';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Legal nav item.
 *
 * @element dds-legal-nav-item
 */
@customElement(`${ddsPrefix}-legal-nav-item`)
class DDSLegalNavItem extends DDSFooterNavItem {}

export default DDSLegalNavItem;
