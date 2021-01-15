/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, internalProperty, LitElement, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from './defs';
import styles from './content-block.scss';

export { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME };

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

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
class DDSContentBlock extends LitElement {
  /**
   * `true` if there is complementary content.
   */
  @internalProperty()
  protected _hasComplementary = false;

  /**
   * `true` if there is child content.
   */
  @internalProperty()
  protected _hasContent = false;

  /**
   * `true` if there is heading content.
   */
  @internalProperty()
  protected _hasHeading = false;

  /**
   * `true` if there is copy content.
   */
  @internalProperty()
  protected _hasCopy = false;

  /**
   * `true` if there is footer content.
   */
  @internalProperty()
  protected _hasFooter = false;

  /**
   * `true` if there is media content.
   */
  @internalProperty()
  protected _hasMedia = false;

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this[slotExistencePropertyNames[name] || '_hasContent'] = hasContent;
  }

  /**
   * @returns The non-header, non-complementary contents.
   */
  protected _renderBody(): TemplateResult | string | void {
    return html`
      ${this._renderCopy()}${this._renderInnerBody()}${this._renderFooter()}
    `;
  }

  /**
   * @returns The main content.
   */
  protected _renderContent(): TemplateResult | string | void {
    const { _handleSlotChange: handleSlotChange } = this;
    return html`
      <slot @slotchange="${handleSlotChange}"></slot>
    `;
  }

  /**
   * @returns The copy content.
   */
  protected _renderCopy(): TemplateResult | string | void {
    const { _handleSlotChange: handleSlotChange } = this;
    return html`
      <slot name="copy" @slotchange="${handleSlotChange}"></slot>
    `;
  }

  /**
   * @returns The footer content.
   */
  protected _renderFooter(): TemplateResult | string | void {
    const { _hasFooter: hasFooter, _handleSlotChange: handleSlotChange } = this;
    return html`
      <div ?hidden="${!hasFooter}" class="${prefix}--content-block__cta-row">
        <div class="${prefix}--content-block__cta ${prefix}--content-block__cta-col">
          <slot name="footer" @slotchange="${handleSlotChange}"></slot>
        </div>
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
    const { _hasContent: hasContent, _hasMedia: hasMedia } = this;
    return html`
      <div ?hidden="${!hasContent && !hasMedia}" class="${prefix}--content-block__children">
        ${this._renderContent()}${this._renderMedia()}
      </div>
    `;
  }

  /**
   * @returns The media content.
   */
  protected _renderMedia(): TemplateResult | string | void {
    const { _hasMedia: hasMedia, _handleSlotChange: handleSlotChange } = this;
    return html`
      <div ?hidden="${!hasMedia}">
        <slot name="media" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
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
    const { complementaryStyleScheme, _hasComplementary: hasComplementary } = this;
    const complementaryRowClasses = classMap({
      [`${prefix}--row`]: true,
      [`${prefix}--layout--border`]: complementaryStyleScheme === CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER,
    });

    return !hasComplementary
      ? html`
          ${this._renderHeading()}${this._renderBody()}${this._renderComplementary()}
        `
      : html`
          <div class="${prefix}--row">
            <div class="${ddsPrefix}-ce--content-block__col">
              ${this._renderHeading()}
              <div></div>
            </div>
          </div>
          <div class="${complementaryRowClasses}">
            <div class="${ddsPrefix}-ce--content-block__col">
              ${this._renderBody()}
            </div>
            ${this._renderComplementary()}
          </div>
        `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSContentBlock;
