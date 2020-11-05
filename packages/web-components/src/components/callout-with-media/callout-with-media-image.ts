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
import styles from './callout-with-media.scss';
import DDSContentBlockSimpleMediaImage from '../content-block-simple/content-block-simple__media-image';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout with media image.
 *
 * @element dds-callout-with-media-image
 */
@customElement(`${ddsPrefix}-callout-with-media-image`)
class DDSCalloutWithMediaImage extends DDSContentBlockSimpleMediaImage {
  static styles = styles;
}

export default DDSCalloutWithMediaImage;
