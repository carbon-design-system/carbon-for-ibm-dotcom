/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './callout-with-media.scss';
import DDSCalloutMixin from '../../component-mixins/callout/callout';
import DDSContentBlock from '../content-block/content-block';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
import { property } from 'lit/decorators.js';
import { COLOR_SCHEME } from '../../component-mixins/callout/defs';
import DDSCalloutWithMediaCopy from './callout-with-media-copy';
import DDSCalloutWithMediaImage from './callout-with-media-image';
import DDSCalloutWithMediaVideo from './callout-with-media-video';

const { stablePrefix: ddsPrefix } = settings;

/**
 * Callout Data.
 *
 * @element dds-callout-data
 */
@customElement(`${ddsPrefix}-callout-with-media`)
class DDSCalloutWithMedia extends DDSCalloutMixin(
  StableSelectorMixin(DDSContentBlock)
) {
  /**
   * The color-scheme type.
   */
  @property({ reflect: true, attribute: 'color-scheme' })
  colorScheme = COLOR_SCHEME.REGULAR;

  updated(changedProperties) {
    super.updated(changedProperties);
    const copy = this.querySelector(
      (this.constructor as typeof DDSCalloutWithMedia).selectorCopy
    );
    const image = this.querySelector(
      (this.constructor as typeof DDSCalloutWithMedia).selectorImage
    );
    const video = this.querySelector(
      (this.constructor as typeof DDSCalloutWithMedia).selectorVideo
    );
    copy
      ? ((copy as DDSCalloutWithMediaCopy).colorScheme = this.colorScheme)
      : '';
    image
      ? ((image as DDSCalloutWithMediaImage).colorScheme = this.colorScheme)
      : '';
    video
      ? ((video as DDSCalloutWithMediaVideo).colorScheme = this.colorScheme)
      : '';
  }

  /**
   * A selector that will return the child image.
   */
  static get selectorImage() {
    return `${ddsPrefix}-callout-with-media-image`;
  }

  /**
   * A selector that will return the child video.
   */
  static get selectorVideo() {
    return `${ddsPrefix}-callout-with-media-video`;
  }

  /**
   * A selector that will return the child copy.
   */
  static get selectorCopy() {
    return `${ddsPrefix}-callout-with-media-copy`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--callout-with-media`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCalloutWithMedia;
