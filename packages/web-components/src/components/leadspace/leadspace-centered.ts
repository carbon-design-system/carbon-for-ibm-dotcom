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
import DDSLeadSpaceBase from './leadspace-body';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The LeadSpace component.
 *
 * @element dds-leadspace
 */
@customElement(`${ddsPrefix}-leadspace-centered`)
class DDSLeadSpaceCentered extends DDSLeadSpaceBase {
  static get stableSelector() {
    return `${ddsPrefix}--leadspace`;
  }
}

export default DDSLeadSpaceCentered;
