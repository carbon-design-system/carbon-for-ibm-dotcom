/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, state, TemplateResult, query } from 'lit-element';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import BXLink from '../../internal/vendor/@carbon/web-components/components/link/link.js';
import markdownToHtml from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/markdownToHtml/markdownToHtml.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { BASIC_COLOR_SCHEME } from '../../globals/defs';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSCardFooter from './card-footer';
import styles from './card.scss';
import { PICTOGRAM_PLACEMENT } from './defs';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card.
 *
 * @element dds-card
 * @slot eyebrow - The eyebrow content.
 * @slot heading - The heading content.
 * @slot image - The image content.
 * @slot footer - The footer content.
 */
@customElement(`${ddsPrefix}-card`)
class DDSCard extends StableSelectorMixin(BXLink) {
  /**
   * `true` if there is image content.
   */
  @state()
  protected _hasImage: boolean = false;

  /**
   * `true` if there is copy content.
   */
  @state()
  protected _hasCopy: boolean = false;

  /**
   * `true` if there is a pictogram.
   */
  @state()
  protected _hasPictogram: boolean = false;

  protected _hasAssignedNodes(eventTarget: HTMLSlotElement): boolean {
    return Boolean((eventTarget as HTMLSlotElement).assignedNodes().length);
  }

  /**
   * Handles pictogram `slotchange` event.
   */
  private _handlePictogramSlotChange(event: Event) {
    const target = event.target as HTMLSlotElement;
    const hasPictogram = this._hasAssignedNodes(target as HTMLSlotElement);
    this._hasPictogram = hasPictogram;
  }

  /**
   * Handles Copy `slotchange` event.
   */
  private _handleCopySlotChange(event: Event) {
    const target = event.target as HTMLSlotElement;
    const hasContent = this._hasAssignedNodes(target as HTMLSlotElement);
    this._hasCopy = hasContent;
  }

  /**
   * Handles Image `slotchange` event.
   */
  private _handleImageSlotChange(event: Event) {
    const target = event.target as HTMLSlotElement;
    const hasImage = this._hasAssignedNodes(target as HTMLSlotElement);
    this._hasImage = hasImage;
  }

  /**
   * @returns The heading content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderHeading(): TemplateResult | string | void {
    return html` <slot name="heading"></slot> `;
  }

  /**
   * @returns The copy content.
   */
  protected _renderCopy(): TemplateResult | string | void {
    const { _hasCopy: hasCopy } = this;
    return html`
      <div
        ?hidden="${!hasCopy}"
        class="${prefix}--card__copy"
        id="${prefix}--card__description">
        <slot @slotchange="${this._handleCopySlotChange}"></slot>
      </div>
    `;
  }

  /**
   * @returns The image content.
   */
  protected _renderImage(): TemplateResult | string | void {
    return html`
      <slot name="image" @slotchange="${this._handleImageSlotChange}"></slot>
    `;
  }

  /**
   * renders the pictogram slot.
   */
  protected _renderPictogram(
    placement: PICTOGRAM_PLACEMENT = PICTOGRAM_PLACEMENT.TOP
  ): TemplateResult | string | void {
    return html`
      <slot
        name="pictogram"
        data-pictogram-placement="${placement}"
        @slotchange="${this._handlePictogramSlotChange}"></slot>
    `;
  }

  /**
   * @returns The disabled link content.
   */
  protected _renderDisabledLink() {
    const { _classes: classes } = this;
    return html`
      <div id="link" class="${classes}">${this._renderInner()}</div>
    `;
  }

  /**
   * @returns The inner content.
   */
  protected _renderInner() {
    const { _hasCopy: hasCopy } = this;

    if (
      this.pictogramPlacement === PICTOGRAM_PLACEMENT.TOP ||
      this.pictogramPlacement === PICTOGRAM_PLACEMENT.BOTTOM
    ) {
      return html`
        ${this._renderImage()}
        <a
          aria-label="${this.querySelector(`${ddsPrefix}-card-heading`)
            ?.textContent || ''}"
          aria-live="polite"
          aria-describedby="${prefix}--card__description"
          role="button"
          href="${this.href}"
          class="${prefix}--card__wrapper ${prefix}--card__pictogram
           ${hasCopy ? `${prefix}--card__motion` : ''}">
          <div class="${prefix}--card__content">
            ${this.pictogramPlacement === PICTOGRAM_PLACEMENT.TOP
              ? html`
                  ${this._renderPictogram(PICTOGRAM_PLACEMENT.TOP)}
                  ${this._renderHeading()}${this._renderCopy()}
                `
              : this.pictogramPlacement === PICTOGRAM_PLACEMENT.BOTTOM
              ? html`
                  ${this._renderHeading()}${this._renderCopy()}
                  ${this._renderPictogram(PICTOGRAM_PLACEMENT.BOTTOM)}
                `
              : ''}
            <slot name="footer"></slot>
          </div>
        </a>
      `;
    } else {
      return html`
        ${this._renderImage()}
        <div class="${prefix}--card__wrapper">
          <div class="${prefix}--card__content">
            <slot name="eyebrow"></slot>
            ${this._renderHeading()} ${this._renderCopy()}
            <slot name="footer"></slot>
          </div>
        </div>
      `;
    }
  }

  /**
   * An optional 1px border surrounding the component.
   */
  @property({ type: Boolean, reflect: true })
  border = false;

  /**
   * The color scheme.
   * A typical use case of using another color scheme of card is having a "CTA" purpose of card at the last in card group.
   *
   * Color scheme options are: "inverse" and "light"
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = BASIC_COLOR_SCHEME.REGULAR;

  /**
   * Link `href`.
   */
  @property()
  href = '';

  /**
   * Pictogram placement
   */
  @property({ attribute: 'pictogram-placement', reflect: true })
  pictogramPlacement = '';

  /**
   * Whether or not to apply the logo style.
   */
  @property({ type: Boolean, reflect: true })
  logo = false;

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: false,
    });
  }

  @query('div')
  protected _linkNode?: HTMLDivElement | HTMLParagraphElement;

  updated(changedProperties) {
    super.updated(changedProperties);
    const { colorScheme, href, _linkNode: linkNode } = this;
    if (changedProperties.has('colorScheme') || changedProperties.has('href')) {
      const headingText = this.querySelector(
        `${ddsPrefix}-card-heading`
      )?.textContent;
      const copyText = this.textContent;
      const footer = this.querySelector(
        (this.constructor as typeof DDSCard).selectorFooter
      );
      if (footer && href) {
        (footer as DDSCardFooter).colorScheme = colorScheme;
        (footer as DDSCardFooter).parentHref = href;
        (footer as DDSCardFooter).href = href;
        (footer as DDSCardFooter).altAriaLabel = headingText || copyText;
      }
    }
    if (linkNode) {
      linkNode.classList.add(`${prefix}--tile`);
      linkNode.classList.add(`${prefix}--card`);
      linkNode.classList.toggle(`${prefix}--tile--clickable`, Boolean(href));
      linkNode.classList.toggle(`${prefix}--card--link`, Boolean(href));
      linkNode.classList.toggle(
        `${prefix}--card--inverse`,
        colorScheme === BASIC_COLOR_SCHEME.INVERSE
      );
    }

    const copyElement = this.querySelector('p');
    if (this._hasCopy && copyElement?.innerText) {
      copyElement.innerHTML = `${markdownToHtml(copyElement?.innerText, {
        bold: false,
      })}`;
      copyElement.firstElementChild?.setAttribute('style', 'all:unset;');
    }
  }

  render() {
    return html` <div>${this._renderInner()}</div> `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--card`;
  }

  /**
   * A selector that will return the child footer.
   */
  static get selectorFooter() {
    return `${ddsPrefix}-card-footer`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCard;
