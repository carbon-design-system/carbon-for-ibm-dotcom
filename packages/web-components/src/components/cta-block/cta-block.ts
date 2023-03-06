/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TemplateResult, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

import styles from './cta-block.scss';
import DDSContentBlock from '../content-block/content-block';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  action: '_hasAction',
  'link-list': '_hasLinkList',
};

/**
 * The CTA BLOCK pattern
 *
 * @element dds-cta-block
 * @slot heading - The text heading.
 * @slot action - The CTA Buttons.
 */
@customElement(`${ddsPrefix}-cta-block`)
class DDSCTABlock extends StableSelectorMixin(DDSContentBlock) {
  @property({ type: Boolean, attribute: 'no-border', reflect: true })
  _noBorder = false;

  /**
   * `true` if there are CTA action in the content item area.
   */
  @state()
  protected _hasAction = false;

  /**
   * `true` if there is a link list.
   */
  @state()
  protected _hasLinkList = false;

  /**
   * Checks if the no-border attribute has changed and applies the border class accordingly
   */
  updated(changedProperties) {
    if (changedProperties.has('_noBorder')) {
      const layoutWrapper = (this.shadowRoot as ShadowRoot).querySelector(
        `.${prefix}--content-layout`
      );
      layoutWrapper?.classList.toggle(
        `${prefix}--content-layout--border`,
        !this._noBorder
      );
    }
  }

  protected _hasBodyContent(): boolean {
    const { _hasLinkList, _hasAction } = this;
    return _hasLinkList || _hasAction || super._hasBodyContent();
  }

  /**
   * Handles `slotchange` event, also sets height to all headings to the tallest one.
   *
   * @param event The event.
   */
  protected _handleSlotChange(event: Event) {
    const { target } = event;
    const { name } = target as HTMLSlotElement;

    if (!slotExistencePropertyNames[name]) {
      super._handleSlotChange(event);
      return;
    }
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
    this[slotExistencePropertyNames[name]] = hasContent;
  }

  /**
   * @returns The actions (CTA) content.
   */
  protected _renderActions(): TemplateResult | string | void {
    const { _hasAction: hasAction, _handleSlotChange: handleSlotChange } = this;
    return html`
      <div ?hidden="${!hasAction}" class="${prefix}--content-layout__cta">
        <slot name="action" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * @returns The main content.
   */
  protected _renderContent(): TemplateResult | string | void {
    const {
      _hasAction,
      _hasCopy,
      _hasLinkList,
      _hasContent,
      _handleSlotChange,
    } = this;
    const classes = classMap({
      [`${prefix}--helper-wrapper`]: true,
      [`${prefix}--helper-wrapper--less-space`]:
        !_hasAction && !_hasCopy && !_hasLinkList,
    });
    return html`
      <div ?hidden="${!_hasContent}" class="${classes}">
        <div class="${prefix}--content-item-wrapper">
          <slot @slotchange="${_handleSlotChange}"></slot>
        </div>
      </div>
    `;
  }

  /**
   * @returns The non-header, non-complementary contents.
   */
  protected _renderBody(): TemplateResult | string | void {
    const { _hasCopy, _hasAction, _hasLinkList, _hasContent } = this;
    const classes = classMap({
      [`${prefix}--content-layout__body`]: true,
      [`${prefix}--content-layout__body--tight`]:
        !_hasCopy && !_hasAction && (_hasLinkList || _hasContent),
    });

    return html`
      <div ?hidden="${!this._hasBodyContent()}" class="${classes}">
        ${this._renderCopy()}${this._renderInnerBody()}
      </div>
    `;
  }

  /**
   * @returns The copy content.
   */
  protected _renderCopy(): TemplateResult | string | void {
    const { _hasCopy: hasCopy, _handleSlotChange: handleSlotChange } = this;
    return html`
      <div ?hidden="${!hasCopy}" class="${prefix}--content-layout__copy">
        <slot name="copy" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * @returns The main content.
   */
  protected _renderInnerBody(): TemplateResult | string | void {
    // Note: The media content in `<dds-cta-section>` is not supported at the time of writing this code
    return html`
      ${this._renderActions()}${this._renderLinkList()}${this._renderContent()}
    `;
  }

  /**
   * @returns The link list content.
   */
  protected _renderLinkList(): TemplateResult | string | void {
    const { _hasLinkList: hasLinkList, _handleSlotChange: handleSlotChange } =
      this;
    return html`
      <div
        ?hidden="${!hasLinkList}"
        class="${prefix}--content-layout__link-list">
        <slot name="link-list" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--cta-block`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCTABlock;
