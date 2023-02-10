/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import Close from '../../internal/vendor/@carbon/web-components/icons/close/16.js';
import FocusMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/focus.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './filter-panel.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The input select inner dropdown.
 *
 * @element dds-filter-panel-input-select-item
 */
@customElement(`${ddsPrefix}-filter-panel-input-select-item`)
class DDSFilterPanelInputSelectItem extends FocusMixin(
  StableSelectorMixin(LitElement)
) {
  /**
   * Property for the input select item value
   */
  @property()
  _title: string = '';

  /**
   * sets the input select dropdown to unselected
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleSlotChange({ target }: Event) {
    this._title = (target as HTMLSlotElement).assignedNodes()[0]
      .textContent as string;

    this.setAttribute(
      'aria-label',
      `${this._title}, ${this.selected ? 'selected' : 'unselected'}`
    );
  }

  connectedCallback() {
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('selected')) {
      this.setAttribute('aria-selected', `${String(Boolean(this.selected))}`);
      this.setAttribute(
        'aria-label',
        `${this._title}, ${this.selected ? 'selected' : 'unselected'}`
      );
    }
  }

  render() {
    return html`
      <slot @slotchange=${this._handleSlotChange}></slot>
      <div class="${prefix}--close__icon">
        ${this.selected ? Close() : null}
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}-filter-panel-input-select-item`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSFilterPanelInputSelectItem;
