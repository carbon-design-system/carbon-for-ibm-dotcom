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
import on from 'carbon-components/es/globals/js/misc/on';
import '../image/image';
import '../lightbox-media-viewer/lightbox-image-viewer';
import '../button/button';
import ZoomIn20 from 'carbon-web-components/es/icons/zoom--in/20';
import 'carbon-web-components/es/components/modal/modal-close-button';
import styles from './image-with-caption.scss';
import ModalRenderMixin from '../../globals/mixins/modal-render';
import Handle from '../../globals/internal/handle';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Image With Caption
 *
 * @element dds-image-with-caption
 */

@customElement(`${ddsPrefix}-image-with-caption`)
class DDSImageWithCaption extends ModalRenderMixin(LitElement) {
  /**
   * `true` handles re-opening after model is closed
   *
   * @private
   */
  private _handleClick() {
    this.open = true;
  }

  /**
   * The handler of `${ddsPrefix}-expressive-modal-closed` event from `<dds-expressive-modal>`.
   */
  private _handleCloseModal = () => {
    this.open = false;
  };

  /**
   * The handle for the listener of `${ddsPrefix}-expressive-modal-closed` event.
   */
  private _hCloseModal: Handle | null = null;

  /**
   * The lightbox.
   */
  @property({ type: Boolean, reflect: true })
  lightbox = false;

  /**
   * The image source.
   */
  @property({ reflect: true, attribute: 'default-src' })
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

  /**
   * `true` if the modal should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  connectedCallback() {
    super.connectedCallback();
    this.modalRenderRoot = this.createModalRenderRoot(); // Creates modal render root up-front to hook the event listener
    // Manually hooks the event listeners on the modal render root to make the event names configurable
    this._hCloseModal = on(
      this.modalRenderRoot,
      (this.constructor as typeof DDSImageWithCaption).eventCloseModal,
      this._handleCloseModal as EventListener
    );
  }

  disconnectedCallback() {
    if (this._hCloseModal) {
      this._hCloseModal = this._hCloseModal.release();
    }
    super.disconnectedCallback();
  }

  render() {
    return html`
      ${this.lightbox
        ? html`
            <button class="${prefix}--image-with-caption__image" @click="${this._handleClick}">
              <dds-image alt="${this.alt}" default-src="${this.defaultSrc}"><slot></slot></dds-image>
              <div class="${prefix}--image-with-caption__zoom-button">
                ${ZoomIn20()}
              </div>
            </button>
          `
        : html`
            <dds-image default-src="${this.defaultSrc}"><slot></slot></dds-image>
          `}
      <p class="${prefix}--image__caption">
        ${this.heading}
      </p>
    `;
  }

  renderModal() {
    return html`
      <dds-expressive-modal ?open=${this.open} expressive-size="full-width">
        <bx-modal-close-button></bx-modal-close-button>
        <dds-lightbox-image-viewer
          alt="${this.alt}"
          default-src="${this.defaultSrc}"
          description="${this.copy}"
          title="${this.heading}"
        >
        </dds-lightbox-image-viewer>
      </dds-expressive-modal>
    `;
  }

  /**
   * The name of the custom event fired after the modal is closed upon a user gesture.
   */
  static get eventCloseModal() {
    return `${ddsPrefix}-expressive-modal-closed`;
  }

  static styles = styles;
}

export default DDSImageWithCaption;
