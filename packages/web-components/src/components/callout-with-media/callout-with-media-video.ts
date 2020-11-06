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
import DDSContentBlockSimpleMediaVideo from '../content-block-simple/content-block-simple__media-video';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout with media video.
 *
 * @element dds-callout-with-media-video
 */
@customElement(`${ddsPrefix}-callout-with-media-video`)
class DDSCalloutWithMediaVideo extends DDSContentBlockSimpleMediaVideo {
  static styles = styles;
}

export default DDSCalloutWithMediaVideo;
