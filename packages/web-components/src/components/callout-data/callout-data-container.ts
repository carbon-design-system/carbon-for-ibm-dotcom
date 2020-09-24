/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { customElement } from 'lit-element';

import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSCallout from '../callout/callout';
import styles from './callout-data.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout Data.
 *
 * @element dds-callout-data
 */
@customElement(`${ddsPrefix}-callout-data-container`)
class DDSCalloutDataContainer extends DDSCallout {
  static styles = styles;
}

export default DDSCalloutDataContainer;
