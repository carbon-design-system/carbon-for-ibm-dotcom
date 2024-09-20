/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { html, LitElement, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from './defs';
import styles from './content-block.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';

export { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME };

const { prefix, stablePrefix: c4dPrefix } = settings;

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
 * @element c4d-content-block
 * @slot heading - The heading content.
 * @slot copy - The copy content.
 * @slot media - The media content.
 * @slot footer - The footer (CTA) content.
 * @slot complementary - The complementary (aside) content.
 * @csspart body - The body. Usage: `c4d-content-block::part(body)`
 * @csspart footer - The footer. Usage: `c4d-content-block::part(footer)`
 * @csspart content-layout - The content wrapper. Usage: `c4d-content-block::part(content-layout)`
 * @abstract
 */
@customElement(`${c4dPrefix}-content-block`)
class C4DContentBlock extends StableSelectorMixin(LitElement) {
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
  protected _getContainerClasses() {
    const {
      complementaryStyleScheme,
      _hasContent: hasContent,
      _hasComplementary: hasComplementary,
      _hasFooter: hasFooter,
    } = this;
    return classMap({
      [`${prefix}--content-layout`]: true,
      [`${prefix}--content-layout--with-children`]: hasContent,
      [`${prefix}--content-layout--with-complementary`]: hasComplementary,
      [`${prefix}--content-layout--with-footer`]: hasFooter,
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
   * @param event.target The event target.
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
        part="body"
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

    // if card-group exists, ensure the card link footer item matches width of card-group-item
    const cardGroup = this.querySelector(
      (this.constructor as typeof C4DContentBlock).selectorCardGroup
    );
    const cardGroupStyle = cardGroup?.getAttribute('style');

    return html`
      <div
        part="footer"
        ?hidden="${!hasFooter}"
        class="${hasFooter && `${c4dPrefix}--content-block-footer`}"
        style="${cardGroupStyle}"
        ?card-group="${cardGroup}"
        grid-mode="${cardGroup?.getAttribute('grid-mode')}">
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
      <div part="content-layout" class="${this._getContainerClasses()}">
        ${this._renderHeading()}${this._renderBody()}${this._renderComplementary()}
      </div>
    `;
  }

  /**
   * A selector that will return the card-group element
   */
  static get selectorCardGroup() {
    return `${c4dPrefix}-card-group`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DContentBlock;
