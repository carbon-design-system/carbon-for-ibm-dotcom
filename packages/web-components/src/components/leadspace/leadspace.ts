/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, svg, property, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import {
  LEADSPACE_TYPE,
  LEADSPACE_GRADIENT_STYLE_SCHEME,
  LEADSPACE_SIZE,
} from './defs';
import styles from './leadspace.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

export { LEADSPACE_TYPE, LEADSPACE_GRADIENT_STYLE_SCHEME, LEADSPACE_SIZE };

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The LeadSpace component.
 *
 * @element dds-leadspace
 * @slot action The action (CTA) content.
 * @slot image The image content.
 * @csspart section The first DOM node inside the shadow-root
 */
@customElement(`${ddsPrefix}-leadspace`)
class DDSLeadSpace extends StableSelectorMixin(LitElement) {
  /**
   * Handler for @slotchange, ensure that the only element being rendered is DDSTagGroup
   *
   * @private
   */
  private _handleSlotChange(event: Event) {
    const childItems = (event.target as HTMLSlotElement).assignedNodes();

    childItems.filter(
      (elem) =>
        (elem as HTMLElement).matches?.(
          (this.constructor as typeof DDSLeadSpace).tagGroupSelector
        ) || (this.constructor as typeof DDSLeadSpace).breadcrumbSelector
    );
  }

  /**
   * Returns a class-name based on the gradient parameter type
   */
  protected _getGradientClass() {
    return classMap({
      [`${prefix}--leadspace--gradient`]: this.defaultSrc,
      [`${prefix}--leadspace__overlay`]: true,
    });
  }

  /**
   * Returns a class-name based on the type parameter type
   */
  protected _getTypeClass() {
    return classMap({
      [`${prefix}--leadspace--centered`]: this.type === LEADSPACE_TYPE.CENTERED,
      [`${prefix}--leadspace--centered__image`]:
        this.type === LEADSPACE_TYPE.CENTERED && this.defaultSrc,
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
        <p
          data-autoid="${ddsPrefix}--leadspace__desc"
          class="${prefix}--leadspace__desc">
          <slot>${copy}</slot>
        </p>
      </div>
    `;
  }

  /**
   * Renders Leadspace title slot
   */
  protected _renderHeading() {
    const { title } = this;
    return html` <slot name="heading">${title}</slot> `;
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
   * The gradient style scheme.
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

  /**
   *  Leadspace size (super, tall, medium, or short)
   */
  @property({ reflect: true })
  size = 'tall';

  firstUpdated() {
    Array.from(this.children).forEach((child) => {
      if (
        (child.tagName === 'DDS-BACKGROUND-MEDIA' ||
          child.tagName === 'DDS-LEADSPACE-IMAGE') &&
        child.slot === ''
      ) {
        child.slot = 'image';
      }
    });
  }

  render() {
    const { gradientStyleScheme, type, size } = this;
    return html`
      <section class="${this._getTypeClass()}" part="section">
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
                    <linearGradient id="stops" class="${prefix}--leadspace__gradient__stops" gradientTransform="${
                  type === LEADSPACE_TYPE.CENTERED ? 'rotate(90)' : ''
                }">
                      ${
                        type === LEADSPACE_TYPE.CENTERED
                          ? svg`
                          <stop offset="0%" />
                          <stop offset="54%" />
                          <stop offset="77%" />
                          <stop offset="100%" />
                        `
                          : svg`
                          <stop offset="0%" />
                          <stop offset="25%" />
                          <stop offset="50%" />
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
                <slot
                  name="navigation"
                  @slotchange="${this._handleSlotChange}"></slot>
                ${this._renderHeading()}
              </div>
              ${size !== LEADSPACE_SIZE.SHORT
                ? html`
                    <div class="${prefix}--leadspace__content">
                      ${this._renderCopy()}
                      <slot name="action"></slot>
                    </div>
                  `
                : ``}
            </div>
          </div>
          <slot name="image"></slot>
        </div>
      </section>
    `;
  }

  static get breadcrumbSelector() {
    return `${prefix}-breadcrumb`;
  }

  static get headingSelector() {
    return `${ddsPrefix}-leadspace-heading`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--leadspace`;
  }

  static get tagGroupSelector() {
    return `${ddsPrefix}-tag-group`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSLeadSpace;
