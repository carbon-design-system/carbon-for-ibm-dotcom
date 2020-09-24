/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { BASIC_COLOR_SCHEME } from '../../globals/shared-enums';
import DDSLink from '../../globals/internal/link';
import DDSCardFooter from './card-footer';
import styles from './card.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  eyebrow: '_hasEyebrow',
  heading: '_hasHeading',
  image: '_hasImage',
};

/**
 * Card.
 *
 * @element dds-card
 */
@customElement(`${ddsPrefix}-card`)
class DDSCard extends DDSLink {
  /**
   * `true` if there is eyebrow content.
   */
  protected _hasEyebrow;

  /**
   * `true` if there is heading content.
   */
  protected _hasHeading;

  /**
   * `true` if there is image content.
   */
  protected _hasImage;

  /**
   * `true` if there is copy content.
   */
  protected _hasCopy;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this[slotExistencePropertyNames[name] || '_hasCopy'] = hasContent;
    this.requestUpdate();
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
  // eslint-disable-next-line class-methods-use-this
  protected _renderImage(): TemplateResult | string | void {
    return html`
      <slot name="image" @slotchange="${this._handleSlotChange}"></slot>
    `;
  }

  /**
   * @returns The inner content.
   */
  protected _renderInner() {
    const { _hasEyebrow: hasEyebrow, _hasHeading: hasHeading, _handleSlotChange: handleSlotChange } = this;
    return html`
      ${this._renderImage()}
      <div class="${prefix}--card__wrapper">
        <p ?hidden="${!hasEyebrow}" class="${prefix}--card__eyebrow">
          <slot name="eyebrow" @slotchange="${handleSlotChange}" />
        </p>
        <h3 ?hidden="${!hasHeading}" class="${prefix}--card__heading">
          <slot name="heading" @slotchange="${handleSlotChange}" />
        </h3>
        ${this._renderCopy()}
        <slot name="footer" />
      </div>
    `;
  }

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = BASIC_COLOR_SCHEME.REGULAR;

  /**
   * Link `href`.
   */
  @property()
  href = '';

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
    return `${ddsPrefix}-card-footer`;
  }

  static styles = styles;
}

export default DDSCard;
