/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import on from 'carbon-components/es/globals/js/misc/on.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import FocusMixin from '@carbon/web-components/es/globals/mixins/focus.js';
import '../expressive-modal/expressive-modal';
import '../expressive-modal/expressive-modal-close-button';
import '../image/image';
import '../lightbox-media-viewer/lightbox-image-viewer';
import '../button/button';
import ZoomIn20 from '@carbon/web-components/es/icons/zoom--in/20.js';
import deprecate from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/deprecate/deprecate';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './image-with-caption.scss';
import ModalRenderMixin from '../../globals/mixins/modal-render';
import Handle from '../../globals/internal/handle';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Image With Caption
 *
 * @element dds-image-with-caption
 */

@customElement(`${ddsPrefix}-image-with-caption`)
class DDSImageWithCaption extends StableSelectorMixin(
  ModalRenderMixin(FocusMixin(LitElement))
) {
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

  @property({ attribute: 'launch-lightbox-button-assistive-text' })
  launchLightboxButtonAssistiveText = 'launch light box media viewer';

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

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus:
        Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <=
        537,
    });
  }

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
    const {
      alt,
      defaultSrc,
      heading,
      launchLightboxButtonAssistiveText,
      lightbox,
      _handleClick: handleClick,
    } = this;
    return html`
      ${lightbox
        ? html`
            <button
              class="${prefix}--image-with-caption__image"
              aria-label="${ifDefined(launchLightboxButtonAssistiveText)}"
              @click="${handleClick}">
              <dds-image
                alt="${ifDefined(alt)}"
                default-src="${ifDefined(defaultSrc)}"
                ><slot></slot
              ></dds-image>
              <div class="${prefix}--image-with-caption__zoom-button">
                ${ZoomIn20()}
              </div>
            </button>
          `
        : html`
            <dds-image
              alt="${ifDefined(alt)}"
              default-src="${ifDefined(defaultSrc)}"
              ><slot></slot
            ></dds-image>
          `}
      <p class="${prefix}--image__caption">${heading}</p>
    `;
  }

  renderModal() {
    const { alt, copy, defaultSrc, heading, lightbox, open } = this;
    return !lightbox
      ? undefined
      : html`
          <dds-expressive-modal ?open="${open}" expressive-size="full-width">
            <dds-expressive-modal-close-button></dds-expressive-modal-close-button>
            <dds-lightbox-image-viewer
              alt="${ifDefined(alt)}"
              default-src="${ifDefined(defaultSrc)}"
              description="${ifDefined(copy)}"
              title="${ifDefined(heading)}">
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

  static get stableSelector() {
    return `${ddsPrefix}--image-with-caption`;
  }

  static styles = styles;
}

export default deprecate(
  /* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
  DDSImageWithCaption,
  'The dds-image-with-caption component has been merged with the dds-image component ' +
    'See dds-image documentation for more information.'
);
