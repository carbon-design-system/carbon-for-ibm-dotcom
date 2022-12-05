/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map.js';
import {
  html,
  customElement,
  property,
  state,
  query,
  LitElement,
  TemplateResult,
  SVGTemplateResult,
} from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import on from 'carbon-components/es/globals/js/misc/on.js';
import { selectorTabbable } from '@carbon/carbon-web-components/es/globals/settings.js';
import HostListener from '@carbon/carbon-web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from '@carbon/carbon-web-components/es/globals/mixins/host-listener.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { EXPRESSIVE_MODAL_SIZE, EXPRESSIVE_MODAL_MODE } from './defs';
import DDSExpressiveModalCloseButton from './expressive-modal-close-button';
import styles from './expressive-modal.scss';
import DDSCarousel from '../carousel/carousel';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/* eslint-disable no-bitwise */
const PRECEDING =
  Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS;
const FOLLOWING =
  Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY;
const WITHIN = Node.DOCUMENT_POSITION_CONTAINED_BY;
/* eslint-enable no-bitwise */

/**
 * Tries to focus on the given elements and bails out if one of the is successful.
 *
 * @param elems The elements.
 * @param reverse `true` to go through the list in reverse order.
 * @param fallback element to focus on if none
 * @returns `true` if one of the attempts is successful, `false` otherwise.
 */
function tryFocusElems(
  elems: NodeListOf<HTMLElement> | [HTMLElement],
  reverse: boolean = false,
  fallback: HTMLElement | null = null
) {
  if (!reverse) {
    for (let i = 0; i < elems.length; ++i) {
      const elem = elems[i];
      if (
        elem.offsetWidth ||
        elem.offsetHeight ||
        elem.getClientRects().length
      ) {
        elem.focus();
        if ((elem.getRootNode() as Document).activeElement === elem) {
          return true;
        }
      }
    }
  } else {
    for (let i = elems.length - 1; i >= 0; --i) {
      const elem = elems[i];
      if (
        elem.offsetWidth ||
        elem.offsetHeight ||
        elem.getClientRects().length
      ) {
        elem.focus();
        if ((elem.getRootNode() as Document).activeElement === elem) {
          return true;
        }
      }
    }
  }
  fallback?.focus();
  return false;
}

// TODO: Wait for `.d.ts` update to support `ResizeObserver`
// @ts-ignore
const onResize: ResizeObserverCallback = ([entry]) => {
  const { target, contentRect } = entry;
  const { width, height } = contentRect;

  const modalContent = target as HTMLDivElement;

  modalContent.style.setProperty('--modal-vh', `${height}px`);
  modalContent.style.setProperty('--modal-vw', `${width}px`);
};

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
class DDSExpressiveModal extends StableSelectorMixin(
  HostListenerMixin(LitElement)
) {
  /**
   * `true` if there is a header content.
   */
  @state()
  private _hasHeader = false;

  /**
   * `true` if there is a body content.
   */
  @state()
  private _hasBody = false;

  /**
   * `true` if there is a footer content.
   */
  @state()
  private _hasFooter = false;

  /**
   * The element that had focus before this modal gets open.
   */
  private _launcher: Element | null = null;

  /**
   * Collection of elements to search for focusable elements.
   */
  hasFocusableElements: [DDSExpressiveModal | DDSCarousel] = [this];

  /**
   * Returns all focusable elements within this component and its shadowroot
   */
  get focusableElements() {
    const { selectorCloseButton, selectorTabbable: selectorTabbableForModal } =
      this.constructor as typeof DDSExpressiveModal;
    return [
      ...Array.from(
        (this.shadowRoot?.querySelectorAll(
          selectorCloseButton
        ) as NodeListOf<HTMLElement>) || []
      ),
      ...Array.from(
        this.querySelectorAll(
          selectorTabbableForModal
        ) as NodeListOf<HTMLElement>
      ),
    ];
  }

  private get _focusableElements() {
    const { hasFocusableElements } = this;

    const focusableElements: [HTMLElement?] = [];

    hasFocusableElements.forEach((el) => {
      if (el.focusableElements) {
        focusableElements.push(...el.focusableElements);
      }
    });

    return Array.from(new Set(focusableElements)).sort((a, b) => {
      const comparison = a!.compareDocumentPosition(b!);

      /* eslint-disable no-bitwise */
      if (comparison & PRECEDING) {
        return 1;
      }

      if (comparison & FOLLOWING) {
        return -1;
      }
      /* eslint-enable no-bitwise */

      return 0;
    });
  }

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

  @query(`.${prefix}--modal-content`)
  modalContent?: HTMLDivElement;

  @query(`.${ddsPrefix}-ce--modal__body`)
  modalBody?: HTMLDivElement;

  // TODO: Wait for `.d.ts` update to support `ResizeObserver`
  // @ts-ignore
  private _resizeObserver = new ResizeObserver(
    onResize as ResizeObserverCallback
  );

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

  /* eslint-disable no-bitwise */
  /**
   * Handles the `focusin` event on the start and end sentinels
   *
   * @param event The event.
   */
  private _handleFocusIn = ({ target, relatedTarget }) => {
    let focusFromWithin = false;
    if (target && relatedTarget) {
      const comparedToThis = this.compareDocumentPosition(relatedTarget);
      const comparedToShadowRoot =
        this.shadowRoot!.compareDocumentPosition(relatedTarget);
      // If relatedTarget is descendent of `this` or `this.shadowRoot`.
      if (comparedToThis & WITHIN || comparedToShadowRoot & WITHIN) {
        focusFromWithin = true;
      }
    }

    const {
      _endSentinelNode: endSentinelNode,
      _startSentinelNode: startSentinelNode,
      _focusableElements: focusableElements,
    } = this;

    if (focusFromWithin) {
      if (target === startSentinelNode) {
        tryFocusElems(focusableElements as [HTMLElement], true, this);
      } else if (target === endSentinelNode) {
        tryFocusElems(focusableElements as [HTMLElement], false, this);
      }
    } else {
      tryFocusElems(focusableElements as [HTMLElement], false, this);
    }
  };

  /**
   * Handles `focusout` event on this element.
   *
   * @param event The event.
   */
  @HostListener('focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocusOut = ({ target, relatedTarget }) => {
    // Don't attempt to wrap focus if the modal isn't open.
    if (!this.open) return;
    // If no target/relatedTarget, focus has entered/left the window. Do nothing.
    if (!target || !relatedTarget) return;

    const { _focusableElements: focusableElements } = this;

    // See if element gaining focus is inside `this` or `this.shadowRoot`.
    const positionToModal =
      this.compareDocumentPosition(relatedTarget) |
      (this.shadowRoot?.compareDocumentPosition(relatedTarget) || 0);
    const positionToPrevious = target.compareDocumentPosition(relatedTarget);
    const relatedTargetIsContained = Boolean(positionToModal & WITHIN);

    // If focusing outside of `this`, cycle focus
    if (!relatedTargetIsContained && !(relatedTarget === this)) {
      if (positionToPrevious & PRECEDING) {
        tryFocusElems(focusableElements as [HTMLElement], true, this);
      } else if (positionToPrevious & FOLLOWING) {
        tryFocusElems(focusableElements as [HTMLElement], false, this);
      }
    }
  };
  /* eslint-enable no-bitwise */

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
    if (
      (event.target as Element).matches(
        (this.constructor as typeof DDSExpressiveModal).selectorCloseButton
      )
    ) {
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
      .some(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
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
      const { eventBeforeClose, eventClose } = this
        .constructor as typeof DDSExpressiveModal;
      if (this.dispatchEvent(new CustomEvent(eventBeforeClose, init))) {
        this.open = false;
        this.dispatchEvent(new CustomEvent(eventClose, init));
      }
      this.setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * @param timeout The number of milliseconds as the longest time waiting for `transitionend` event.
   * @returns A promise that is resolves when `transitionend` on the host element fires.
   */
  private _waitForTransitionEnd(timeout: number = 1000) {
    return new Promise((resolve) => {
      let done = false;
      let hTransitionEnd;
      const handleResolve = () => {
        if (hTransitionEnd) {
          hTransitionEnd.release();
          hTransitionEnd = null;
        }
        if (!done) {
          resolve(undefined);
          done = true;
        }
      };
      on(this, 'transitionend', handleResolve);
      setTimeout(handleResolve, timeout);
    });
  }

  /**
   * @returns The header content.
   */
  protected _renderHeader(): TemplateResult | SVGTemplateResult | void {
    const {
      _hasHeader: hasHeader,
      _hasBody: hasBody,
      _hasFooter: hasFooter,
    } = this;
    const headerClasses = classMap({
      [`${ddsPrefix}-ce--modal__header--with-body`]:
        hasHeader && (hasBody || hasFooter),
    });
    return html`
      <div id="${ddsPrefix}--modal-header" class="${headerClasses}">
        <slot name="header"></slot>
      </div>
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
    return html` <div class="${bodyClasses}"><slot></slot></div> `;
  }

  /**
   * @returns The footer content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderFooter(): TemplateResult | SVGTemplateResult | void {
    return html` <div><slot name="footer"></slot></div> `;
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

  /**
   * The mode variant.
   */
  @property({ reflect: true, attribute: 'mode' })
  mode = EXPRESSIVE_MODAL_MODE.DEFAULT;

  render() {
    const {
      size,
      _handleClickContainer: handleClickContainer,
      _handleSlotChange: handleSlotChange,
      _handleFocusIn: handleFocusIn,
    } = this;
    const containerClass = this.containerClass
      .split(' ')
      .filter(Boolean)
      .reduce((acc, item) => ({ ...acc, [item]: true }), {});
    const containerClasses = classMap({
      [`${prefix}--modal-container`]: true,
      [`${prefix}--modal-container--fullwidth`]:
        size === EXPRESSIVE_MODAL_SIZE.FULL_WIDTH,
      ...containerClass,
    });
    return html`
      <button
        id="start-sentinel"
        class="${prefix}--visually-hidden"
        @focusin="${handleFocusIn}">
        START
      </button>
      <div
        class="${containerClasses}"
        tabindex="-1"
        role="dialog"
        aria-labelledby="${ddsPrefix}--modal-header"
        @click="${handleClickContainer}"
        @slotchange="${handleSlotChange}">
        <div class="${prefix}--modal-content">
          ${this._renderHeader()}${this._renderBody()}${this._renderFooter()}
        </div>
      </div>
      <button
        id="end-sentinel"
        class="${prefix}--visually-hidden"
        @focusin="${handleFocusIn}">
        END
      </button>
    `;
  }

  protected firstUpdated() {
    if (this.modalContent) {
      this._resizeObserver.observe(this.modalContent);
    }
  }

  async updated(changedProperties) {
    const { _focusableElements: focusableElements, size } = this;
    const { selectorCloseButton } = this
      .constructor as typeof DDSExpressiveModal;

    if (changedProperties.has('size')) {
      const closeButton = this.querySelector(selectorCloseButton);
      if (closeButton) {
        (closeButton as DDSExpressiveModalCloseButton).size = size;
      }
    }
    if (changedProperties.has('open')) {
      if (this.open) {
        this.ownerDocument.body.style.overflow = 'hidden';
        this.removeAttribute('aria-hidden');
        this._launcher = this.ownerDocument!.activeElement;
        const primaryFocusNode = this.querySelector(
          (this.constructor as typeof DDSExpressiveModal).selectorPrimaryFocus
        );
        await this._waitForTransitionEnd();
        if (primaryFocusNode) {
          // For cases where a `carbon-web-components` component (e.g. `<bx-btn>`) being `primaryFocusNode`,
          // where its first update/render cycle that makes it focusable happens after `<bx-modal>`'s first update/render cycle
          (primaryFocusNode as HTMLElement).focus();
        } else {
          tryFocusElems(focusableElements as [HTMLElement], true, this);
        }
      } else if (
        this._launcher &&
        typeof (this._launcher as HTMLElement).focus === 'function'
      ) {
        (this._launcher as HTMLElement).focus();
        this.ownerDocument.body.style.overflow = '';
        this._launcher = null;
      }
    }

    return super.updated(changedProperties);
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
      ${ddsPrefix}-button-expressive,
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
      ${ddsPrefix}-expressive-modal-footer ${ddsPrefix}-button-expressive[kind="primary"]
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

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSExpressiveModal;
