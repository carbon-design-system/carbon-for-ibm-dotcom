/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import on from '../../internal/vendor/@carbon/web-components/globals/mixins/on.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import FocusMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/focus.js';
import '../expressive-modal/expressive-modal';
import '../expressive-modal/expressive-modal-close-button';
import '../lightbox-media-viewer/lightbox-image-viewer';
import '../button/button';
import { LIGHTBOX_CONTRAST } from './defs';
import Maximize20 from '../../internal/vendor/@carbon/web-components/icons/maximize/20.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './image.scss';
import ModalRenderMixin from '../../globals/mixins/modal-render';
import Handle from '../../globals/internal/handle';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

export { LIGHTBOX_CONTRAST };

/**
 * Image.
 *
 * @element c4d-image
 * @slot long-description - The long description content.
 * @slot icon - The icon content.
 * @csspart image - The image. Usage: `c4d-image::part(image)`
 */
@customElement(`${c4dPrefix}-image`)
class C4DImage extends StableSelectorMixin(
  ModalRenderMixin(FocusMixin(LitElement))
) {
  /**
   * The image data, harvested from `<c4d-image-item>`.
   */
  @state()
  private _images: HTMLElement[] = [];

  /**
   * Handles `slotchange` event.
   */
  private _handleSlotChange({ target }: Event) {
    const { selectorItem } = this.constructor as typeof C4DImage;
    this._images = (target as HTMLSlotElement)
      .assignedNodes()
      // Supports `<c4d-image><slot></slot></c4d-image>` rendered in shadow DOM
      .reduce((acc, node) => {
        if ((node as Element).tagName === 'SLOT') {
          acc.push(...(node as HTMLSlotElement).assignedNodes());
        } else {
          acc.push(node);
        }
        return acc;
      }, [] as Node[])
      .filter(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          (node as Element).matches(selectorItem)
      ) as HTMLElement[];
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
   * The handler of `${c4dPrefix}-expressive-modal-closed` event from `<c4d-expressive-modal>`.
   */
  private _handleCloseModal = () => {
    this.open = false;
  };

  /**
   * The handle for the listener of `${c4dPrefix}-expressive-modal-closed` event.
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
   * Whether or not it's a video thumbnail in a card group item.
   */
  @property({ type: Boolean, reflect: true, attribute: 'card-group-item' })
  cardGroupItem = false;

  /**
   * The lightbox contrast option.
   */
  @property({ attribute: 'lightbox-contrast' })
  lightboxContrast = LIGHTBOX_CONTRAST.LIGHT;

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

  connectedCallback() {
    super.connectedCallback();
    this.modalRenderRoot = this.createModalRenderRoot(); // Creates modal render root up-front to hook the event listener
    // Manually hooks the event listeners on the modal render root to make the event names configurable
    this._hCloseModal = on(
      this.modalRenderRoot,
      (this.constructor as typeof C4DImage).eventCloseModal,
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
    const {
      alt,
      border,
      defaultSrc,
      lightbox,
      _images: images,
      _handleSlotChange: handleSlotChange,
    } = this;
    const imgClasses = classMap({
      [`${c4dPrefix}--image__img`]: true,
      [`${c4dPrefix}--image__img--border`]: border && !lightbox,
    });

    return html`
      <slot @slotchange="${handleSlotChange}"></slot>
      <picture>
        ${images.map(
          (image) =>
            html`<source media="${image.getAttribute(
              'media'
            )}" srcset="${image.getAttribute('srcset')}"></source>`
        )}
        <img
          class="${imgClasses}"
          src="${defaultSrc}"
          alt="${alt}"
          aria-describedby="image-caption long-description"
          part="image"
          loading="lazy" />
      </picture>
      <div id="long-description" class="${c4dPrefix}--image__longdescription">
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
          <c4d-expressive-modal ?open="${open}" expressive-size="full-width">
            <c4d-expressive-modal-close-button></c4d-expressive-modal-close-button>
            <c4d-lightbox-image-viewer
              alt="${ifDefined(alt)}"
              default-src="${ifDefined(defaultSrc)}"
              description="${ifDefined(copy)}"
              title="${ifDefined(heading)}">
            </c4d-lightbox-image-viewer>
          </c4d-expressive-modal>
        `;
  }

  render() {
    const {
      heading,
      launchLightboxButtonAssistiveText,
      lightbox,
      _handleClick: handleClick,
    } = this;
    return html`
      ${lightbox
        ? html`
            <button
              class="${c4dPrefix}--image-with-caption__image"
              aria-label="${ifDefined(launchLightboxButtonAssistiveText)}"
              @click="${handleClick}">
              ${this.renderImage()}
              <div class="${c4dPrefix}--image-with-caption__zoom-button">
                ${Maximize20()}
              </div>
            </button>
          `
        : html` ${this.renderImage()} `}
      ${heading
        ? html`
            <p id="image-caption" class="${c4dPrefix}--image__caption">
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
    return `${c4dPrefix}-expressive-modal-closed`;
  }

  /**
   * A selector that will return image items.
   */
  static get selectorItem() {
    return `${c4dPrefix}-image-item`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--image`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DImage;
