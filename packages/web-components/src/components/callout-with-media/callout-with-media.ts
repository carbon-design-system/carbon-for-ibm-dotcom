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
import DDSContentBlockSimple from '../content-block-simple/content-block-simple';
import styles from './callout-with-media.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout with Media.
 *
 * @element dds-callout-with-media
 */
@customElement(`${ddsPrefix}-callout-with-media`)
class DDSCalloutWithMedia extends DDSContentBlockSimple {
  static styles = styles;
}

export default DDSCalloutWithMedia;
