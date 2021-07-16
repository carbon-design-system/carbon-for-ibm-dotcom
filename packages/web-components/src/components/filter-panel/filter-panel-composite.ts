/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, LitElement, property } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import settings from 'carbon-components/es/globals/js/settings';
import Filter from 'carbon-web-components/es/icons/filter/16';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';
import './filter-group';
import { baseFontSize, breakpoints } from '@carbon/layout';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './filter-panel.scss';
import 'carbon-web-components/es/components/checkbox/checkbox';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;
const gridBreakpoint = parseFloat(breakpoints.md.width) * baseFontSize;

/**
 * Filter panel composite
 *
 * @element Filter panel composite
 */
@customElement(`${ddsPrefix}-filter-panel-composite`)
class DDSFilterPanelComposite extends HostListenerMixin(StableSelectorMixin(LitElement)) {
  /** host listener */
  /**
   * Event to filter selected values in the modal and add the 'has-selections' attribute
   *
   * @param event content state change
   * @private
   */
  @HostListener('document:eventContentStateChange')
  protected _handleContentStateChangeDocument = (event: CustomEvent) => {
    const { value, lastValue, headerValue } = event.detail;

    // remove the DDSInputSelect (header) value from list to add an inner child instead
    this._selectedValues = this._selectedValues.filter(e => e !== headerValue);

    if (!value) {
      this._selectedValues = this._selectedValues.filter(e => e !== value);

      if (!this._selectedValues.length) {
        this.shadowRoot!.querySelector('dds-filter-panel-modal')?.removeAttribute('has-selections');
        this.shadowRoot!.querySelector('dds-filter-panel')?.removeAttribute('has-selections');
      }
      return;
    }

    if (!this._selectedValues.includes(value)) {
      this._selectedValues.push(value);
    }

    if (lastValue && this._selectedValues.includes(lastValue)) {
      this._selectedValues = this._selectedValues.filter(e => e !== lastValue);
    }
    // enables the clear button
    if (this._selectedValues) {
      this.shadowRoot!.querySelector('dds-filter-panel-modal')?.setAttribute('has-selections', '');
      this.shadowRoot!.querySelector('dds-filter-panel')?.setAttribute('has-selections', '');
    }
    this.renderStatus();
  };

  /** host listener */
  /**
   * Host listener for handling the statechange when a checkbox is selected
   *
   * @param event checkbox select event
   * @private
   */
  @HostListener('document:eventCheckboxSelect')
  protected _handleCheckboxStateChange = (event: CustomEvent) => {
    const { value } = event.detail;

    // toggle checkbox in filter panel modal
    this.querySelectorAll('dds-filter-panel-checkbox').forEach(e => {
      if (e.getAttribute('value') === value) {
        e.toggleAttribute('checked');
        e.closest('dds-filter-group-item')?.setAttribute('open', '');
      }
    });

    // toggle value in list
    if (!this._selectedValues.includes(value)) {
      this._selectedValues.push(value);
    } else {
      this._selectedValues = this._selectedValues.filter(e => e !== value);
    }

    // shows clear button depending on the list's length
    if (!this._selectedValues.length) {
      this.shadowRoot!.querySelector('dds-filter-panel-modal')?.removeAttribute('has-selections');
      this.shadowRoot!.querySelector('dds-filter-panel')?.removeAttribute('has-selections');
    } else {
      this.shadowRoot!.querySelector('dds-filter-panel-modal')?.setAttribute('has-selections', '');
      this.shadowRoot!.querySelector('dds-filter-panel')?.setAttribute('has-selections', '');
    }

    this.renderStatus();
  };

  /**
   * handles modal close event
   */
  @HostListener('document:eventModalClose')
  protected modalCloseEvent = () => {
    this.openFilterModal = false;
  };

  /** host listener for input select header */
  /**
   * Handles the Filter title state changing
   *
   * @param event title state change
   * @private
   */
  @HostListener('document:eventTitleChange')
  protected _handleTitleStateChange = (event: CustomEvent) => {
    const { headerValue } = event.detail;

    // toggle checkbox in filter panel modal
    this.querySelectorAll('dds-filter-panel-input-select').forEach(e => {
      // capture the element counterpart in Filter Panel Modal
      if (e.getAttribute('header-value') === headerValue) {
        const currentGroup = e.closest('dds-filter-group-item');
        currentGroup?.setAttribute('open', '');

        // Clears all other sibling items in the Filter Group
        currentGroup?.querySelectorAll('dds-filter-panel-input-select').forEach(inputSelect => {
          if (inputSelect === e) return;
          this._selectedValues = this._selectedValues.filter(str => str !== inputSelect.getAttribute('header-value'));
          inputSelect.removeAttribute('selected');
          inputSelect.removeAttribute('is-open');
        });

        e.toggleAttribute('selected');
        e.toggleAttribute('is-open');
      }
    });

    // toggle value in list
    if (!this._selectedValues.includes(headerValue)) {
      this._selectedValues.push(headerValue);
    } else {
      this._selectedValues = this._selectedValues.filter(e => e !== headerValue);
    }

    if (!this._selectedValues.length) {
      this.shadowRoot!.querySelector('dds-filter-panel-modal')?.removeAttribute('has-selections');
      this.shadowRoot!.querySelector('dds-filter-panel')?.removeAttribute('has-selections');
    }

    // enables the clear button
    if (this._selectedValues.length > 0) {
      this.shadowRoot!.querySelector('dds-filter-panel-modal')?.setAttribute('has-selections', '');
      this.shadowRoot!.querySelector('dds-filter-panel')?.setAttribute('has-selections', '');
    }
    this.renderStatus();
  };

  static get selectorInputSelect() {
    return `${ddsPrefix}-filter-panel-input-select`;
  }

  /**
   * selected value property
   */
  @property({ type: String, reflect: true })
  selectValue = '';

  /** host listener */
  /**
   * Event handler for the clearing functionality
   *
   * @private
   */
  @HostListener('document:eventSelectionClear')
  protected _handleClearSelection = () => {
    this._selectedValues = [];

    // handles clear when clearing from the static filter panel model
    this._contents.forEach(group => {
      group.querySelectorAll('dds-filter-panel-checkbox').forEach(e => {
        e.removeAttribute('checked');
      });
      group.querySelectorAll('dds-filter-panel-input-select-item').forEach(e => {
        e.removeAttribute('selected');
        e.removeAttribute('is-open');
      });
      group.querySelectorAll('dds-filter-panel-input-select').forEach(e => {
        e.removeAttribute('selected');
        e.removeAttribute('is-open');
      });
    });

    // handles clear when clearing from the filter panel static
    this.shadowRoot?.querySelectorAll('dds-filter-panel-checkbox').forEach(e => {
      e.removeAttribute('checked');
    });
    this.shadowRoot?.querySelectorAll('dds-filter-panel-input-select-item').forEach(e => {
      e.removeAttribute('selected');
      e.removeAttribute('is-open');
    });
    this.shadowRoot?.querySelectorAll('dds-filter-panel-input-select').forEach(e => {
      e.removeAttribute('selected');
      e.removeAttribute('is-open');
    });

    // disables the button
    this.shadowRoot!.querySelector('dds-filter-panel-modal')?.removeAttribute('has-selections');
    this.shadowRoot!.querySelector('dds-filter-panel')?.removeAttribute('has-selections');

    this.renderStatus();
  };

  /**
   * `true` to open the locale modal.
   */
  @property({ type: Boolean })
  openFilterModal = false;

  /**
   * Sets the open modal to true
   *
   * @private
   */
  protected _openModal() {
    this.openFilterModal = true;
  }

  /**
   *
   */
  @property()
  _contents: any[] = [];

  /**
   * sets the array for the filter button title
   */
  @property()
  _title: any[] = [];

  /**
   * sets the selected values into an array
   */
  @property()
  _selectedValues: string[] = [];

  /**
   * sets the filter button title
   */
  @property()
  _filterButtonTitle: string = '';

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleSlotChange({ target }: Event) {
    this._contents = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
  }

  protected renderStatus() {
    this._filterButtonTitle = `Filter ${this._selectedValues.length > 0 ? `(${this._selectedValues.length})` : ''}`;
  }

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleTitleSlotChange({ target }: Event) {
    this._title = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this._filterButtonTitle = this._title[0].innerText;
  }

  protected _renderButton = gridBreakpoint < document.body.clientHeight;

  render() {
    return html`
      <button class="bx--filter-button" @click=${this._openModal}>
        <div class="${prefix}--filter__modal__button">${this._filterButtonTitle} ${Filter()}</div>
      </button>

      <dds-filter-panel-modal ?open=${this.openFilterModal} heading="${this._filterButtonTitle}">
        <slot name="heading" @slotchange="${this._handleTitleSlotChange}"></slot>
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </dds-filter-panel-modal>

      <dds-filter-panel>
        ${this._title.map(e => {
          return html`
            ${unsafeHTML((e as HTMLElement).outerHTML)}
          `;
        })}
        ${this._contents.map(e => {
          return html`
            ${unsafeHTML((e as HTMLElement).outerHTML)}
          `;
        })}
      </dds-filter-panel>
    `;
  }

  static get eventContentStateChange() {
    return `${ddsPrefix}-filter-panel-input-select`;
  }

  static get eventTitleChange() {
    return `${ddsPrefix}-filter-panel-input-select-title`;
  }

  static get eventCheckboxSelect() {
    return `${ddsPrefix}-checkbox-select`;
  }

  static get eventSelectionClear() {
    return `${ddsPrefix}-selection-clear`;
  }

  static get eventModalClose() {
    return `${prefix}-modal-beingclosed`;
  }

  static get stableSelector() {
    return `${ddsPrefix}-filter-panel-composite`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSFilterPanelComposite;
