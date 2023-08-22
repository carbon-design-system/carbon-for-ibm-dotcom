/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, query } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import './filter-group';
import './filter-modal-button';
import './filter-modal-heading';
//import DDSExpressiveModal from '../../internal/vendor/@carbon/web-components/components/modal/modal.js';
import DDSExpressiveModal from '../expressive-modal/expressive-modal';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import './filter-modal-footer';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './filter-panel.scss';
import '../../internal/vendor/@carbon/web-components/components/checkbox/checkbox.js';
import '../../internal/vendor/@carbon/web-components/components/modal/modal-close-button.js';
import '../../internal/vendor/@carbon/web-components/components/modal/modal-header.js';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

const WITHIN = Node.DOCUMENT_POSITION_CONTAINED_BY;
const PRECEDING =
  Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS;
const FOLLOWING =
  Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY;

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

/**
 * Renders the filter panel modal
 *
 * @element dds-filter-panel-modal
 */
@customElement(`${ddsPrefix}-filter-panel-modal`)
class DDSFilterPanelModal extends HostListenerMixin(
  StableSelectorMixin(DDSExpressiveModal)
) {
  constructor(
    _startSentinelNode: HTMLAnchorElement,
    _endSentinelNode: HTMLAnchorElement
  ) {
    super();
  }

  /**
   * Renders the selected values.
   */
  @property()
  selectedValues: any[] = [];

  @query('#start-sentinel')
  private _startSentinelPanelModalNode!: HTMLAnchorElement;

  /**
   * Node to track focus going outside of modal content.
   */
  @query('#end-sentinel')
  private _endSentinelPanelModalNode!: HTMLAnchorElement;

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected _handleContentStateChange(_: CustomEvent) {}

  /**
   * Handles `click` event on the `<input>` in the shadow DOM.
   */
  protected _handleClear() {
    const { eventSelectionClear } = this
      .constructor as typeof DDSFilterPanelModal;
    this.dispatchEvent(
      new CustomEvent(eventSelectionClear, {
        bubbles: true,
        composed: true,
        detail: {
          clear: true,
        },
      })
    );
  }

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

  private get _focusablePanelModalElements() {
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

  private _handlePanelModalFocusIn = ({ target, relatedTarget }) => {
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
      _endSentinelPanelModalNode: endSentinelNode,
      _startSentinelPanelModalNode: startSentinelNode,
      _focusablePanelModalElements: focusableElements,
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
   * Handles items in the selected array
   */
  @property({ attribute: 'has-selections', type: Boolean })
  hasSelections = false;

  /**
   * Renders the filter heading
   */
  @property()
  heading!: string;

  /**
   * Handles user-initiated close request of this modal.
   *
   * @param triggeredBy The element that triggered this close request.
   */
  protected _handleUserClose(triggeredBy: EventTarget | null) {
    if (this.open) {
      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          triggeredBy,
        },
      };
      if (
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof DDSExpressiveModal).eventBeforeClose,
            init
          )
        )
      ) {
        this.open = false;
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof DDSExpressiveModal).eventClose,
            init
          )
        );
      }
    }
  }

  render() {
    const { _handlePanelModalFocusIn: handleFocusIn } = this;

    return html`
      <button
        id="start-sentinel"
        class="${prefix}--visually-hidden"
        @focusin="${handleFocusIn}">
        START
      </button>
      <section class="${prefix}--filter-panel__section bx--modal-container">
        <bx-modal-header>
          <bx-modal-close-button
            @click=${this._handleUserClose}></bx-modal-close-button>
          <dds-filter-modal-heading>${this.heading}</dds-filter-modal-heading>
        </bx-modal-header>
        <div class="${prefix}--modal-body"><slot></slot></div>
        <dds-filter-modal-footer>
          <dds-filter-modal-footer-button
            ?disabled="${!this.hasSelections}"
            @click=${this._handleClear}
            kind="tertiary"
            >Clear</dds-filter-modal-footer-button
          >
          <dds-filter-modal-footer-button
            @click=${this._handleUserClose}
            kind="primary"
            >See Results</dds-filter-modal-footer-button
          >
        </dds-filter-modal-footer>
      </section>
      <button
        id="end-sentinel"
        class="${prefix}--visually-hidden"
        @focusin="${handleFocusIn}">
        END
      </button>
    `;
  }

  /**
   * The name of the custom event fired upon the modal being closed
   */
  static get eventBeforeClose() {
    return `${prefix}-modal-beingclosed`;
  }

  /**
   * The name of the custom event captured upon cleared selections
   */

  static get eventSelectionClear() {
    return `${ddsPrefix}-selection-clear`;
  }

  /**
   * The name of the heading selector
   */

  static get selectorHeading() {
    return `${ddsPrefix}-filter-panel-heading`;
  }

  static get stableSelector() {
    return `${ddsPrefix}-filter-panel-modal`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSFilterPanelModal;
