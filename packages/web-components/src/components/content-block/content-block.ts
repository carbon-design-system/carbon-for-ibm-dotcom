/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Part } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { html, property, state, LitElement, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from './defs';
import styles from './content-block.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

export { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME };

const { stablePrefix: ddsPrefix } = ddsSettings;
const { prefix } = settings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  complementary: '_hasComplementary',
  copy: '_hasCopy',
  heading: '_hasHeading',
  footer: '_hasFooter',
  media: '_hasMedia',
};

// TODO: Figure out how to define a mixin type supporting abstract class
/**
 * Content block.
 *
 * @slot heading - The heading content.
 * @slot copy - The copy content.
 * @slot media - The media content.
 * @slot footer - The footer (CTA) content.
 * @slot complementary - The complementary (aside) content.
 * @abstract
 */
@customElement(`${ddsPrefix}-content-block`)
class DDSContentBlock extends StableSelectorMixin(LitElement) {
  /**
   * `true` if there is complementary content.
   */
  @state()
  protected _hasComplementary = false;

  /**
   * `true` if there is child content.
   */
  @state()
  protected _hasContent = false;

  /**
   * `true` if there is heading content.
   */
  @state()
  protected _hasHeading = false;

  /**
   * `true` if there is copy content.
   */
  @state()
  protected _hasCopy = false;

  /**
   * `true` if there is footer content.
   */
  @state()
  protected _hasFooter = false;

  /**
   * `true` if there is media content.
   */
  @state()
  protected _hasMedia = false;

  /**
   * The CSS class list for the container (grid) node.
   */
  protected _getContainerClasses(): string | ((part: Part) => void) {
    const { complementaryStyleScheme, _hasComplementary: hasComplementary } =
      this;
    return classMap({
      [`${prefix}--content-layout`]: true,
      [`${prefix}--content-layout--with-complementary`]: hasComplementary,
      [`${prefix}--layout--border`]:
        complementaryStyleScheme ===
        CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER,
    });
  }

  /**
   * Returns whether or not there is content to render in the body markup.
   */
  protected _hasBodyContent(): boolean {
    const {
      _hasContent: hasContent,
      _hasCopy: hasCopy,
      _hasMedia: hasMedia,
      _hasFooter: hasFooter,
    } = this;
    return hasContent || hasCopy || hasMedia || hasFooter;
  }

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
    this[slotExistencePropertyNames[name] || '_hasContent'] = hasContent;
  }

  /**
   * @returns The non-header, non-complementary contents.
   */
  protected _renderBody(): TemplateResult | string | void {
    return html`
      <div
        ?hidden="${!this._hasBodyContent()}"
        class="${prefix}--content-layout__body">
        ${this._renderCopy()}${this._renderInnerBody()}${this._renderFooter()}
      </div>
    `;
  }

  /**
   * @returns The main content.
   */
  protected _renderContent(): TemplateResult | string | void {
    const { _handleSlotChange: handleSlotChange } = this;
    return html` <slot @slotchange="${handleSlotChange}"></slot> `;
  }

  /**
   * @returns The copy content.
   */
  protected _renderCopy(): TemplateResult | string | void {
    const { _handleSlotChange: handleSlotChange } = this;
    return html` <slot name="copy" @slotchange="${handleSlotChange}"></slot> `;
  }

  /**
   * @returns The footer content.
   */
  protected _renderFooter(): TemplateResult | string | void {
    const { _hasFooter: hasFooter, _handleSlotChange: handleSlotChange } = this;
    // TODO: See if we can remove the surrounding `<div>`
    return html`
      <div ?hidden="${!hasFooter}">
        <slot name="footer" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * @returns The heading content.
   */
  protected _renderHeading(): TemplateResult | string | void {
    const { _handleSlotChange: handleSlotChange } = this;
    return html`
      <slot name="heading" @slotchange="${handleSlotChange}"></slot>
    `;
  }

  /**
   * @returns The main/media content.
   */
  protected _renderInnerBody(): TemplateResult | string | void {
    return html` ${this._renderContent()}${this._renderMedia()} `;
  }

  /**
   * @returns The media content.
   */
  protected _renderMedia(): TemplateResult | string | void {
    const { _handleSlotChange: handleSlotChange } = this;
    return html` <slot name="media" @slotchange="${handleSlotChange}"></slot> `;
  }

  /**
   * @returns The complementary content.
   */
  protected _renderComplementary(): TemplateResult | string | void {
    const { _handleSlotChange: handleSlotChange } = this;
    return html`
      <slot name="complementary" @slotchange="${handleSlotChange}"></slot>
    `;
  }

  /**
   * The style scheme for the complementary content.
   */
  @property({ attribute: 'complementary-style-scheme' })
  complementaryStyleScheme = CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.REGULAR;

  render() {
    return html`
      <div class="${this._getContainerClasses()}">
        ${this._renderHeading()}${this._renderBody()}${this._renderComplementary()}
      </div>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSContentBlock;
