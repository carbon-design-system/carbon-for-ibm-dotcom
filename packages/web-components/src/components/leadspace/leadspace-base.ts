/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, internalProperty, property, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './leadspace.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Leadspace type
 */
export enum LEADSPACE_TYPE {
  /**
   * Left-aligned - small style of the leadspace title (default)
   */
  SMALL = 'small',

  /**
   * Left-aligned - large style of the leadspace title
   */
  LEFT = 'left',

  /**
   * Centered type of the LeadSpace
   */
  CENTERED = 'centered',
}

/**
 * Leadspace theme
 */
export enum LEADSPACE_THEME {
  /**
   * Carbon White theme (default)
   */
  WHITE = 'white',

  /**
   *  Carbon Gray 100 theme
   */
  G100 = 'g100',
}

/**
 * LeadSpace body.
 */
abstract class DDSLeadSpaceBase extends LitElement {
  /**
   * Sets background image for leadspace centered
   */
  protected _getBackgroundImage() {
    return this.defaultSrc && this.type === LEADSPACE_TYPE.CENTERED ? `background-image: url(${this.defaultSrc})` : '';
  }

  /**
   * Returns a class-name based on the gradient parameter type
   */
  protected _getGradientClass() {
    return this.gradient ? `${prefix}--leadspace--gradient` : '';
  }

  /**
   * Returns a class-name based on the type parameter type
   */
  protected _getTypeClass() {
    let classname = '';

    if (this.type === 'centered') {
      classname += `${prefix}--leadspace--centered `;

      if (this._hasImage) {
        classname += `${prefix}--leadspace--centered__image `;
      }
    }

    if (this.theme) {
      classname += `${prefix}--leadspace--${this.theme} `;
    }

    if (this.type === 'small') {
      classname += `${prefix}--leadspace--productive `;
    }
    return classname;
  }

  /**
   * Renders Leadspace copy/description
   */
  protected _renderCopy() {
    const { copy } = this;
    return html`
      <div class="${prefix}--leadspace__row">
        <p data-autoid="${ddsPrefix}--leadspace__desc" class="${prefix}--leadspace__desc">
          <slot name="copy">${copy}</slot>
        </p>
      </div>
    `;
  }

  /**
   * Renders Leadspace title slot
   */
  protected _renderTitle() {
    const { title } = this;
    return html`
      <slot name="title">${title}</slot>
    `;
  }

  /**
   *  Renders the image slot or the mobile image for centered leadspace
   */
  protected _renderImage() {
    const { defaultSrc, alt, type } = this;
    if (type === LEADSPACE_TYPE.CENTERED) {
      return html`
        <div data-autoid="${ddsPrefix}--leadspace--centered--mobile__image" class="${prefix}--leadspace--centered--mobile__image">
          <img src="${defaultSrc}" alt="${alt}" />
        </div>
      `;
    }
    return html`
      <slot name="image" @slotchange="${this._handleSlotChangeImage}"></slot>
    `;
  }

  /**
   * Handles `slotchange` event on `<slot name="image">`.
   *
   * @param event The event.
   */
  private _handleSlotChangeImage(event: Event) {
    this._hasImage = (event.target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
  }

  /**
   * `true` if there is image content.
   */
  @internalProperty()
  private _hasImage = false;

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
   * The leadspace copy.
   */
  @property()
  copy = '';

  /**
   * The leadspace title.
   */
  @property()
  title = '';

  /**
   *  Leadspace type (small, left, or centered)
   */
  @property({ reflect: true })
  type = LEADSPACE_TYPE.LEFT;

  /**
   * Carbon color theme of the Leadspace
   */
  @property({ reflect: true })
  theme = LEADSPACE_THEME;

  /**
   * `true` to hide the divider.
   */
  @property({ type: Boolean, reflect: true })
  gradient = true;

  render() {
    return html`
      <section style="${this._getBackgroundImage()}" class="${prefix}--leadspace__section ${this._getTypeClass()}">
        <div class="${prefix}--leadspace__container">
          <div class="${prefix}--leadspace__overlay ${this._getGradientClass()}">
            <div class="${prefix}--leadspace--content__container">
              <div class="${prefix}--leadspace__row">
                <h1 class="${prefix}--leadspace__title">${this._renderTitle()}</h1>
              </div>
              <div class="${prefix}--leadspace__content">
                ${this._renderCopy()}
                <slot name="buttons"></slot>
              </div>
            </div>
          </div>
          ${this._renderImage()}
        </div>
      </section>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLeadSpaceBase;
