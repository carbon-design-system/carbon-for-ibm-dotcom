/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, svg } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import {
  LEADSPACE_TYPE,
  LEADSPACE_GRADIENT_STYLE_SCHEME,
  LEADSPACE_SIZE,
} from './defs';
import styles from './leadspace.scss?lit';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

export { LEADSPACE_TYPE, LEADSPACE_GRADIENT_STYLE_SCHEME, LEADSPACE_SIZE };

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * The LeadSpace component.
 *
 * @element c4d-leadspace
 * @slot action The action (CTA) content.
 * @slot image The image content.
 * @csspart content - The content. Usage: `c4d-leadspace::part(content)`
 * @csspart content-item - The subheading paragraph. Usage: `c4d-leadspace::part(content-item)`
 * @csspart row - Row wrappers. Usage: `c4d-leadspace::part(row)`
 * @csspart row--description - Row wrapper for the description. Usage: `c4d-leadspace::part(row--description)`
 * @csspart row--content - Row wrapper for the navigation and heading. Usage: `c4d-leadspace::part(row--content)`
 * @csspart description - The description. Usage`c4d-leadspace::part(description)`
 * @csspart section - The first DOM node inside the shadow-root. Usage: `c4d-leadspace::part(section)`
 * @csspart container - The container around the whole leadspace. Usage: `c4d-leadspace::part(container)`
 * @csspart content-container - The container around just the content of the leadspace. Usage: `c4d-leadspace::part(content-container)`
 * @csspart overlay - The leadspace overlay wrapping all contents and optional gradient. Usage: `c4d-leadspace::part(overlay)`
 * @csspart gradient - The SVG gradient. Usage: `c4d-leadspace::part(gradient)`
 * @csspart action - The action. Usage: `c4d-leadspace::part(action)`
 */
@customElement(`${c4dPrefix}-leadspace`)
class C4DLeadSpace extends StableSelectorMixin(LitElement) {
  /**
   * Handler for @slotchange, ensure that the only element being rendered is C4DTagGroup
   *
   * @private
   */
  private _handleSlotChange(event: Event) {
    const childItems = (event.target as HTMLSlotElement).assignedNodes();

    childItems.filter(
      (elem) =>
        (elem as HTMLElement).matches?.(
          (this.constructor as typeof C4DLeadSpace).tagGroupSelector
        ) || (this.constructor as typeof C4DLeadSpace).breadcrumbSelector
    );
  }

  /**
   * Returns a class-name based on the gradient parameter type
   */
  protected _getGradientClass() {
    return classMap({
      [`${c4dPrefix}--leadspace--gradient`]: this.defaultSrc,
      [`${c4dPrefix}--leadspace__overlay`]: true,
    });
  }

  /**
   * Returns a class-name based on the type parameter type
   */
  protected _getTypeClass() {
    return classMap({
      [`${c4dPrefix}--leadspace--centered`]:
        this.type === LEADSPACE_TYPE.CENTERED,
      [`${c4dPrefix}--leadspace--centered__image`]:
        this.type === LEADSPACE_TYPE.CENTERED && this.defaultSrc,
      [`${c4dPrefix}--leadspace--productive`]:
        this.type === LEADSPACE_TYPE.SMALL,
      [`${c4dPrefix}--leadspace__section`]: true,
    });
  }

  /**
   * Renders Leadspace copy/description
   */
  protected _renderCopy() {
    const { copy } = this;
    return html`
      <div class="${c4dPrefix}--leadspace__row" part="row row--description">
        <p
          data-autoid="${c4dPrefix}--leadspace__desc"
          class="${c4dPrefix}--leadspace__desc"
          part="description">
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
        (child.tagName === 'C4D-BACKGROUND-MEDIA' ||
          child.tagName === 'C4D-LEADSPACE-IMAGE') &&
        child.slot === ''
      ) {
        child.slot = 'image';
      }
    });

    if (this.size === 'short') {
      this.querySelector('c4d-leadspace-heading')?.setAttribute(
        'type-style',
        'fluid-heading-05'
      );
    }
  }

  render() {
    const { gradientStyleScheme, type, size } = this;
    return html`
      <section class="${this._getTypeClass()}" part="section">
        <div class="${c4dPrefix}--leadspace__container" part="container">
          <div class="${this._getGradientClass()}" part="overlay">
            ${gradientStyleScheme === LEADSPACE_GRADIENT_STYLE_SCHEME.NONE
              ? undefined
              : svg`
                <svg
                  class="${c4dPrefix}--leadspace__gradient" part="gradient"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <linearGradient id="stops" class="${c4dPrefix}--leadspace__gradient__stops" gradientTransform="${
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
                  <rect class="${c4dPrefix}--leadspace__gradient__rect" width="100" height="100" />
                </svg>
              `}
            <div
              class="${c4dPrefix}--leadspace--content__container"
              part="content-container">
              <div class="${c4dPrefix}--leadspace__row" part="row row--content">
                <slot
                  name="navigation"
                  @slotchange="${this._handleSlotChange}"></slot>
                ${this._renderHeading()}
              </div>
              ${size !== LEADSPACE_SIZE.SHORT
                ? html`
                    <div
                      class="${c4dPrefix}--leadspace__content"
                      part="content">
                      ${this._renderCopy()}
                      <div
                        class="${c4dPrefix}--leadspace__action"
                        part="action">
                        <slot name="action"></slot>
                      </div>
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
    return `${c4dPrefix}-leadspace-heading`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--leadspace`;
  }

  static get tagGroupSelector() {
    return `div`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLeadSpace;
