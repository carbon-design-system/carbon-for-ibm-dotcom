/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, TemplateResult } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import Filter from '@carbon/web-components/es/icons/filter/16.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import './filter-group';
import './filter-panel';
import './filter-panel-modal';
import HostListener from '@carbon/web-components/es/globals/decorators/host-listener.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './filter-panel.scss';
import '@carbon/web-components/es/components/checkbox/checkbox.js';
import '@carbon/web-components/es/components/button/button.js';
import C4DFilterGroupItem from './filter-group-item';
import C4DFilterPanelCheckbox from './filter-panel-checkbox';
import C4DFilterPanelInputSelect from './filter-panel-input-select';
import C4DFilterPanelInputSelectItem from './filter-panel-input-select-item';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import MediaQueryMixin, {
  MQBreakpoints,
  MQDirs,
} from '../../component-mixins/media-query/media-query';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Filter panel composite
 *
 * @element c4d-filter-panel-composite
 * @csspart panel-modal - The panel modal. Usage: `c4d-filter-panel::part(panel-modal)`
 * @csspart button - The button. Usage: `c4d-filter-panel::part(button)`
 * @csspart filter-panel - The filter panel. Usage: `c4d-filter-panel::part(filter-panel)`
 */
@customElement(`${c4dPrefix}-filter-panel-composite`)
class C4DFilterPanelComposite extends MediaQueryMixin(
  HostListenerMixin(StableSelectorMixin(LitElement)),
  { [MQBreakpoints.LG]: MQDirs.MAX }
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
      this._selectedValues = [...this._selectedValues, value];
    }

    if (lastValue && this._selectedValues.includes(lastValue)) {
      this._selectedValues = this._selectedValues.filter(
        (e) => e !== lastValue
      );
    }
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

    // Toggle value in list.
    if (!this._selectedValues.includes(value)) {
      this._selectedValues = [...this._selectedValues, value];
    } else {
      this._selectedValues = this._selectedValues.filter((e) => e !== value);
    }
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
      this._filterGroupsAllRevealed = [
        ...this._filterGroupsAllRevealed,
        event.detail,
      ];
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
        // Capture the element counterpart in Filter Panel Modal.
        if (e.getAttribute('header-value') === headerValue) {
          const currentGroup = e.closest(`${c4dPrefix}-filter-group-item`);
          currentGroup?.setAttribute('open', '');

          // Clears all other sibling items in the Filter Group
          currentGroup
            ?.querySelectorAll(`${c4dPrefix}-filter-panel-input-select`)
            .forEach((inputSelect) => {
              if (inputSelect === e) {
                return;
              }
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

    // Toggle value in list.
    if (!this._selectedValues.includes(headerValue)) {
      this._selectedValues = [...this._selectedValues, headerValue];
    } else {
      this._selectedValues = this._selectedValues.filter(
        (e) => e !== headerValue
      );
    }
  };

  @HostListener('document:eventHeadingChange')
  protected _handleHeadingChange = () => {
    this._setHeadingFromSlot(this._headingSlot);
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

    // Handles clear when clearing from the static filter panel modal.
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
  };

  @query('slot[name=heading]')
  _headingSlot;

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
   * Sets the heading text, to be composed with the current count.
   */
  @property()
  _heading = '';

  /**
   * sets the selected values into an array
   */
  @property()
  _selectedValues: string[] = [];

  /**
   * stores which filter groups have revealed filters
   */
  @property()
  _filterGroupsAllRevealed: { id: string; value: boolean }[] = [];

  @state()
  _isMobile = this.carbonBreakpoints.lg.matches;

  /**
   * An element to set focus to on render.
   */
  @state()
  _focusElement: string | null = null;

  protected mediaQueryCallbackMaxLG() {
    this._isMobile = this.carbonBreakpoints.lg.matches;
  }

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
   * @param event.target The event target.
   */
  protected _handleSlotChange({ target }: Event) {
    this._contents = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
    // Calculate initial this._selectedValues. Look at the first node, which is
    // expected to be <c4d-filter-group>.
    if (this._contents[0] instanceof Element) {
      const items = Array.from(
        this._contents[0].querySelectorAll(
          `${c4dPrefix}-filter-panel-checkbox[checked],
            ${c4dPrefix}-filter-panel-input-select[selected],
            ${c4dPrefix}-filter-panel-input-select-item[selected]`
        )
      );
      this._selectedValues = items
        .map((item) => {
          return (
            item.getAttribute('value') ??
            item.getAttribute('header-value') ??
            ''
          );
        })
        .filter((item) => !!item);
    }
  }

  protected _getComposedHeadingFilterCount() {
    const filterCount =
      this._selectedValues.length > 0
        ? ` (${this._selectedValues.length})`
        : '';
    return `${this._heading}${filterCount}`;
  }

  /**
   * Handles `slotchange` event for the heading slot.
   *
   * @param event The event.
   * @param event.target The event target.
   */
  protected _handleHeadingSlotChange({ target }: Event) {
    this._setHeadingFromSlot(target as HTMLSlotElement);
  }

  protected _setHeadingFromSlot(slot: HTMLSlotElement) {
    // Clean slate.
    this._heading = '';

    // Work through candidate headings, ultimately we're only interested in the
    // first non-empty node.
    const candidateHeadings = slot
      .assignedNodes()
      .filter(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );

    // If we found something, lets retain it's textContent as the heading.
    if (candidateHeadings.length > 0) {
      this._heading = candidateHeadings[0].textContent
        ? candidateHeadings[0].textContent.trim()
        : '';
    }
  }

  /**
   * Renders original content into the modal and listens for changes to this
   * content to then be stored in `this._heading` and `this._contents`.
   */
  protected _renderModal = (): TemplateResult => html`
    <c4d-filter-panel-modal
      part="panel-modal"
      ?open=${this.openFilterModal}
      heading="${this._getComposedHeadingFilterCount()}"
      ?has-selections="${this._selectedValues.length}">
      <slot @slotchange="${this._handleSlotChange}"></slot>
    </c4d-filter-panel-modal>
  `;

  protected _renderMobile = (): TemplateResult => html`
    <cds-button part="button" kind="tertiary" @click=${this._openModal}>
      ${this._getComposedHeadingFilterCount()} ${Filter({ slot: 'icon' })}
    </cds-button>

    ${this._renderModal()}
  `;

  /**
   * Renders copies of slotted elements into the desktop presentation.
   */
  protected _renderDesktop = (): TemplateResult => html`
    <c4d-filter-panel
      part="filter-panel"
      heading="${this._getComposedHeadingFilterCount()}"
      ?has-selections="${this._selectedValues.length}">
      <slot @slotchange="${this._handleSlotChange}"></slot>
    </c4d-filter-panel>
  `;

  render() {
    // Note that the <slot name="heading"> contents, intended to be
    // <c4d-filter-panel-heading> are never shown as is. The text contents
    // are composed, using this._getComposedHeadingFilterCount(), together with
    // the current filter count, and passed as an attribute to
    // <c4d-filter-panel-modal> and <c4d-filter-panel>.
    return html`
      <slot
        name="heading"
        @slotchange="${this._handleHeadingSlotChange}"></slot>
      ${this._isMobile ? this._renderMobile() : this._renderDesktop()}
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
