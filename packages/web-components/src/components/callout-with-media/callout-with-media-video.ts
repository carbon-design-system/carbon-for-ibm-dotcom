/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './callout-with-media.scss';
import C4DVideoPlayerContainer from '../video-player/video-player-container';
import { COLOR_SCHEME } from '../../component-mixins/callout/defs';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Callout with media video.
 *
 * @element c4d-callout-with-media-video
 */
@customElement(`${c4dPrefix}-callout-with-media-video`)
class C4DCalloutWithMediaVideo extends C4DVideoPlayerContainer {
  /**
   * The color-scheme type.
   */
  @property({ reflect: true, attribute: 'color-scheme' })
  colorScheme = COLOR_SCHEME.REGULAR;

  /**
   * The shadow slot this video container should be in.
   */
  @property({ reflect: true })
  slot = 'media';

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCalloutWithMediaVideo;
