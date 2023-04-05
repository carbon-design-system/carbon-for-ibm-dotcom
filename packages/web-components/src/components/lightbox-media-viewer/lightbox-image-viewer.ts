/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ifNonNull from '../../internal/vendor/@carbon/web-components/globals/directives/if-non-null.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import DDSLightboxMediaViewerBody from './lightbox-media-viewer-body';
import '../expressive-modal/expressive-modal';
import '../expressive-modal/expressive-modal-close-button';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The image content of lightbox media viewer.
 *
 * @element dds-lightbox-image-viewer
 * @slot title - The title content.
 * @slot description - The description content.
 */
@customElement(`${ddsPrefix}-lightbox-image-viewer`)
class DDSLightboxImageViewer extends DDSLightboxMediaViewerBody {
  _renderDescription() {
    const { description } = this;
    return html` <slot name="description">${description}</slot> `;
  }

  // eslint-disable-next-line class-methods-use-this
  _renderMedia() {
    const { alt, defaultSrc } = this;
    return html`
      <img
        class="${prefix}--image__img"
        alt="${ifNonNull(alt)}"
        src="${ifNonNull(defaultSrc)}"
        loading="lazy" />
    `;
  }

  _renderTitle() {
    const { title } = this;
    return html` <slot name="title">${title}</slot> `;
  }

  /**
   * The alternate text.
   */
  @property()
  alt = '';

  /**
   * The image source.
   */
  @property({ attribute: 'default-src' })
  defaultSrc = '';

  /**
   * The media description.
   */
  @property()
  description = '';

  /**
   * The media title.
   */
  @property()
  title = '';
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSLightboxImageViewer;
