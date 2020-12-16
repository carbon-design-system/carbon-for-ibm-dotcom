/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import {
  html,
  customElement,
  property,
  internalProperty,
  query,
  LitElement,
  TemplateResult,
  SVGTemplateResult,
} from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import { selectorTabbable } from 'carbon-web-components/es/globals/settings.js';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { EXPRESSIVE_MODAL_SIZE } from './defs';
import DDSExpressiveModalCloseButton from './expressive-modal-close-button';
import styles from './expressive-modal.scss';

export { EXPRESSIVE_MODAL_SIZE };

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

// eslint-disable-next-line no-bitwise
const PRECEDING = Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS;
// eslint-disable-next-line no-bitwise
const FOLLOWING = Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY;

/**
 * Tries to focus on the given elements and bails out if one of the is successful.
 *
 * @param elems The elements.
 * @param reverse `true` to go through the list in reverse order.
 * @returns `true` if one of the attempts is successful, `false` otherwise.
 */
function tryFocusElems(elems: NodeListOf<HTMLElement>, reverse: boolean = false) {
  if (!reverse) {
    for (let i = 0; i < elems.length; ++i) {
      const elem = elems[i];
      elem.focus();
      if (elem.ownerDocument!.activeElement === elem) {
        return true;
      }
    }
  } else {
    for (let i = elems.length - 1; i >= 0; --i) {
      const elem = elems[i];
      elem.focus();
      if (elem.ownerDocument!.activeElement === elem) {
        return true;
      }
    }
  }
  return false;
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
 * @element dds-expressive-modal
 * @fires dds-expressive-modal-beingclosed
 *   The custom event fired before this modal is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this modal.
 * @fires dds-expressive-modal-closed - The custom event fired after this modal is closed upon a user gesture.
 * @slot header - The header content.
 * @slot footer - The footer content.
 */
@customElement(`${ddsPrefix}-expressive-modal`)
class DDSExpressiveModal extends StableSelectorMixin(HostListenerMixin(LitElement)) {
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
   * The element that had focus before this modal gets open.
   */
  private _launcher: Element | null = null;

  /**
   * Node to track focus going outside of modal content.
   */
  @query('#start-sentinel')
  private _startSentinelNode!: HTMLAnchorElement;

  /**
   * Node to track focus going outside of modal content.
   */
  @query('#end-sentinel')
  private _endSentinelNode!: HTMLAnchorElement;

  /**
   * Handles `click` event on this element.
   *
   * @param event The event.
   */
  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = (event: MouseEvent) => {
    if (event.composedPath().indexOf(this.shadowRoot!) < 0) {
      this._handleUserInitiatedClose(event.target);
    }
  };

  /**
   * Handles `blur` event on this element.
   *
   * @param event The event.
   */
  @HostListener('shadowRoot:focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleBlur = async ({ target, relatedTarget }: FocusEvent) => {
    const oldContains = target !== this && this.contains(target as Node);
    const currentContains = relatedTarget !== this && this.contains(relatedTarget as Node);

    // Performs focus wrapping if _all_ of the following is met:
    // * This modal is open
    // * The viewport still has focus
    // * Modal body used to have focus but no longer has focus
    const { open, _startSentinelNode: startSentinelNode, _endSentinelNode: endSentinelNode } = this;
    const { selectorTabbable: selectorTabbableForModal } = this.constructor as typeof DDSExpressiveModal;
    if (open && relatedTarget && oldContains && !currentContains) {
      const comparisonResult = (target as Node).compareDocumentPosition(relatedTarget as Node);
      // eslint-disable-next-line no-bitwise
      if (relatedTarget === startSentinelNode || comparisonResult & PRECEDING) {
        await (this.constructor as typeof DDSExpressiveModal)._delay();
        if (!tryFocusElems(this.querySelectorAll(selectorTabbableForModal), true) && relatedTarget !== this) {
          this.focus();
        }
      }
      // eslint-disable-next-line no-bitwise
      else if (relatedTarget === endSentinelNode || comparisonResult & FOLLOWING) {
        await (this.constructor as typeof DDSExpressiveModal)._delay();
        if (!tryFocusElems(this.querySelectorAll(selectorTabbableForModal))) {
          this.focus();
        }
      }
    }
  };

  @HostListener('document:keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = ({ key, target }: KeyboardEvent) => {
    if (key === 'Esc' || key === 'Escape') {
      this._handleUserInitiatedClose(target);
    }
  };

  /**
   * Handles `click` event on the modal container.
   *
   * @param event The event.
   */
  private _handleClickContainer(event: MouseEvent) {
    if ((event.target as Element).matches((this.constructor as typeof DDSExpressiveModal).selectorCloseButton)) {
      this._handleUserInitiatedClose(event.target);
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
  private _handleUserInitiatedClose(triggeredBy: EventTarget | null) {
    if (this.open) {
      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          triggeredBy,
        },
      };
      const { eventBeforeClose, eventClose } = this.constructor as typeof DDSExpressiveModal;
      if (this.dispatchEvent(new CustomEvent(eventBeforeClose, init))) {
        this.open = false;
        this.dispatchEvent(new CustomEvent(eventClose, init));
      }
    }
  }

  /**
   * @returns The header content.
   */
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
   * The additional CSS class names for the container <div> of the element.
   */
  @property({ attribute: 'container-class' })
  containerClass = '';

  /**
   * `true` if the modal should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * The size variant.
   */
  @property({ reflect: true, attribute: 'expressive-size' })
  size = EXPRESSIVE_MODAL_SIZE.REGULAR;

  render() {
    const { size, _handleClickContainer: handleClickContainer, _handleSlotChange: handleSlotChange } = this;
    const containerClass = this.containerClass
      .split(' ')
      .filter(Boolean)
      .reduce((acc, item) => ({ ...acc, [item]: true }), {});
    const containerClasses = classMap({
      [`${prefix}--modal-container`]: true,
      [`${prefix}--modal-container--fullwidth`]: size === EXPRESSIVE_MODAL_SIZE.FULL_WIDTH,
      ...containerClass,
    });
    return html`
      <a id="start-sentinel" class="${prefix}--visually-hidden" href="javascript:void 0" role="navigation"></a>
      <div
        role="dialog"
        class="${containerClasses}"
        tabindex="-1"
        @click="${handleClickContainer}"
        @slotchange="${handleSlotChange}"
      >
        <div class="bx--modal-content">
          ${this._renderHeader()}${this._renderBody()}${this._renderFooter()}
        </div>
      </div>
      <a id="end-sentinel" class="${prefix}--visually-hidden" href="javascript:void 0" role="navigation"></a>
    `;
  }

  async updated(changedProperties) {
    if (changedProperties.has('size')) {
      const { selectorCloseButton } = this.constructor as typeof DDSExpressiveModal;
      const { size } = this;
      const closeButton = this.querySelector(selectorCloseButton);
      if (closeButton) {
        (closeButton as DDSExpressiveModalCloseButton).size = size;
      }
    }
    if (changedProperties.has('open')) {
      if (this.open) {
        this._launcher = this.ownerDocument!.activeElement;
        const primaryFocusNode = this.querySelector((this.constructor as typeof DDSExpressiveModal).selectorPrimaryFocus);
        await (this.constructor as typeof DDSExpressiveModal)._delay();
        if (primaryFocusNode) {
          // For cases where a `carbon-web-components` component (e.g. `<bx-btn>`) being `primaryFocusNode`,
          // where its first update/render cycle that makes it focusable happens after `<bx-modal>`'s first update/render cycle
          (primaryFocusNode as HTMLElement).focus();
        } else if (
          !tryFocusElems(this.querySelectorAll((this.constructor as typeof DDSExpressiveModal).selectorTabbable), true)
        ) {
          this.focus();
        }
      } else if (this._launcher && typeof (this._launcher as HTMLElement).focus === 'function') {
        (this._launcher as HTMLElement).focus();
        this._launcher = null;
      }
    }
    return super.updated(changedProperties);
  }

  /**
   * @param ms The number of milliseconds.
   * @returns A promise that is resolves after the given milliseconds.
   */
  private static _delay(ms: number = 0) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * A selector selecting buttons that should close this modal.
   */
  static get selectorCloseButton() {
    return `[data-modal-close],${prefix}-modal-close-button,${ddsPrefix}-expressive-modal-close-button`;
  }

  /**
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable() {
    return `
      ${selectorTabbable},
      ${ddsPrefix}-expressive-modal,
      ${ddsPrefix}-expressive-modal-close-button
    `;
  }

  /**
   * A selector selecting the nodes that should be focused when modal gets open.
   */
  static get selectorPrimaryFocus() {
    return `
      [data-modal-primary-focus],
      ${ddsPrefix}-expressive-modal-footer ${prefix}-btn[kind="primary"],
      ${ddsPrefix}-expressive-modal-footer ${ddsPrefix}-btn[kind="primary"]
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
    return `${ddsPrefix}-expressive-modal-beingclosed`;
  }

  /**
   * The name of the custom event fired after this modal is closed upon a user gesture.
   */
  static get eventClose() {
    return `${ddsPrefix}-expressive-modal-closed`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSExpressiveModal;
