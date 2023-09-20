/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import C4DLightboxMediaViewerBody from './lightbox-media-viewer-body';
import '../expressive-modal/expressive-modal';
import '../expressive-modal/expressive-modal-close-button';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The image content of lightbox media viewer.
 *
 * @element c4d-lightbox-image-viewer
 * @slot title - The title content.
 * @slot description - The description content.
 */
@customElement(`${c4dPrefix}-lightbox-image-viewer`)
class C4DLightboxImageViewer extends C4DLightboxMediaViewerBody {
  _renderDescription() {
    const { description } = this;
    return html` <slot name="description">${description}</slot> `;
  }

  // eslint-disable-next-line class-methods-use-this
  _renderMedia() {
    const { alt, defaultSrc } = this;
    return html`
      <img
        class="${c4dPrefix}--image__img"
        alt="${ifDefined(alt)}"
        src="${ifDefined(defaultSrc)}"
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
export default C4DLightboxImageViewer;
