/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement, state } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import settings from 'carbon-components/es/globals/js/settings';
import on from 'carbon-components/es/globals/js/misc/on';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import FocusMixin from 'carbon-web-components/es/globals/mixins/focus.js';
import '../expressive-modal/expressive-modal';
import '../expressive-modal/expressive-modal-close-button';
import '../lightbox-media-viewer/lightbox-image-viewer';
import '../button/button';
import ZoomIn20 from 'carbon-web-components/es/icons/zoom--in/20';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './image.scss';
import ModalRenderMixin from '../../globals/mixins/modal-render';
import Handle from '../../globals/internal/handle';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Image.
 *
 * @element dds-image
 * @slot long-description - The long description content.
 * @slot icon - The icon content.
 */
@customElement(`${ddsPrefix}-image`)
class DDSImage extends StableSelectorMixin(ModalRenderMixin(FocusMixin(LitElement))) {
  /**
   * The image data, harvested from `<dds-image-item>`.
   */
  @state()
  private _images: HTMLElement[] = [];

  /**
   * Handles `slotchange` event.
   */
  private _handleSlotChange({ target }: Event) {
    const { selectorItem } = this.constructor as typeof DDSImage;
    this._images = (target as HTMLSlotElement)
      .assignedNodes()
      // Supports `<dds-image><slot></slot></dds-image>` rendered in shadow DOM
      .reduce((acc, node) => {
        if ((node as Element).tagName === 'SLOT') {
          acc.push(...(node as HTMLSlotElement).assignedNodes());
        } else {
          acc.push(node);
        }
        return acc;
      }, [] as Node[])
      .filter(node => node.nodeType === Node.ELEMENT_NODE && (node as Element).matches(selectorItem)) as HTMLElement[];
  }

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
   * Whether or not to apply a border around the image.
   */
  @property({ type: Boolean, reflect: true })
  border = false;

  /**
   * The lightbox.
   */
  @property({ type: Boolean, reflect: true })
  lightbox = false;

  /**
   * The heading.
   */
  @property()
  heading = '';

  @property({ attribute: 'launch-lightbox-button-assistive-text' })
  launchLightboxButtonAssistiveText = 'launch light box media viewer';

  /**
   * The description.
   */
  @property()
  copy = '';

  /**
   * `true` if the modal should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <= 537,
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.modalRenderRoot = this.createModalRenderRoot(); // Creates modal render root up-front to hook the event listener
    // Manually hooks the event listeners on the modal render root to make the event names configurable
    this._hCloseModal = on(
      this.modalRenderRoot,
      (this.constructor as typeof DDSImage).eventCloseModal,
      this._handleCloseModal as EventListener
    );
  }

  disconnectedCallback() {
    if (this._hCloseModal) {
      this._hCloseModal = this._hCloseModal.release();
    }
    super.disconnectedCallback();
  }

  renderImage() {
    const { alt, border, defaultSrc, _images: images, _handleSlotChange: handleSlotChange } = this;
    const imgClasses = classMap({
      [`${prefix}--image__img`]: true,
      [`${prefix}--image__img--border`]: border,
    });

    return html`
      <slot @slotchange="${handleSlotChange}"></slot>
      <picture>
        ${images.map(
          image => html`<source media="${image.getAttribute('media')}" srcset="${image.getAttribute('srcset')}"></source>`
        )}
        <img class="${imgClasses}" src="${defaultSrc}" alt="${alt}" aria-describedby="long-description" loading="lazy" />
      </picture>
      <div id="long-description" class="${prefix}--image__longdescription">
        <slot name="long-description"></slot>
      </div>
      <slot name="icon"></slot>
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
              alt="${ifNonNull(alt)}"
              default-src="${ifNonNull(defaultSrc)}"
              description="${ifNonNull(copy)}"
              title="${ifNonNull(heading)}"
            >
            </dds-lightbox-image-viewer>
          </dds-expressive-modal>
        `;
  }

  render() {
    const { heading, launchLightboxButtonAssistiveText, lightbox, _handleClick: handleClick } = this;
    return html`
      ${lightbox
        ? html`
            <button
              class="${prefix}--image-with-caption__image"
              aria-label="${ifNonNull(launchLightboxButtonAssistiveText)}"
              @click="${handleClick}"
            >
              ${this.renderImage()}
              <div class="${prefix}--image-with-caption__zoom-button">
                ${ZoomIn20()}
              </div>
            </button>
          `
        : html`
            ${this.renderImage()}
          `}
      ${heading
        ? html`
            <p class="${prefix}--image__caption">
              ${heading}
            </p>
          `
        : ``}
    `;
  }

  /**
   * The name of the custom event fired after the modal is closed upon a user gesture.
   */
  static get eventCloseModal() {
    return `${ddsPrefix}-expressive-modal-closed`;
  }

  /**
   * A selector that will return image items.
   */
  static get selectorItem() {
    return `${ddsPrefix}-image-item`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--image`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSImage;
