/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  html,
  LitElement,
  property,
  state,
  TemplateResult,
  query,
} from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import Filter from '../../internal/vendor/@carbon/web-components/icons/filter/16.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import './filter-group';
import './filter-panel';
import './filter-panel-modal';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './filter-panel.scss';
import '../../internal/vendor/@carbon/web-components/components/checkbox/checkbox.js';
import DDSFilterGroupItem from './filter-group-item';
import DDSFilterPanelCheckbox from './filter-panel-checkbox';
import DDSFilterPanelInputSelect from './filter-panel-input-select';
import DDSFilterPanelInputSelectItem from './filter-panel-input-select-item';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';
import MediaQueryMixin, {
  MQBreakpoints,
  MQDirs,
} from '../../component-mixins/media-query/media-query';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Filter panel composite
 *
 * @element dds-filter-panel-composite
 */
@customElement(`${ddsPrefix}-filter-panel-composite`)
class DDSFilterPanelComposite extends MediaQueryMixin(
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

    const { stableSelector } = DDSFilterPanelInputSelectItem;
    this._focusElement = `${stableSelector}[value="${value}"]`;

    // Remove the DDSInputSelect (header) value from list to add an inner child instead.
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

    // Toggle checkbox in filter panel modal.
    this.querySelectorAll(`${ddsPrefix}-filter-panel-checkbox`).forEach((e) => {
      if (e.getAttribute('value') === value) {
        e.toggleAttribute('checked');
        e.closest(`${ddsPrefix}-filter-group-item`)?.setAttribute('open', '');

        const { stableSelector } = DDSFilterPanelCheckbox;
        this._focusElement = `${stableSelector}[value="${value}"]`;
      }
    });

    const filterGroupItems = this.querySelectorAll(
      `${ddsPrefix}-filter-group-item`
    );
    this.shadowRoot
      ?.querySelectorAll(`${ddsPrefix}-filter-group-item`)
      .forEach((filterGroupItem, index) => {
        if ((filterGroupItem as DDSFilterGroupItem).open) {
          (filterGroupItems[index] as DDSFilterGroupItem).open = true;
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

    const { stableSelector } = DDSFilterPanelInputSelect;
    this._focusElement = `${stableSelector}[header-value="${headerValue}"]`;

    // toggle checkbox in filter panel modal
    this.querySelectorAll(`${ddsPrefix}-filter-panel-input-select`).forEach(
      (e) => {
        // capture the element counterpart in Filter Panel Modal
        if (e.getAttribute('header-value') === headerValue) {
          const currentGroup = e.closest(`${ddsPrefix}-filter-group-item`);
          currentGroup?.setAttribute('open', '');

          // Clears all other sibling items in the Filter Group
          currentGroup
            ?.querySelectorAll(`${ddsPrefix}-filter-panel-input-select`)
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
        .querySelectorAll(`${ddsPrefix}-filter-panel-checkbox`)
        .forEach((e) => {
          e.removeAttribute('checked');
        });
      group
        .querySelectorAll(`${ddsPrefix}-filter-panel-input-select-item`)
        .forEach((e) => {
          e.removeAttribute('selected');
          e.removeAttribute('is-open');
        });
      group
        .querySelectorAll(`${ddsPrefix}-filter-panel-input-select`)
        .forEach((e) => {
          e.removeAttribute('selected');
          e.removeAttribute('is-open');
        });
    });

    // handles clear when clearing from the filter panel static
    this.shadowRoot
      ?.querySelectorAll(`${ddsPrefix}-filter-panel-checkbox`)
      .forEach((e) => {
        e.removeAttribute('checked');
      });
    this.shadowRoot
      ?.querySelectorAll(`${ddsPrefix}-filter-panel-input-select-item`)
      .forEach((e) => {
        e.removeAttribute('selected');
        e.removeAttribute('is-open');
      });
    this.shadowRoot
      ?.querySelectorAll(`${ddsPrefix}-filter-panel-input-select`)
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
  _heading: string = '';

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
   */
  protected _handleSlotChange({ target }: Event) {
    this._contents = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
    // Calculate initial this._selectedValues. Look at the first node, which is
    // expected to be <dds-filter-group>.
    if (this._contents[0] instanceof Element) {
      const items = Array.from(
        this._contents[0].querySelectorAll(
          `${ddsPrefix}-filter-panel-checkbox[checked],
            ${ddsPrefix}-filter-panel-input-select[selected],
            ${ddsPrefix}-filter-panel-input-select-item[selected]`
        )
      );
      this._selectedValues = items
        .map((item) => {
          return item.getAttribute('value') ?? '';
        })
        .filter((item) => !!item);
    }
  }

  protected _getComposedHeadingFilterCount() {
    const filterCount =
      this._selectedValues.length > 0
        ? ` (${this._selectedValues.length})`
        : '';
    return `
      ${this._heading}${filterCount}
    `;
  }

  /**
   * Handles `slotchange` event for the heading slot.
   *
   * @param event The event.
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
    <dds-filter-panel-modal
      ?open=${this.openFilterModal}
      heading="${this._getComposedHeadingFilterCount()}"
      ?has-selections="${this._selectedValues.length}">
      <slot
        name="heading"
        @slotchange="${this._handleHeadingSlotChange}"></slot>
      <slot @slotchange="${this._handleSlotChange}"></slot>
    </dds-filter-panel-modal>
  `;

  /**
   * Renders copies of slotted elements into the desktop presentation.
   */
  protected _renderDesktop = (): TemplateResult => html`
    <dds-filter-panel
      heading="${this._getComposedHeadingFilterCount()}"
      ?has-selections="${this._selectedValues.length}">
      <slot
        name="heading"
        @slotchange="${this._handleHeadingSlotChange}"></slot>
      <slot @slotchange="${this._handleSlotChange}"></slot>
    </dds-filter-panel>
  `;

  render() {
    if (this._isMobile) {
      return html`
        <button class="bx--filter-button" @click=${this._openModal}>
          <div class="${prefix}--filter__modal__button">
            ${this._getComposedHeadingFilterCount()} ${Filter()}
          </div>
        </button>
        ${this._renderModal()}
      `;
    } else {
      return html` ${this._renderDesktop()} `;
    }
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
    return `${ddsPrefix}-checkbox-select`;
  }

  /**
   * The name of the custom event captured upon selecting an input select item.
   */

  static get eventInputSelectItem() {
    return `${ddsPrefix}-filter-panel-input-select`;
  }

  /**
   * The name of the custom event captured upon activating "view all" button in
   * a filter group item
   */

  static get eventFilterGroupViewAllToggle() {
    return `${ddsPrefix}-filter-group-view-all-toggle`;
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
    return `${ddsPrefix}-filter-panel-input-select-title`;
  }

  /**
   * The name of the custom event fired to clear selections
   */

  static get eventSelectionClear() {
    return `${ddsPrefix}-selection-clear`;
  }

  /**
   * The name of the custom event capture when the heading changes
   */

  static get eventHeadingChange() {
    return `${ddsPrefix}-filter-panel-heading-change`;
  }

  static get stableSelector() {
    return `${ddsPrefix}-filter-panel-composite`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSFilterPanelComposite;
