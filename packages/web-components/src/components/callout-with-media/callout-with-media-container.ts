/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSCallout from '../callout/callout';
import styles from './callout-with-media.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout with Media Container.
 *
 * @element dds-callout-with-media-container
 */
@customElement(`${ddsPrefix}-callout-with-media-container`)
class DDSCalloutWithMediaContainer extends DDSCallout {
  static styles = styles;
}

export default DDSCalloutWithMediaContainer;
