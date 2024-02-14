/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './quote.scss?lit';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { QUOTE_TYPES } from './defs';
import '../horizontal-rule/horizontal-rule';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

export { QUOTE_TYPES };

const { prefix, stablePrefix: c4dPrefix } = settings;

const slotExistencePropertyNames = {
  'source-heading': '_hasSourceHeading',
  'source-copy': '_hasSourceCopy',
  'source-bottom-copy': '_hasSourceBottomCopy',
  footer: '_hasFooter',
};

/**
 * Quote.
 *
 * @element c4d-quote
 * @slot copy - The copy content.
 * @slot footer - The footer (CTA) content.
 * @slot source-heading - The heading content of the quote source.
 * @slot source-copy - The copy content of the quote source.
 * @slot source-bottom-copy - The copy content of the quote source placed at the bottom.
 */
@customElement(`${c4dPrefix}-quote`)
class C4DQuote extends StableSelectorMixin(LitElement) {
  /**
   * Defines rendered quote mark style
   * styles:
   * `double-curved`: `“ ”`;
   * `single-curved`: `‘ ’`;
   * `single-angle`: `‹ ›`;
   * `double-angle`: `« »`;
   * `low-high-reversed-double-curved`: `„ “`;
   * `corner-bracket`: `「 」`;
   */
  @property({ reflect: true, attribute: 'mark-type' })
  markType = QUOTE_TYPES.DEFAULT;

  /**
   * `true` if there is source heading.
   */
  protected _hasSourceHeading = false;

  /**
   * `true` if there is source copy.
   */
  protected _hasSourceCopy = false;

  /**
   * `true` if there is source bottom copy.
   */
  protected _hasSourceBottomCopy = false;

  /**
   * `true` if there is cta.
   */
  protected _hasFooter = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
    this[slotExistencePropertyNames[name]] = hasContent;
    this.requestUpdate();
  }

  protected _renderQuote() {
    switch (this.markType) {
      case QUOTE_TYPES.SINGLE_CURVED:
        return html`
          <span class="${prefix}--quote__mark">‘</span>
          <blockquote class="${prefix}--quote__copy">
            <slot></slot><span class="${prefix}--quote__mark-closing">’</span>
          </blockquote>
        `;
      case QUOTE_TYPES.DOUBLE_ANGLE:
        return html`
          <span class="${prefix}--quote__mark">«</span>
          <blockquote class="${prefix}--quote__copy">
            <slot></slot><span class="${prefix}--quote__mark-closing">»</span>
          </blockquote>
        `;
      case QUOTE_TYPES.SINGLE_ANGLE:
        return html`
          <span class="${prefix}--quote__mark">‹</span>
          <blockquote class="${prefix}--quote__copy">
            <slot></slot><span class="${prefix}--quote__mark-closing">›</span>
          </blockquote>
        `;
      case QUOTE_TYPES.LOW_HIGH_REVERSED_DOUBLE_CURVED:
        return html`
          <span class="${prefix}--quote__mark">„</span>
          <blockquote class="${prefix}--quote__copy">
            <slot></slot><span class="${prefix}--quote__mark-closing">“</span>
          </blockquote>
        `;
      case QUOTE_TYPES.CORNER_BRACKET:
        return html`
          <span
            class="${prefix}--quote__mark ${prefix}--quote__mark-corner-bracket"
            >「</span
          >
          <blockquote class="${prefix}--quote__copy">
            <slot></slot><span class="${prefix}--quote__mark-closing">」</span>
          </blockquote>
        `;
      default:
        return html`
          <span class="${prefix}--quote__mark">“</span>
          <blockquote class="${prefix}--quote__copy">
            <slot></slot><span class="${prefix}--quote__mark-closing">”</span>
          </blockquote>
        `;
    }
  }

  protected _renderSource() {
    const {
      _hasSourceHeading: hasSourceHeading,
      _hasSourceCopy: hasSourceCopy,
      _handleSlotChange: handleSlotChange,
    } = this;
    return html`
      <div
        ?hidden="${!hasSourceHeading || !hasSourceCopy}"
        class="${prefix}--quote__source">
        <slot @slotchange="${handleSlotChange}" name="source-heading"></slot>
        <slot @slotchange="${handleSlotChange}" name="source-copy"></slot>
        <slot
          @slotchange="${handleSlotChange}"
          name="source-bottom-copy"></slot>
      </div>
    `;
  }

  protected _renderFooter() {
    const { _hasFooter: hasFooter, _handleSlotChange: handleSlotChange } = this;
    return html`
      <div ?hidden="${!hasFooter}" class="${prefix}--quote__footer">
        <c4d-hr></c4d-hr>
        <slot name="footer" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  render() {
    return html`
      <div class="${prefix}--quote__container">
        <div class="${prefix}--quote__wrapper">
          ${this._renderQuote()}${this._renderSource()}${this._renderFooter()}
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--quote`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DQuote;
