/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { customElement, html, LitElement, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import styles from './quote.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import '../horizontal-rule/horizontal-rule';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

export enum QUOTE_TYPES {
  /**
   * Default - doubleCurved
   */
  DEFAULT = 'doubleCurved',

  /**
   * singleCurved
   */
  SINGLE_CURVED = 'singleCurved',

  /**
   * singleAngle
   */
  SINGLE_ANGLE = 'singleAngle',

  /**
   * doubleAngle
   */
  DOUBLE_ANGLE = 'doubleAngle',

  /**
   * lowHighReversedDoubleCurved
   */
  LOW_HIGH_REVERSED_DOUBLE_CURVED = 'lowHighReversedDoubleCurved',
}

const slotExistencePropertyNames = {
  sourceHeading: '_hasSourceHeading',
  sourceCopy: '_hasSourceCopy',
  sourceBottomCopy: '_hasSourceBottomCopy',
  cta: '_hasCTA',
};

/**
 * Quote.
 *
 * @element dds-quote
 */
@customElement(`${ddsPrefix}-quote`)
class DDSQuote extends StableSelectorMixin(LitElement) {
  /**
   * Defines rendered quote mark style
   */
  @property({ reflect: true, attribute: 'mark-type' })
  markType = QUOTE_TYPES.DEFAULT;

  /**
   * Defines if the inverse class is included
   */
  @property({ reflect: true, type: Boolean })
  inverse = false;

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
  protected _hasCTA = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this[slotExistencePropertyNames[name]] = hasContent;
    this.requestUpdate();
  }

  updated(changedProperties) {
    if (changedProperties.has('inverse')) {
      const { inverse } = this;
      this.classList.toggle(`${prefix}--quote__inverse`, inverse);
    }
  }

  _renderQuote() {
    switch (this.markType) {
      case QUOTE_TYPES.SINGLE_CURVED:
        return html`
          <span class="${prefix}--quote__mark">‘</span>
          <blockquote class="${prefix}--quote__copy"><slot name="copy"></slot>’</blockquote>
        `;
      case QUOTE_TYPES.DOUBLE_ANGLE:
        return html`
          <span class="${prefix}--quote__mark">«</span>
          <blockquote class="${prefix}--quote__copy"><slot name="copy"></slot>»</blockquote>
        `;
      case QUOTE_TYPES.SINGLE_ANGLE:
        return html`
          <span class="${prefix}--quote__mark">‹</span>
          <blockquote class="${prefix}--quote__copy"><slot name="copy"></slot>›</blockquote>
        `;
      case QUOTE_TYPES.LOW_HIGH_REVERSED_DOUBLE_CURVED:
        return html`
          <span class="${prefix}--quote__mark">„</span>
          <blockquote class="${prefix}--quote__copy"><slot name="copy"></slot>“</blockquote>
        `;
      default:
        return html`
          <span class="${prefix}--quote__mark">“</span>
          <blockquote class="${prefix}--quote__copy"><slot name="copy"></slot>”</blockquote>
        `;
    }
  }

  _renderSource() {
    const {
      _hasSourceHeading: hasSourceHeading,
      _hasSourceCopy: hasSourceCopy,
      _hasSourceBottomCopy: hasSourceBottomCopy,
      _handleSlotChange: handleSlotChange,
    } = this;
    return html`
      <div ?hidden="${!hasSourceHeading || !hasSourceCopy}" class="${prefix}--quote__source">
        <p class="${prefix}--quote__source-heading">
          <slot @slotchange="${handleSlotChange}" name="sourceHeading" />
        </p>
        <p class="${prefix}--quote__source-body">
          <slot @slotchange="${handleSlotChange}" name="sourceCopy" />
        </p>
        <p ?hidden="${!hasSourceBottomCopy}" class="${prefix}--quote__source-optional-copy">
          <slot @slotchange="${handleSlotChange}" name="sourceBottomCopy" />
        </p>
      </div>
    `;
  }

  _renderCTA() {
    const { _hasCTA: hasCTA, _handleSlotChange: handleSlotChange } = this;
    return html`
      <div ?hidden="${!hasCTA}" class="${prefix}--quote__footer">
        <dds-hr></dds-hr>
        <slot name="cta" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <div class="${prefix}--quote__container">
        <div class="${prefix}--quote__wrapper">
          ${this._renderQuote()} ${this._renderSource()} ${this._renderCTA()}
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--quote`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSQuote;
