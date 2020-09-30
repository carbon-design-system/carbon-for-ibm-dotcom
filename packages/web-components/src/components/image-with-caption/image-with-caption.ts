/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import '../image/image';
import '../lightbox-media-viewer/lightbox-image-viewer';
import '../button/button';
import ZoomIn20 from 'carbon-web-components/es/icons/zoom--in/20';
import DDSModal from '../modal/modal';
import 'carbon-web-components/es/components/modal/modal-close-button';
import styles from './image-with-caption.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Image With Caption
 *
 * @element dds-image-with-caption
 */

@customElement(`${ddsPrefix}-image-with-caption`)
class DDSImageWithCaption extends LitElement {
  /**
   * The lightbox.
   */
  @property({ type: Boolean, reflect: true })
  lightbox = false;

  /**
   * The image source.
   */
  @property({ reflect: true })
  defaultSrc = '';

  /**
   * The alt text.
   */
  @property({ reflect: true })
  alt = '';

  /**
   * The heading.
   */
  @property({ reflect: true })
  heading = '';

  /**
   * The description.
   */
  @property({ reflect: true })
  copy = '';

  _handleClick() {
    const modal = this.shadowRoot?.querySelector('dds-modal');
    (modal as DDSModal).open = true;
  }

  render() {
    return html`
      ${this.lightbox
        ? html`
            <button class="${prefix}--image-with-caption__image" @click="${this._handleClick}">
              <dds-image alt="${this.alt}" default-src="${this.defaultSrc}" />
              <div class="${prefix}--image-with-caption__zoom-button">
                ${ZoomIn20()}
              </div>
            </button>
            <dds-modal expressive-size="full-width">
              <bx-modal-close-button></bx-modal-close-button>
              <dds-lightbox-image-viewer
                alt="${this.alt}"
                default-src="${this.defaultSrc}"
                description="${this.copy}"
                title="${this.heading}"
              >
              </dds-lightbox-image-viewer>
            </dds-modal>
          `
        : html`
            <dds-image default-src="${this.defaultSrc}" />
          `}
      <p class="${prefix}--image__caption">
        ${this.heading}
      </p>
    `;
  }

  static styles = styles;
}

export default DDSImageWithCaption;
