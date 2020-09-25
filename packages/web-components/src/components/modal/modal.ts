/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, customElement, property, internalProperty, TemplateResult, SVGTemplateResult } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import settings from 'carbon-components/es/globals/js/settings';
import BXModal from 'carbon-web-components/es/components/modal/modal.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './modal.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Expressive modal size.
 */
export enum DDS_MODAL_SIZE {
  /**
   * Regular size.
   */
  REGULAR = '',

  /**
   * One that takes full width.
   */
  FULL_WIDTH = 'full-width',
}

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  header: '_hasHeader',
  footer: '_hasFooter',
};

/**
 * Expressive modal.
 *
 * @element dds-modal
 * @fires dds-modal-beingclosed
 *   The custom event fired before this modal is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this modal.
 * @fires dds-modal-closed - The custom event fired after this modal is closed upon a user gesture.
 * @slot header - The header content.
 * @slot footer - The footer content.
 */
@customElement(`${ddsPrefix}-modal`)
class DDSModal extends StableSelectorMixin(BXModal) {
  /**
   * `true` if there is a header content.
   */
  @internalProperty()
  private _hasHeader = false;

  /**
   * `true` if there is a body content.
   */
  @internalProperty()
  private _hasBody = false;

  /**
   * `true` if there is a footer content.
   */
  @internalProperty()
  private _hasFooter = false;

  /**
   * Handles `click` event on the modal container.
   *
   * @param event The event.
   */
  private _handleClickContainerExpressive(event: MouseEvent) {
    if ((event.target as Element).matches((this.constructor as typeof DDSModal).selectorCloseButton)) {
      this._handleUserInitiatedCloseExpressive(event.target);
    }
  }

  /**
   * Handles `slotchange` event.
   */
  private _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this[slotExistencePropertyNames[name] || '_hasBody'] = hasContent;
  }

  /**
   * Handles user-initiated close request of this modal.
   *
   * @param triggeredBy The element that triggered this close request.
   */
  private _handleUserInitiatedCloseExpressive(triggeredBy: EventTarget | null) {
    if (this.open) {
      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          triggeredBy,
        },
      };
      const { eventBeforeClose, eventClose } = this.constructor as typeof DDSModal;
      if (this.dispatchEvent(new CustomEvent(eventBeforeClose, init))) {
        this.open = false;
        this.dispatchEvent(new CustomEvent(eventClose, init));
      }
    }
  }

  /**
   * @returns The header content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderHeader(): TemplateResult | SVGTemplateResult | void {
    const { _hasHeader: hasHeader, _hasBody: hasBody, _hasFooter: hasFooter } = this;
    const headerClasses = classMap({
      [`${ddsPrefix}-ce--modal__hedaer--with-body`]: hasHeader && (hasBody || hasFooter),
    });
    return html`
      <div class="${headerClasses}"><slot name="header"></slot></div>
    `;
  }

  /**
   * @returns The body content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderBody(): TemplateResult | SVGTemplateResult | void {
    const { _hasBody: hasBody, _hasFooter: hasFooter } = this;
    const bodyClasses = classMap({
      [`${ddsPrefix}-ce--modal__body`]: true,
      [`${ddsPrefix}-ce--modal__body--with-footer`]: hasBody && hasFooter,
    });
    return html`
      <div class="${bodyClasses}"><slot></slot></div>
    `;
  }

  /**
   * @returns The footer content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderFooter(): TemplateResult | SVGTemplateResult | void {
    return html`
      <div><slot name="footer"></slot></div>
    `;
  }

  /**
   * The size variant.
   */
  @property({ attribute: 'expressive-size' })
  expressiveSize = DDS_MODAL_SIZE.REGULAR;

  render() {
    const {
      expressiveSize,
      _handleClickContainerExpressive: handleClickContainerExpressive,
      _handleSlotChange: handleSlotChange,
    } = this;
    const containerClass = this.containerClass
      .split(' ')
      .filter(Boolean)
      .reduce((acc, item) => ({ ...acc, [item]: true }), {});
    const containerClasses = classMap({
      [`${prefix}--modal-container`]: true,
      [`${prefix}--modal-container--fullwidth`]: expressiveSize === DDS_MODAL_SIZE.FULL_WIDTH,
      ...containerClass,
    });
    return html`
      <a id="start-sentinel" class="${prefix}--visually-hidden" href="javascript:void 0" role="navigation"></a>
      <div
        role="dialog"
        class="${containerClasses}"
        tabindex="-1"
        @click="${handleClickContainerExpressive}"
        @slotchange="${handleSlotChange}"
      >
        <div class="bx--modal-content">
          ${this._renderHeader()}${this._renderBody()}${this._renderFooter()}
        </div>
      </div>
      <a id="end-sentinel" class="${prefix}--visually-hidden" href="javascript:void 0" role="navigation"></a>
    `;
  }

  /**
   * A selector selecting buttons that should close this modal.
   */
  static get selectorCloseButton() {
    return `[data-modal-close],${prefix}-modal-close-button,${ddsPrefix}-modal-close-button`;
  }

  /**
   * A selector selecting the nodes that should be focused when modal gets open.
   */
  static get selectorPrimaryFocus() {
    return `
      [data-modal-primary-focus],
      ${ddsPrefix}-modal-footer ${prefix}-btn[kind="primary"],
      ${ddsPrefix}-modal-footer ${ddsPrefix}-btn[kind="primary"]
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--expressive-modal`;
  }

  /**
   * The name of the custom event fired before this modal is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing this modal.
   */
  static get eventBeforeClose() {
    return `${ddsPrefix}-modal-beingclosed`;
  }

  /**
   * The name of the custom event fired after this modal is closed upon a user gesture.
   */
  static get eventClose() {
    return `${ddsPrefix}-modal-closed`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSModal;
