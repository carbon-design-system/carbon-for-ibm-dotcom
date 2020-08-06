/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, svg, property, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { LEADSPACE_TYPE, LEADSPACE_GRADIENT_STYLE_SCHEME } from './defs';
import styles from './leadspace.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

export { LEADSPACE_TYPE, LEADSPACE_GRADIENT_STYLE_SCHEME };

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The LeadSpace component.
 *
 * @element dds-leadspace
 */
@customElement(`${ddsPrefix}-leadspace`)
class DDSLeadSpace extends StableSelectorMixin(LitElement) {
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
    return classMap({
      [`${prefix}--leadspace--gradient`]: this.gradientStyleScheme === LEADSPACE_GRADIENT_STYLE_SCHEME.WITH_GRADIENT,
      [`${prefix}--leadspace__overlay`]: true,
    });
  }

  /**
   * Returns a class-name based on the type parameter type
   */
  protected _getTypeClass() {
    return classMap({
      [`${prefix}--leadspace--centered`]: this.type === LEADSPACE_TYPE.CENTERED,
      [`${prefix}--leadspace--centered__image`]: this.type === LEADSPACE_TYPE.CENTERED && this.defaultSrc,
      [`${prefix}--leadspace--productive`]: this.type === LEADSPACE_TYPE.SMALL,
      [`${prefix}--leadspace__section`]: true,
    });
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
      <slot name="image"></slot>
    `;
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
   * The leadspace copy.
   */
  @property()
  copy = '';

  /**
   * The gradient style sceheme.
   */
  @property({ reflect: true, attribute: 'gradient-style-scheme' })
  gradientStyleScheme = LEADSPACE_GRADIENT_STYLE_SCHEME.WITH_GRADIENT;

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

  render() {
    const { gradientStyleScheme, type } = this;
    return html`
      <section style="${this._getBackgroundImage()}" class="${this._getTypeClass()}">
        <div class="${prefix}--leadspace__container">
          <div class="${this._getGradientClass()}">
            ${gradientStyleScheme === LEADSPACE_GRADIENT_STYLE_SCHEME.NONE
              ? undefined
              : svg`
                <svg
                  class="${prefix}--leadspace__gradient"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <linearGradient id="stops" class="${prefix}--leadspace__gradient__stops">
                      ${
                        type === LEADSPACE_TYPE.CENTERED
                          ? svg`
                          <stop offset="0%" />
                          <stop offset="27%" />
                          <stop offset="53%" />
                          <stop offset="80%" />
                        `
                          : svg`
                          <stop offset="0%" />
                          <stop offset="75%" />
                        `
                      }
                    </linearGradient>
                  </defs>
                  <rect class="${prefix}--leadspace__gradient__rect" width="100" height="100" />
                </svg>
              `}
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

export default DDSLeadSpace;
