/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { baseFontSize, breakpoints } from '@carbon/layout';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './global-banner.scss';
import StickyHeader from '@carbon/ibmdotcom-utilities/es/utilities/StickyHeader/StickyHeader.js';
import C4DButton from '../button/button';
import { icons as ctaIcons } from '../../component-mixins/cta/cta';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const gridLgBreakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Global banner
 *
 * @element c4d-global-banner
 * @csspart container - Targets all container elements. Usage: `c4d-global-banner::part(container)`
 * @csspart container--static - Container for Static type. Usage: `c4d-global-banner::part(container--static)`
 * @csspart container--link - Container for Link type. Usage: `c4d-global-banner::part(container--link)`
 * @csspart content - The content. Usage: `c4d-global-banner::part(content)`
 * @csspart image-container -  The image container. Usage: `c4d-global-banner::part(image-container)`
 * @csspart text-container - The text container. Usage: `c4d-global-banner::part(text-container)`
 * @csspart cta-container - The CTA container. Usage: `c4d-global-banner::part(cta-container)`
 * @csspart icon - The icon. Usage: `c4d-global-banner::part(icon)`
 */
@customElement(`${c4dPrefix}-global-banner`)
class C4DGlobalBanner extends StableSelectorMixin(LitElement) {
  /**
   * Saves the button CTA's href to use in link-with-icon for the small breakpoint
   */
  @property()
  buttonHref;

  /**
   * Saves the button CTA's type to properly set the icon at `sm` and `md` breakpoints.
   */
  @property()
  ctaType;

  /**
   * `true` if there is an image.
   */
  @property({ attribute: 'has-image', reflect: true, type: Boolean })
  hasImage = false;

  /**
   * Grid media options to display image.
   * Available options are either '4-col' or '8-col'.
   */
  @property({ attribute: 'image-width', reflect: true, type: String })
  imageWidth;

  private _breakpoint?: MediaQueryList;

  @property({ type: Boolean })
  private _shouldRenderAsLink = false;

  @query(`.${prefix}--global-banner-layout-container`)
  private _linkWrapper;

  /**
   * Handles `slotchange` event on the cta `<slot>`.
   */
  protected _handleImageSlotChange({ target }: Event) {
    this.hasImage = (target as HTMLSlotElement)
      .assignedNodes()
      .some(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );

    if (this.hasImage && !this.imageWidth) {
      this.imageWidth = '4-col';
    }
  }

  /**
   * Handles `slotchange` event on the cta `<slot>`.
   */
  protected _handleButtonSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches?.(
          (this.constructor as typeof C4DGlobalBanner).ctaButton
        )
      );

    this.buttonHref = (hasContent[0] as HTMLElement)?.getAttribute('href');
    this.ctaType = (hasContent[0] as C4DButton)?.ctaType;
  }

  protected _handleResize() {
    const { _breakpoint: breakpoint } = this;
    this._shouldRenderAsLink = !breakpoint!.matches;
  }

  firstUpdated() {
    StickyHeader.global.banner = this;

    this._breakpoint = window.matchMedia(`(min-width: ${gridLgBreakpoint}px)`);
    this._breakpoint.addEventListener('change', this._handleResize.bind(this));
    this._handleResize();
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'banner');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('_shouldRenderAsLink')) {
      const { _shouldRenderAsLink: shouldRenderAsLink, ctaType } = this;

      if (shouldRenderAsLink && ctaType === 'external') {
        setTimeout(() => {
          this._linkWrapper.setAttribute('target', '_blank');
        }, 0);
      }
    }
  }

  /**
   * Renders shadow dom within a static div
   */
  _renderAsStatic() {
    return html`
      <div
        class="${prefix}--global-banner-layout-container"
        part="container container--static">
        ${this._renderInnerContents()}
      </div>
    `;
  }

  _renderAsLink() {
    return html`
      <a
        href="${this.buttonHref}"
        class="${prefix}--global-banner-layout-container"
        part="container container--link">
        ${this._renderInnerContents()}
      </a>
    `;
  }

  _renderIcon() {
    return html` ${ctaIcons[this.ctaType]()} `;
  }

  _renderInnerContents() {
    return html`
      <div class="${prefix}--global-banner-content-wrapper" part="content">
        <div
          ?hidden="${!this.hasImage}"
          class="${prefix}--global-banner-image-container"
          part="image-container">
          <slot
            name="image"
            @slotchange="${this._handleImageSlotChange}"></slot>
        </div>

        <div
          class="${prefix}--global-banner-text-container"
          part="text-container">
          <slot name="heading"></slot>
          <slot name="copy"></slot>
        </div>

        <div
          class="${prefix}--global-banner-cta-container"
          part="cta-container">
          <slot name="cta" @slotchange="${this._handleButtonSlotChange}"></slot>
        </div>

        <div class="${prefix}--global-banner-icon" part="icon">
          ${this.ctaType ? this._renderIcon() : ''}
        </div>
      </div>
    `;
  }

  render() {
    return html`
      ${this._shouldRenderAsLink
        ? this._renderAsLink()
        : this._renderAsStatic()}
    `;
  }

  /**
   * A selector that will return the CTA button
   */
  static get ctaButton() {
    return `${c4dPrefix}-button`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DGlobalBanner;
