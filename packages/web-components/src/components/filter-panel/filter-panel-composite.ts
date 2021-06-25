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

@customElement(`${ddsPrefix}-filter-panel-composite`)
class DDSFilterPanelComposite extends HostListenerMixin(StableSelectorMixin(LitElement)) {
  /** host listener */
  @HostListener('document:eventContentStateChange')
  protected _handleContentStateChangeDocument = (event: CustomEvent) => {
    const { value } = event.detail;

    // TODO
    // whenever the input value is unselected, the value is empty, thus we cant delete it from the selections array
    // probably need a way to get that old value somehow to remove it properly

    if (!value) {
      this._selectedValues = this._selectedValues.filter(e => e !== value);

      if (!this._selectedValues.length) {
        this.shadowRoot!.querySelector('dds-filter-panel-modal')?.removeAttribute('has-selections');
      }
      return;
    }

    if (!this._selectedValues.includes(value)) {
      this._selectedValues.push(value);
    }

    // enables the clear button
    if (this._selectedValues) {
      this.shadowRoot!.querySelector('dds-filter-panel-modal')?.setAttribute('has-selections', '');
    }
  };

  /** host listener */
  @HostListener('document:eventCheckboxSelect')
  protected _handleCheckboxStateChange = (event: CustomEvent) => {
    const { value } = event.detail;

    // toggle checkbox state
    if ((event.target as HTMLElement).hasAttribute('checked')) {
      (event.target as HTMLElement).removeAttribute('checked');
      this._selectedValues = this._selectedValues.filter(e => e !== value);

      if (!this._selectedValues.length) {
        this.shadowRoot!.querySelector('dds-filter-panel-modal')?.removeAttribute('has-selections');
      }
      return;
    }

    if (!this._selectedValues.includes(value)) {
      this._selectedValues.push(value);
    }

    // enables the clear button
    if (this._selectedValues) {
      this.shadowRoot!.querySelector('dds-filter-panel-modal')?.setAttribute('has-selections', '');
    }
  };

  /** host listener */
  @HostListener('document:eventSelectionClear')
  protected _handleClearSelection = () => {
    this._selectedValues = [];

    this._contents.forEach(group => {
      group.querySelectorAll('dds-checkbox').forEach(e => {
        e.removeAttribute('checked');
      });
    });

    // handles the regular filter clear
    this.shadowRoot?.querySelectorAll('dds-checkbox').forEach(e => {
      e.removeAttribute('checked');
    });

    // disables the button
    this.shadowRoot!.querySelector('dds-filter-panel-modal')?.removeAttribute('has-selections');
  };

  /**
   * `true` to open the locale modal.
   */
  @property({ type: Boolean })
  openFilterModal = false;

  protected _openModal() {
    this.openFilterModal = true;
  }

  @property()
  _contents: any[] = [];

  @property()
  _selectedValues: string[] = [];

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

  protected _renderButton = gridBreakpoint < document.body.clientHeight;

  render() {
    return html`
      <button class="bx--filter-button" @click=${this._openModal}>
        <div class="${prefix}--filter__modal_button">Filter ${Filter()}</div>
      </button>

      <dds-filter-panel-modal title="Filter" ?open=${this.openFilterModal}>
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </dds-filter-panel-modal>

      <dds-filter-panel title="Filter">
        ${this._contents.map(e => {
          return html`
            ${unsafeHTML((e as HTMLElement).outerHTML)}
          `;
        })}
      </dds-filter-panel>
    `;
  }

  static get eventContentStateChange() {
    return `${ddsPrefix}-input-select`;
  }

  static get eventCheckboxSelect() {
    return `${ddsPrefix}-checkbox-select`;
  }

  static get eventSelectionClear() {
    return `${ddsPrefix}-selection-clear`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSFilterPanelComposite;
