/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import Filter from '../../internal/vendor/@carbon/web-components/icons/filter/16.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import { baseFontSize, breakpoints } from '@carbon/layout';
import './filter-group';
import './filter-panel';
import './filter-panel-modal';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './filter-panel.scss';
import '../../internal/vendor/@carbon/web-components/components/checkbox/checkbox.js';
import C4DFilterGroupItem from './filter-group-item';
import C4DFilterPanelCheckbox from './filter-panel-checkbox';
import C4DFilterPanelInputSelect from './filter-panel-input-select';
import C4DFilterPanelInputSelectItem from './filter-panel-input-select-item';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

const breakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;

/**
 * Filter panel composite
 *
 * @element c4d-filter-panel-composite
 */
@customElement(`${c4dPrefix}-filter-panel-composite`)
class C4DFilterPanelComposite extends HostListenerMixin(
  StableSelectorMixin(LitElement)
) {
  /**
   * Host listener for handling the state change when a input select item is selected.
   *
   * @param event content state change
   * @private
   */
  @HostListener('document:eventInputSelectItem')
  protected _handleInputSelectItemStateChange = (event: CustomEvent) => {
    const { value, lastValue, headerValue } = event.detail;

    const { stableSelector } = C4DFilterPanelInputSelectItem;
    this._focusElement = `${stableSelector}[value="${value}"]`;

    // remove the C4DInputSelect (header) value from list to add an inner child instead
    this._selectedValues = this._selectedValues.filter(
      (e) => e !== headerValue
    );

    if (!value) {
      this._selectedValues = this._selectedValues.filter((e) => e !== value);
      return;
    }

    if (!this._selectedValues.includes(value)) {
      this._selectedValues.push(value);
    }

    if (lastValue && this._selectedValues.includes(lastValue)) {
      this._selectedValues = this._selectedValues.filter(
        (e) => e !== lastValue
      );
    }
    this.renderStatus();
  };

  /**
   * Host listener for handling the state change when a checkbox is selected.
   *
   * @param event checkbox select event
   * @private
   */
  @HostListener('document:eventCheckboxSelect')
  protected _handleCheckboxStateChange = (event: CustomEvent) => {
    const { value } = event.detail;

    // toggle checkbox in filter panel modal
    this.querySelectorAll(`${c4dPrefix}-filter-panel-checkbox`).forEach((e) => {
      if (e.getAttribute('value') === value) {
        e.toggleAttribute('checked');
        e.closest(`${c4dPrefix}-filter-group-item`)?.setAttribute('open', '');

        const { stableSelector } = C4DFilterPanelCheckbox;
        this._focusElement = `${stableSelector}[value="${value}"]`;
      }
    });

    const filterGroupItems = this.querySelectorAll(
      `${c4dPrefix}-filter-group-item`
    );
    this.shadowRoot
      ?.querySelectorAll(`${c4dPrefix}-filter-group-item`)
      .forEach((filterGroupItem, index) => {
        if ((filterGroupItem as C4DFilterGroupItem).open) {
          (filterGroupItems[index] as C4DFilterGroupItem).open = true;
        }
      });

    // toggle value in list
    if (!this._selectedValues.includes(value)) {
      this._selectedValues.push(value);
    } else {
      this._selectedValues = this._selectedValues.filter((e) => e !== value);
    }

    this.renderStatus();
  };

  /**
   * Host listener for caching filter group items' view all states.
   *
   * @param event filter group item view all toggle event
   * @private
   */
  @HostListener('document:eventFilterGroupViewAllToggle')
  protected _handleFilterGroupViewAllToggle = (event: CustomEvent) => {
    const match = this._filterGroupsAllRevealed.findIndex((entry) => {
      return entry.id === event.detail.id;
    });

    if (match !== -1) {
      this._filterGroupsAllRevealed[match].value = event.detail.value;
    } else {
      this._filterGroupsAllRevealed.push(event.detail);
    }
  };

  /**
   * handles modal close event
   */
  @HostListener('document:eventModalClose')
  protected modalCloseEvent = () => {
    this.openFilterModal = false;
  };

  /**
   * Handles the state change when an input select is selected.
   *
   * @param event title state change
   * @private
   */
  @HostListener('document:eventInputSelect')
  protected _handleInputSelectStateChange = (event: CustomEvent) => {
    const { headerValue } = event.detail;

    const { stableSelector } = C4DFilterPanelInputSelect;
    this._focusElement = `${stableSelector}[header-value="${headerValue}"]`;

    // toggle checkbox in filter panel modal
    this.querySelectorAll(`${c4dPrefix}-filter-panel-input-select`).forEach(
      (e) => {
        // capture the element counterpart in Filter Panel Modal
        if (e.getAttribute('header-value') === headerValue) {
          const currentGroup = e.closest(`${c4dPrefix}-filter-group-item`);
          currentGroup?.setAttribute('open', '');

          // Clears all other sibling items in the Filter Group
          currentGroup
            ?.querySelectorAll(`${c4dPrefix}-filter-panel-input-select`)
            .forEach((inputSelect) => {
              if (inputSelect === e) return;
              this._selectedValues = this._selectedValues.filter(
                (str) => str !== inputSelect.getAttribute('header-value')
              );
              inputSelect.removeAttribute('selected');
              inputSelect.removeAttribute('is-open');
            });

          e.toggleAttribute('selected');
          e.toggleAttribute('is-open');
        }
      }
    );

    // toggle value in list
    if (!this._selectedValues.includes(headerValue)) {
      this._selectedValues.push(headerValue);
    } else {
      this._selectedValues = this._selectedValues.filter(
        (e) => e !== headerValue
      );
    }
    this.renderStatus();
  };

  @HostListener('document:eventHeadingChange')
  protected _handleHeadingChange = () => {
    this.renderStatus();
  };

  /**
   * selected value property
   */
  @property({ type: String, reflect: true })
  selectValue = '';

  /**
   * Event handler for the clearing functionality
   *
   * @private
   */
  @HostListener('document:eventSelectionClear')
  protected _handleClearSelection = () => {
    this._selectedValues = [];

    // handles clear when clearing from the static filter panel modal
    this._contents.forEach((group) => {
      group
        .querySelectorAll(`${c4dPrefix}-filter-panel-checkbox`)
        .forEach((e) => {
          e.removeAttribute('checked');
        });
      group
        .querySelectorAll(`${c4dPrefix}-filter-panel-input-select-item`)
        .forEach((e) => {
          e.removeAttribute('selected');
          e.removeAttribute('is-open');
        });
      group
        .querySelectorAll(`${c4dPrefix}-filter-panel-input-select`)
        .forEach((e) => {
          e.removeAttribute('selected');
          e.removeAttribute('is-open');
        });
    });

    // handles clear when clearing from the filter panel static
    this.shadowRoot
      ?.querySelectorAll(`${c4dPrefix}-filter-panel-checkbox`)
      .forEach((e) => {
        e.removeAttribute('checked');
      });
    this.shadowRoot
      ?.querySelectorAll(`${c4dPrefix}-filter-panel-input-select-item`)
      .forEach((e) => {
        e.removeAttribute('selected');
        e.removeAttribute('is-open');
      });
    this.shadowRoot
      ?.querySelectorAll(`${c4dPrefix}-filter-panel-input-select`)
      .forEach((e) => {
        e.removeAttribute('selected');
        e.removeAttribute('is-open');
      });

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
   * stores which filter groups have revealed filters
   */
  @property()
  _filterGroupsAllRevealed: { id: string; value: boolean }[] = [];

  @property()
  _isMobile: boolean = window.innerWidth < breakpoint;

  /**
   * An element to set focus to on render.
   */
  @state()
  _focusElement: string | null = null;

  @HostListener('window:resize')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleWindowResize = (): void => {
    this._isMobile = window.innerWidth < breakpoint;
  };

  protected async _querySelectorMobile(id: string): Promise<Element | null> {
    return this.querySelector(id);
  }

  protected async _querySelectorDesktop(id: string): Promise<Element | null> {
    let element;
    if (this.shadowRoot) {
      element = this.shadowRoot.querySelector(id);
    }
    return element;
  }

  protected async _querySelector(id: string): Promise<Element | null> {
    const { _isMobile } = this;
    let element;

    if (_isMobile) {
      element = await this._querySelectorMobile(id);
    } else {
      element = await this._querySelectorDesktop(id);
    }
    return element;
  }

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleSlotChange({ target }: Event) {
    const contents = (this._contents = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      ));
    // Calculate initial this._selectedValues. Look at the first node, which is
    // expected to be <c4d-filter-group>.
    if (contents[0] instanceof Element) {
      const items = Array.from(
        contents[0].querySelectorAll(
          `${c4dPrefix}-filter-panel-checkbox[checked],
            ${c4dPrefix}-filter-panel-input-select[selected],
            ${c4dPrefix}-filter-panel-input-select-item[selected]`
        )
      );
      this._selectedValues = items
        .map((item) => {
          return item.getAttribute('value') ?? '';
        })
        .filter((item) => !!item);
    }
  }

  protected renderStatus() {
    this._filterButtonTitle = `
      ${this._title[0].innerText}${
      this._selectedValues.length > 0 ? ` (${this._selectedValues.length})` : ''
    }
    `;
  }

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleTitleSlotChange({ target }: Event) {
    this._title = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
    this._filterButtonTitle = this._title[0].innerText;
  }

  /**
   * Renders original content into the modal and listens for changes to this
   * content to then be stored in `this._title` and `this._content`.
   */
  protected _renderModal = (): TemplateResult => html`
    <c4d-filter-panel-modal
      ?open=${this.openFilterModal}
      heading="${this._filterButtonTitle}"
      ?has-selections="${this._selectedValues.length}">
      <slot name="heading" @slotchange="${this._handleTitleSlotChange}"></slot>
      <slot @slotchange="${this._handleSlotChange}"></slot>
    </c4d-filter-panel-modal>
  `;

  /**
   * Renders copies of slotted elements into the desktop presentation.
   */
  protected _renderDesktop = (): TemplateResult => html`
    <c4d-filter-panel
      heading="${this._filterButtonTitle}"
      ?has-selections="${this._selectedValues.length}">
      ${this._title.map((e) => {
        return html` ${unsafeHTML((e as HTMLElement).outerHTML)} `;
      })}
      ${this._contents.map((e) => {
        return html` ${unsafeHTML((e as HTMLElement).outerHTML)} `;
      })}
    </c4d-filter-panel>
  `;

  render() {
    return html`
      <button class="cds--filter-button" @click=${this._openModal}>
        <div class="${prefix}--filter__modal__button">
          ${this._filterButtonTitle} ${Filter()}
        </div>
      </button>
      ${this._renderModal()} ${this._renderDesktop()}
    `;
  }

  protected async updated() {
    const { _focusElement } = this;

    if (_focusElement) {
      const targetElement = await this._querySelector(_focusElement);

      if (targetElement instanceof HTMLElement) {
        targetElement?.focus();
      }

      this._focusElement = null;
    }
  }

  /**
   * The name of the custom event captured upon selecting a checkbox
   */

  static get eventCheckboxSelect() {
    return `${c4dPrefix}-checkbox-select`;
  }

  /**
   * The name of the custom event captured upon selecting an input select item.
   */

  static get eventInputSelectItem() {
    return `${c4dPrefix}-filter-panel-input-select`;
  }

  /**
   * The name of the custom event captured upon activating "view all" button in
   * a filter group item
   */

  static get eventFilterGroupViewAllToggle() {
    return `${c4dPrefix}-filter-group-view-all-toggle`;
  }

  /**
   * The name of the custom event captured upon closing the modal
   */

  static get eventModalClose() {
    return `${prefix}-modal-beingclosed`;
  }

  /**
   * The name of the custom event capture upon selecting an input select item
   */

  static get eventInputSelect() {
    return `${c4dPrefix}-filter-panel-input-select-title`;
  }

  /**
   * The name of the custom event fired to clear selections
   */

  static get eventSelectionClear() {
    return `${c4dPrefix}-selection-clear`;
  }

  /**
   * The name of the custom event capture when the heading changes
   */

  static get eventHeadingChange() {
    return `${c4dPrefix}-filter-panel-heading-change`;
  }

  static get stableSelector() {
    return `${c4dPrefix}-filter-panel-composite`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DFilterPanelComposite;
