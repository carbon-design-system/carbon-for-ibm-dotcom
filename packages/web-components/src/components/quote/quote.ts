/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './quote.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { QUOTE_TYPES, QUOTE_COLOR_SCHEMES } from './defs';
import '../horizontal-rule/horizontal-rule';

export { QUOTE_TYPES, QUOTE_COLOR_SCHEMES };

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

const slotExistencePropertyNames = {
  'source-heading': '_hasSourceHeading',
  'source-copy': '_hasSourceCopy',
  'source-bottom-copy': '_hasSourceBottomCopy',
  footer: '_hasFooter',
};

/**
 * Quote.
 *
 * @element dds-quote
 * @slot copy - The copy content.
 * @slot footer - The footer (CTA) content.
 * @slot source-heading - The heading content of the quote source.
 * @slot source-copy - The copy content of the quote source.
 * @slot source-bottom-copy - The copy content of the quote source placed at the bottom.
 */
@customElement(`${ddsPrefix}-quote`)
class DDSQuote extends StableSelectorMixin(LitElement) {
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
   * Defines if the inverse class is included
   */
  @property({ reflect: true, attribute: 'color-scheme' })
  colorScheme = QUOTE_COLOR_SCHEMES.REGULAR;

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
        <dds-hr></dds-hr>
        <slot name="footer" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  render() {
    if (this.colorScheme === QUOTE_COLOR_SCHEMES.INVERSE) {
      return html`
        <div class="${prefix}--callout__column">
          <div class="${prefix}--callout__content">
            <div class="${prefix}--quote__container">
              <div class="${prefix}--quote__wrapper">
                ${this._renderQuote()}${this._renderSource()}${this._renderFooter()}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return html`
      <div class="${prefix}--quote__container">
        <div class="${prefix}--quote__wrapper">
          ${this._renderQuote()}${this._renderSource()}${this._renderFooter()}
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--quote`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSQuote;
