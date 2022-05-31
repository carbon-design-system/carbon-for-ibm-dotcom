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
import DDSImage from '../image/image';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout with media image.
 *
 * @element dds-callout-with-media-image
 */
@customElement(`${ddsPrefix}-callout-with-media-image`)
class DDSCalloutWithMediaImage extends DDSImage {
  /**
   * The shadow slot this video container should be in.
   */
  @property({ reflect: true })
  slot = 'media';

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCalloutWithMediaImage;
