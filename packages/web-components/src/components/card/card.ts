/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, internalProperty, customElement, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { BASIC_COLOR_SCHEME } from '../../globals/defs';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSLink from '../link/link';
import DDSCardFooter from './card-footer';
import styles from './card.scss';
import { PICTOGRAM_POSITION } from './defs';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  eyebrow: '_hasEyebrow',
  heading: '_hasHeading',
  image: '_hasImage',
  pictogram: '_hasPictogram',
};

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
class DDSCard extends StableSelectorMixin(DDSLink) {
  /**
   * `true` if there is eyebrow content.
   */
  @internalProperty()
  protected _hasEyebrow = false;

  /**
   * `true` if there is heading content.
   */
  @internalProperty()
  protected _hasHeading = false;

  /**
   * `true` if there is image content.
   */
  @internalProperty()
  protected _hasImage = false;

  /**
   * `true` if there is copy content.
   */
  @internalProperty()
  protected _hasCopy = false;

  /**
   * `true` if there is a pictogram.
   */
  @internalProperty()
  protected _hasPictogram = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { pictogramPosition: currentPictogramPosition } = this;
    const { dataset, name } = target as HTMLSlotElement;
    const { pictogramPosition } = dataset;
    if (!pictogramPosition || pictogramPosition === currentPictogramPosition) {
      const hasContent = (target as HTMLSlotElement)
        .assignedNodes()
        .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
      this[slotExistencePropertyNames[name] || '_hasCopy'] = hasContent;
    }
  }

  /**
   * @returns The copy content.
   */
  protected _renderCopy(): TemplateResult | string | void {
    const { _hasCopy: hasCopy } = this;
    return html`
      <div ?hidden="${!hasCopy}" class="${prefix}--card__copy">
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * @returns The image content.
   */
  protected _renderImage(): TemplateResult | string | void {
    return html`
      <slot name="image" @slotchange="${this._handleSlotChange}"></slot>
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
    const {
      _hasEyebrow: hasEyebrow,
      _hasHeading: hasHeading,
      _handleSlotChange: handleSlotChange,
      _hasPictogram: hasPictogram,
    } = this;
    return html`
      ${this._renderImage()}
      <div class="${prefix}--card__wrapper ${hasPictogram ? `${prefix}--card__pictogram` : ''}">
        <div class="${prefix}--card__content">
          <p ?hidden="${!hasEyebrow}" class="${prefix}--card__eyebrow">
            <slot name="eyebrow" @slotchange="${handleSlotChange}"></slot>
          </p>
          ${this.pictogramPosition === PICTOGRAM_POSITION.TOP
            ? html`
                <slot
                  name="pictogram"
                  data-pictogram-position="${PICTOGRAM_POSITION.TOP}"
                  @slotchange="${handleSlotChange}"
                ></slot>
              `
            : ''}
          ${this.pictogramPosition !== PICTOGRAM_POSITION.TOP || !hasPictogram
            ? html`
                <h3 ?hidden="${!hasHeading}" class="${prefix}--card__heading">
                  <span>
                    <slot name="heading" @slotchange="${handleSlotChange}"></slot>
                  </span>
                </h3>
              `
            : null}
          ${this.pictogramPosition === PICTOGRAM_POSITION.BOTTOM || !hasPictogram ? this._renderCopy() : ''}
          ${this.pictogramPosition === PICTOGRAM_POSITION.BOTTOM
            ? html`
                <slot
                  name="pictogram"
                  data-pictogram-position="${PICTOGRAM_POSITION.BOTTOM}"
                  @slotchange="${handleSlotChange}"
                ></slot>
              `
            : ''}
          ${hasPictogram && this.pictogramPosition === PICTOGRAM_POSITION.TOP
            ? html`
                <h3 ?hidden="${!hasHeading}" class="${prefix}--card__heading">
                  <span>
                    <slot name="heading" @slotchange="${handleSlotChange}"></slot>
                  </span>
                </h3>
              `
            : null}
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  /**
   * The color scheme.
   * A typical use case of using another color scheme of card is having a "CTA" purpose of card at the last in card group.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = BASIC_COLOR_SCHEME.REGULAR;

  /**
   * Link `href`.
   */
  @property()
  href = '';

  /**
   * Pictogram position
   */
  @property({ attribute: 'pictogram-position', reflect: true })
  pictogramPosition = PICTOGRAM_POSITION.TOP;

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <= 537,
    });
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    const { colorScheme, href, _linkNode: linkNode } = this;
    if (changedProperties.has('colorScheme') || changedProperties.has('href')) {
      const footer = this.querySelector((this.constructor as typeof DDSCard).selectorFooter);
      if (footer) {
        (footer as DDSCardFooter).colorScheme = colorScheme;
        (footer as DDSCardFooter).parentHref = href;
      }
    }
    if (linkNode) {
      linkNode.classList.add(`${prefix}--tile`);
      linkNode.classList.add(`${prefix}--card`);
      linkNode.classList.toggle(`${prefix}--tile--clickable`, Boolean(href));
      linkNode.classList.toggle(`${prefix}--card--link`, Boolean(href));
      linkNode.classList.toggle(`${prefix}--card--inverse`, colorScheme === BASIC_COLOR_SCHEME.INVERSE);
    }
  }

  render() {
    const { href } = this;
    return !href ? this._renderInner() : super.render();
  }

  /**
   * A selector that will return the child footer.
   */
  static get selectorFooter() {
    return `${ddsPrefix}-card`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCard;
