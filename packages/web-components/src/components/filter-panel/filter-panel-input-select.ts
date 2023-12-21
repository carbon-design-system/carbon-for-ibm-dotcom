/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import Close from '../../internal/vendor/@carbon/web-components/icons/close/16.js';
import FocusMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/focus.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './filter-panel.scss?lit';
import C4DFilterPanelInputSelectItem from './filter-panel-input-select-item';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * The container of the input select.
 *
 * @element c4d-filter-panel-input-select
 */
@customElement(`${c4dPrefix}-filter-panel-input-select`)
class C4DFilterPanelInputSelect extends FocusMixin(
  StableSelectorMixin(LitElement)
) {
  @property()
  ariaLabel = '';

  /**
   * Sets the input selected dropdown to closed
   */
  @property({ attribute: 'is-open', type: Boolean, reflect: true })
  isOpen = false;

  /**
   * sets the title value to a string
   */
  @property()
  title!: string;

  /**
   * sets the selected value attribute to selected
   */
  @property({ attribute: 'selected', type: Boolean, reflect: true })
  selected = false;

  /**
   * property for setting the value to a string
   */
  @property()
  value = '';

  /**
   * targets the last selected item
   */
  @property()
  lastValue: any;

  static get selectorItem() {
    return `${c4dPrefix}-filter-panel-input-select-item`;
  }

  /**
   *
   * @param event sets the selected value attribute to selected and removes the attribute from the 'lastvalue'
   * @private
   */
  protected _handleClickInner(event) {
    const { eventContentStateChange } = this
      .constructor as typeof C4DFilterPanelInputSelect;
    const selected = (event.target as Element).closest(
      (this.constructor as typeof C4DFilterPanelInputSelect).selectorItem
    ) as C4DFilterPanelInputSelectItem;
    if (selected.hasAttribute('selected')) {
      selected.removeAttribute('selected');
    } else {
      if (this.lastValue) {
        this.lastValue.removeAttribute('selected');
      }
      this.selected = false;
      this.removeAttribute('selected');
      selected.setAttribute('selected', '');
    }

    this.dispatchEvent(
      new CustomEvent(eventContentStateChange, {
        bubbles: true,
        composed: true,
        detail: {
          value: selected.getAttribute('value'),
          lastValue: this.lastValue ? this.lastValue.getAttribute('value') : '',
          headerValue: this.headerValue,
        },
      })
    );
    this.lastValue = selected;
  }

  /**
   * Ensures the click header handler gets called upon clicking enter if focused.
   *
   * @param event captures the inputed key
   * @param event.key The event key.
   * @private
   */
  private _handleKeydown = ({ key }: KeyboardEvent) => {
    if (key === 'Enter') {
      this._handleClickHeader();
    }
  };

  /**
   * Ensures the click inner handler gets called upon clicking enter if focused.
   *
   * @param event captures the inputed key
   * @private
   */
  private _handleKeydownInner = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this._handleClickInner(event);
    }
  };

  /**
   * sets the input select items to an array
   */
  @property()
  _items: any[] = [];

  /**
   * sets header-value attribute to the input selected header
   */
  @property({ attribute: 'header-value' })
  headerValue = '';

  /**
   * Toggles the input select dropdown and sets the header to selected and sets the value
   *
   * @private
   */
  protected _handleClickHeader() {
    const { eventInputSelect } = this
      .constructor as typeof C4DFilterPanelInputSelect;
    this.isOpen = !this.isOpen;
    this.selected = !this.selected;
    this.dispatchEvent(
      new CustomEvent(eventInputSelect, {
        bubbles: true,
        composed: true,
        detail: {
          headerValue: this.headerValue,
        },
      })
    );
  }

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   * @param event.target The event target.
   */
  protected _handleSlotChange({ target }: Event) {
    this._items = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
  }

  updated(changedProperties) {
    if (changedProperties.has('selected')) {
      this.ariaLabel = `${this.title}, ${
        this.selected ? 'selected' : 'unselected'
      }`;
    }
    if (this._items.length) {
      this.shadowRoot
        ?.querySelector(`.${prefix}--input-container__heading`)
        ?.setAttribute('aria-expanded', String(Boolean(this.isOpen)));
    }
    if (this._items.length) {
      this.shadowRoot
        ?.querySelector(`.${prefix}--input-container__heading`)
        ?.setAttribute('aria-expanded', String(Boolean(this.isOpen)));
    }
  }

  render() {
    const { title } = this;
    return html`
      <div class="${prefix}--input-container">
        <div
          class="${prefix}--input-container__heading"
          tabindex="1"
          @click=${this._handleClickHeader}
          @keydown=${this._handleKeydown}
          aria-controls="content"
          aria-label="${this.ariaLabel}"
          role="button">
          ${title}
          <div class="${prefix}--close__icon">
            ${this.selected && this.isOpen ? Close() : null}
          </div>
        </div>
        <ul
          id="content"
          @click=${this._handleClickInner}
          @keydown=${this._handleKeydownInner}
          class="${this.isOpen
            ? ''
            : `${prefix}--selected-option-dropdown__hidden`} ${prefix}--selected-option-dropdown">
          <slot @slotchange="${this._handleSlotChange}"></slot>
        </ul>
      </div>
    `;
  }

  /**
   * The name of the custom event fired upon selecting the title
   */
  static get eventInputSelect() {
    return `${c4dPrefix}-filter-panel-input-select-title`;
  }

  /**
   * The name of the custom event fired after the search content is changed upon a user gesture.
   */
  static get eventContentStateChange() {
    return `${c4dPrefix}-filter-panel-input-select`;
  }

  static get stableSelector() {
    return `${c4dPrefix}-filter-panel-input-select`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DFilterPanelInputSelect;
