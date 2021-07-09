/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, property, html } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import BXAccordionItem from 'carbon-web-components/es/components/accordion/accordion-item';
import { classMap } from 'lit-html/directives/class-map';
import './input_select';
import ChevronRight16 from 'carbon-web-components/es/icons/chevron--right/16';
import settings from 'carbon-components/es/globals/js/settings';
import Handle from '../../globals/internal/handle';
import { ACCORDION_ITEM_BREAKPOINT } from './defs';
import styles from './filter-panel.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

export { ACCORDION_ITEM_BREAKPOINT };

const { stablePrefix: ddsPrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Observes resize of the given element with the given resize observer.
 *
 * @param observer The resize observer.
 * @param elem The element to observe the resize.
 */
const observeResize = (observer: ResizeObserver, elem: Element) => {
  if (!elem) {
    return null;
  }
  observer.observe(elem);
  return {
    release() {
      observer.unobserve(elem);
      return null;
    },
  } as Handle;
};

@customElement(`${ddsPrefix}-filter-group-item`)
class DDSFilterGroupItem extends StableSelectorMixin(BXAccordionItem) {
  /**
   * The current breakpoint.
   */
  private _currentBreakpoint?: ACCORDION_ITEM_BREAKPOINT;

  /**
   * The handle for observing resize of the parent element of this element.
   */
  private _hObserveResize: Handle | null = null;

  /**
   * Handles user-initiated toggle request of this accordion item.
   *
   * @param open The new open state.
   */
  private _handleUserInitiatedToggle(open = !this.open) {
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        open,
      },
    };
    if (this.dispatchEvent(new CustomEvent((this.constructor as typeof BXAccordionItem).eventBeforeToggle, init))) {
      this.open = open;
      this.dispatchEvent(new CustomEvent((this.constructor as typeof BXAccordionItem).eventToggle, init));
    }
  }

  /**
   * Handler for the `click` event on the expando button.
   */
  private _handleClickExpando() {
    this._handleUserInitiatedToggle();
  }

  /**
   * Handler for the `keydown` event on the expando button.
   */
  private _handleKeydownExpando = ({ key }: KeyboardEvent) => {
    if (this.open && (key === 'Esc' || key === 'Escape')) {
      this._handleUserInitiatedToggle(false);
    }
  };

  /**
   * The `ResizeObserver` instance for observing element resizes for re-positioning floating menu position.
   */
  // TODO: Wait for `.d.ts` update to support `ResizeObserver`
  // @ts-ignore
  private _resizeObserver = new ResizeObserver((records: ResizeObserverEntry[]) => {
    const { width } = records[records.length - 1].contentRect;
    const { _sizesBreakpoints: sizesBreakpoints } = this.constructor as typeof BXAccordionItem;
    this._currentBreakpoint = Object.keys(sizesBreakpoints)
      .sort((lhs, rhs) => sizesBreakpoints[rhs] - sizesBreakpoints[lhs])
      .find(size => width >= sizesBreakpoints[size]) as ACCORDION_ITEM_BREAKPOINT;
    this.requestUpdate();
  });

  /**
   * `true` if the accordion item should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` if the accordion item should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * The title text.
   */
  @property({ attribute: 'title-text' })
  titleText = '';

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
    if (this._hObserveResize) {
      this._hObserveResize = this._hObserveResize.release();
    }
    this._hObserveResize = observeResize(this._resizeObserver, this);
  }

  disconnectedCallback() {
    if (this._hObserveResize) {
      this._hObserveResize = this._hObserveResize.release();
    }
  }

  render() {
    const {
      disabled,
      titleText,
      open,
      _currentBreakpoint: currentBreakpoint,
      _handleClickExpando: handleClickExpando,
      _handleKeydownExpando: handleKeydownExpando,
    } = this;
    const { _classesBreakpoints: classesBreakpoints } = this.constructor as typeof BXAccordionItem;
    const { [currentBreakpoint!]: classBreakpoint } = classesBreakpoints;
    const contentClasses = classMap({
      [classBreakpoint]: classBreakpoint,
      [`${prefix}--accordion__content`]: true,
    });
    return html`
      <button
        ?disabled="${disabled}"
        type="button"
        part="expando"
        class="${prefix}--accordion__heading"
        aria-controls="content"
        aria-expanded="${String(Boolean(open))}"
        @click="${handleClickExpando}"
        @keydown="${handleKeydownExpando}"
      >
        ${ChevronRight16({
          part: 'expando-icon',
          class: `${prefix}--accordion__arrow`,
        })}
        <div part="title" class="${prefix}--accordion__title"><slot name="title">${titleText}</slot></div>
      </button>
      <div id="content" part="content" class="${contentClasses}"><slot></slot></div>
    `;
  }

  /**
   * The CSS classes for breakpoints.
   *
   * @private
   */
  static get _classesBreakpoints() {
    return {
      [ACCORDION_ITEM_BREAKPOINT.SMALL]: `${prefix}-ce--accordion__content--${ACCORDION_ITEM_BREAKPOINT.SMALL}`,
      [ACCORDION_ITEM_BREAKPOINT.MEDIUM]: `${prefix}-ce--accordion__content--${ACCORDION_ITEM_BREAKPOINT.MEDIUM}`,
    };
  }

  /**
   * The breakpoints.
   *
   * @private
   */
  static get _sizesBreakpoints() {
    return {
      [ACCORDION_ITEM_BREAKPOINT.SMALL]: 480,
      [ACCORDION_ITEM_BREAKPOINT.MEDIUM]: 640,
    };
  }

  /**
   * The name of the custom event fired before this accordion item is being toggled upon a user gesture.
   * Cancellation of this event stops the user-initiated action of toggling this accordion item.
   *
   */
  static get eventBeforeToggle() {
    return `${prefix}-accordion-item-beingtoggled`;
  }

  /**
   * The name of the custom event fired after this accordion item is toggled upon a user gesture.
   *
   */
  static get eventToggle() {
    return `${prefix}-accordion-item-toggled`;
  }

  static styles = styles;
}

export default DDSFilterGroupItem;
