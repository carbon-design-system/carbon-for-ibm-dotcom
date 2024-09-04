/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './callout-with-media.scss';
import C4DCalloutMixin from '../../component-mixins/callout/callout';
import C4DContentBlock from '../content-block/content-block';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import { property } from 'lit/decorators.js';
import { COLOR_SCHEME } from '../../component-mixins/callout/defs';
import C4DCalloutWithMediaCopy from './callout-with-media-copy';
import C4DCalloutWithMediaImage from './callout-with-media-image';
import C4DCalloutWithMediaVideo from './callout-with-media-video';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Callout Data.
 *
 * @element c4d-callout-data
 */
@customElement(`${c4dPrefix}-callout-with-media`)
class C4DCalloutWithMedia extends C4DCalloutMixin(
  StableSelectorMixin(C4DContentBlock)
) {
  /**
   * The color-scheme type.
   */
  @property({ reflect: true, attribute: 'color-scheme' })
  colorScheme = COLOR_SCHEME.REGULAR;

  updated(changedProperties) {
    super.updated(changedProperties);
    const copy = this.querySelector(
      (this.constructor as typeof C4DCalloutWithMedia).selectorCopy
    );
    const image = this.querySelector(
      (this.constructor as typeof C4DCalloutWithMedia).selectorImage
    );
    const video = this.querySelector(
      (this.constructor as typeof C4DCalloutWithMedia).selectorVideo
    );
    copy
      ? ((copy as C4DCalloutWithMediaCopy).colorScheme = this.colorScheme)
      : '';
    image
      ? ((image as C4DCalloutWithMediaImage).colorScheme = this.colorScheme)
      : '';
    video
      ? ((video as C4DCalloutWithMediaVideo).colorScheme = this.colorScheme)
      : '';
  }

  /**
   * A selector that will return the child image.
   */
  static get selectorImage() {
    return `${c4dPrefix}-callout-with-media-image`;
  }

  /**
   * A selector that will return the child video.
   */
  static get selectorVideo() {
    return `${c4dPrefix}-callout-with-media-video`;
  }

  /**
   * A selector that will return the child copy.
   */
  static get selectorCopy() {
    return `${c4dPrefix}-callout-with-media-copy`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--callout-with-media`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCalloutWithMedia;
