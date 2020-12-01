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
import { BASIC_COLOR_SCHEME } from '../../globals/shared-enums';
import DDSLink from '../../globals/internal/link';
import DDSCardFooter from './card-hc-footer';
import styles from './card-hc.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  eyebrow: '_hasEyebrow',
  heading: '_hasHeading',
  copy: '_hasCopy',
  image: '_hasImage',
};

/**
 * Card.
 *
 * @element dds-card-hc
 * @slot eyebrow - The eyebrow content.
 * @slot heading - The heading content.
 * @slot copy - The copy content.
 * @slot image - The image content.
 * @slot footer - The footer content.
 */
@customElement(`${ddsPrefix}-card-hc`)
class DDSCard extends DDSLink {
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
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this[slotExistencePropertyNames[name] || '_hasCopy'] = hasContent;
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
   * @returns The inner content.
   */
  protected _renderInner() {
    const { _hasEyebrow: hasEyebrow, _hasHeading: hasHeading, _hasCopy: hasCopy, _handleSlotChange: handleSlotChange } = this;
    return html`
      ${this._renderImage()}
      <div class="${prefix}--card__wrapper">
        <div class="${prefix}--card__content">
          <p ?hidden="${!hasEyebrow}" class="${prefix}--card__eyebrow">
            <slot name="eyebrow" @slotchange="${handleSlotChange}"></slot>
          </p>
          <h3 ?hidden="${!hasHeading}" class="${prefix}--card__heading">
            <slot name="heading" @slotchange="${handleSlotChange}"></slot>
          </h3>
          <p ?hidden="${!hasCopy}" class="${prefix}--card__copy">
            <slot name="copy" @slotchange="${handleSlotChange}"></slot>
          </p>
          <slot name="footer"></slot>
        </div>
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
    return `${ddsPrefix}-card-hc-footer`;
  }

  static styles = styles;
}

export default DDSCard;
