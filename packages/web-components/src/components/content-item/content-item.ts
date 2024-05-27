/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, state } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './content-item.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  media: '_hasMedia',
  statistic: '_hasStatistic',
  footer: '_hasFooter',
};

/**
 * Content item.
 *
 * @element c4d-content-item
 * @slot media - The media content.
 * @slot heading - The heading content.
 * @slot footer - The footer (CTA) content.
 */
@customElement(`${c4dPrefix}-content-item`)
class C4DContentItem extends StableSelectorMixin(LitElement) {
  /**
   * `true` if there are CTA statistic in the content item area.
   */
  @state()
  protected _hasLogo = false;
  /**
   * `true` if there are CTA media in the content item area.
   */
  @state()
  protected _hasMedia = false;

  /**
   * `true` if there are CTA statistic in the content item area.
   */
  @state()
  protected _hasStatistic = false;

  /**
   * `true` if there is a footer content.
   */
  @state()
  _hasFooter = false;

  @property({ type: Boolean })
  horizontal = false;

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
    this[slotExistencePropertyNames[name] || '_hasStatistic'] = hasContent;
    if (
      (
        (target as HTMLSlotElement).assignedNodes()[0] as HTMLElement
      )?.matches?.(
        (this.constructor as typeof C4DContentItem).selectorImageLogo
      )
    ) {
      this._hasLogo = true;
    } else {
      this._hasLogo = false;
    }
  }

  /**
   * @returns The statistic content items
   */
  protected _renderStatistic(): TemplateResult | string | void {
    const { _hasStatistic: hasStatistic, _handleSlotChange: handleSlotChange } =
      this;
    return html`
      <div
        ?hidden="${!hasStatistic}"
        class="${c4dPrefix}--content-item__statitics"
        part="statistics">
        <slot name="statistics" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * @returns The media content items
   */
  protected _renderMedia(): TemplateResult | string | void {
    const { _hasMedia: hasMedia, _handleSlotChange: handleSlotChange } = this;

    return html`
      <div
        ?hidden="${!hasMedia}"
        class="${c4dPrefix}--content-item__media"
        part="media">
        <slot name="media" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * @returns The body content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderBody(): TemplateResult | string | void {
    return html` <slot></slot> `;
  }

  /**
   * @returns The footer content.
   */
  protected _renderFooter(): TemplateResult | string | void {
    const { _hasFooter: hasFooter } = this;
    return html`
      <div
        ?hidden="${!hasFooter}"
        class="${prefix}--content-item__cta"
        part="cta">
        <slot name="footer" @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `;
  }

  updated() {
    if (this._hasFooter) {
      this.querySelector(`${c4dPrefix}-content-item-copy`)?.setAttribute(
        'has-cta',
        ''
      );
    } else {
      this.querySelector(`${c4dPrefix}-content-item-copy`)?.removeAttribute(
        'has-cta'
      );
    }
  }

  render() {
    const { horizontal, _hasStatistic: hasStatistic, _hasLogo: hasLogo } = this;
    const horizontalClass = classMap({
      [`${c4dPrefix}--content-item__horizontal`]:
        horizontal && !hasStatistic && !hasLogo,
    });

    return html`
      <div class="${horizontalClass}" part="heading">
        ${this._renderStatistic()} ${this._renderMedia()}
        <div>
          <slot name="heading"></slot>
          ${this._renderBody()}${this._renderFooter()}
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--content-item`;
  }

  static get selectorImageLogo() {
    return `${c4dPrefix}-image-logo`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DContentItem;
