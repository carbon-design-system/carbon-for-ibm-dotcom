/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, customElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './callout-with-media.scss';
import DDSVideoPlayerContainer from '../video-player/video-player-container';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout with media video.
 *
 * @element dds-callout-with-media-video
 */
@customElement(`${ddsPrefix}-callout-with-media-video`)
class DDSCalloutWithMediaVideo extends DDSVideoPlayerContainer {
  /**
   * The shadow slot this video container should be in.
   */
  @property({ reflect: true })
  slot = 'media';

  static styles = styles;
}

export default DDSCalloutWithMediaVideo;
