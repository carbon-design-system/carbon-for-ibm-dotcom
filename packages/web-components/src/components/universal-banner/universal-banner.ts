/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import { baseFontSize, breakpoints } from '@carbon/layout';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './universal-banner.scss';
import StickyHeader from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/StickyHeader/StickyHeader';
import DDSButtonCTA from '../cta/button-cta';
import { icons as ctaIcons } from '../../component-mixins/cta/cta';

const gridLgBreakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;

const { stablePrefix: ddsPrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Universal banner
 *
 * @element dds-universal-banner
 */
@customElement(`${ddsPrefix}-universal-banner`)
class DDSUniversalBanner extends StableSelectorMixin(LitElement) {
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

  @query(`.${prefix}--universal-banner-layout-container`)
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
          (this.constructor as typeof DDSUniversalBanner).ctaButton
        )
      );

    this.buttonHref = (hasContent[0] as HTMLElement)?.getAttribute('href');
    this.ctaType = (hasContent[0] as DDSButtonCTA)?.ctaType;
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
      <div class="${prefix}--universal-banner-layout-container">
        ${this._renderInnerContents()}
      </div>
    `;
  }

  _renderAsLink() {
    return html`
      <a
        href="${this.buttonHref}"
        class="${prefix}--universal-banner-layout-container">
        ${this._renderInnerContents()}
      </a>
    `;
  }

  _renderIcon() {
    return html` ${ctaIcons[this.ctaType]()} `;
  }

  _renderInnerContents() {
    return html`
      <div class="${prefix}--universal-banner-content-wrapper">
        <div
          ?hidden="${!this.hasImage}"
          class="${prefix}--universal-banner-image-container">
          <slot
            name="image"
            @slotchange="${this._handleImageSlotChange}"></slot>
        </div>

        <div class="${prefix}--universal-banner-text-container">
          <slot name="heading"></slot>
          <slot name="copy"></slot>
        </div>

        <div class="${prefix}--universal-banner-cta-container">
          <slot name="cta" @slotchange="${this._handleButtonSlotChange}"></slot>
        </div>

        <div class="${prefix}--universal-banner-icon">
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
    return `${ddsPrefix}-button-cta`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSUniversalBanner;
