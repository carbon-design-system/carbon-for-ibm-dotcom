/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TemplateResult, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import CDSComboBoxItem from '../../internal/vendor/@carbon/web-components/components/combo-box/combo-box-item.js';
import Close16 from '../../internal/vendor/@carbon/web-components/icons/close/16.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { findIndex, forEach } from '../../globals/internal/collection-helpers';
import C4DDropdown, { DROPDOWN_KEYBOARD_ACTION } from './dropdown';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

export {
  DROPDOWN_COLOR_SCHEME,
  DROPDOWN_SIZE,
  DROPDOWN_TYPE,
} from './dropdown';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Combo box.
 *
 * @element c4d-combo-box
 * @fires cds-combo-box-beingselected
 *   The custom event fired before a combo box item is selected upon a user gesture.
 *   Cancellation of this event stops changing the user-initiated selection.
 * @fires cds-combo-box-beingtoggled
 *   The custom event fired before the open state of this combo box is toggled upon a user gesture.
 *   Cancellation of this event stops the user-initiated toggling.
 * @fires cds-combo-box-selected - The custom event fired after a combo box item is selected upon a user gesture.
 * @fires cds-combo-box-toggled - The custom event fired after the open state of this combo box is toggled upon a user gesture.
 */
@customElement(`${c4dPrefix}-combo-box`)
class C4DComboBox extends C4DDropdown {
  /**
   * The text content that should be set to the `<input>` for filtering.
   */
  protected _filterInputValue = '';

  protected _shouldTriggerBeFocusable = false;

  /**
   * The selection button.
   */
  @query('#selection-button')
  private _selectionButtonNode!: HTMLElement;

  /**
   * The `<input>` for filtering.
   */
  @query('input')
  protected _filterInputNode!: HTMLInputElement;

  /**
   * @param item A combo box item.
   * @returns `true` if the given combo box item matches the query text user types.
   */
  protected _testItemWithQueryText(item) {
    return (this.itemMatches || this._defaultItemMatches)(
      item,
      this._filterInputNode.value
    );
  }

  /* eslint-disable class-methods-use-this */
  /**
   * The default item matching callback.
   *
   * @param item The combo box item.
   * @param queryText The query text user types.
   * @returns `true` if the given combo box item matches the given query text.
   */
  protected _defaultItemMatches(
    item: CDSComboBoxItem,
    queryText: string
  ): boolean {
    return (
      item.textContent!.toLowerCase().indexOf(queryText.toLowerCase()) >= 0
    );
  }
  /* eslint-enable class-methods-use-this */

  /**
   * Handles `input` event on the `<input>` for filtering.
   */
  protected _handleInput() {
    const items = this.querySelectorAll(
      (this.constructor as typeof C4DComboBox).selectorItem
    );
    const index = !this._filterInputNode.value
      ? -1
      : findIndex(items, this._testItemWithQueryText, this);
    forEach(items, (item, i) => {
      (item as CDSComboBoxItem).highlighted = i === index;
    });
    const { _filterInputNode: filterInput } = this;
    this._filterInputValue = !filterInput ? '' : filterInput.value;
    this.open = true;
    this.requestUpdate(); // If the only change is to `_filterInputValue`, auto-update doesn't happen
  }

  protected _handleClickInner(event: MouseEvent) {
    if (this._selectionButtonNode?.contains(event.target as Node)) {
      this._handleUserInitiatedClearInput();
    } else {
      super._handleClickInner(event);
    }
  }

  protected _handleKeypressInner(event: KeyboardEvent) {
    const { key } = event;
    const action = (this.constructor as typeof C4DDropdown).getAction(key);
    const { TRIGGERING } = DROPDOWN_KEYBOARD_ACTION;
    if (
      this._selectionButtonNode?.contains(event.target as Node) &&
      // Space key should be handled by `<input>` unless "clear selection" button has focus
      (action === TRIGGERING || key === ' ')
    ) {
      this._handleUserInitiatedClearInput();
    } else {
      super._handleKeypressInner(event);
    }
  }

  /**
   * Handles user-initiated clearing the `<input>` for filtering.
   */
  protected _handleUserInitiatedClearInput() {
    forEach(
      this.querySelectorAll(
        (this.constructor as typeof C4DComboBox).selectorItem
      ),
      (item) => {
        (item as CDSComboBoxItem).highlighted = false;
      }
    );
    this._filterInputValue = '';
    this._filterInputNode.focus();
    this.open = false;
    this.requestUpdate();
  }

  protected _handleUserInitiatedSelectItem(item?: CDSComboBoxItem) {
    if (item && !this._selectionShouldChange(item)) {
      // Escape hatch for `shouldUpdate()` logic that updates `._filterInputValue()` when selection changes,
      // given we want to update the `<input>` and close the dropdown even if selection doesn't update.
      // Use case:
      // 1. Select the 2nd item in combo box drop down
      // 2. Type some text in the `<input>`
      // 3. Re-select the 2nd item in combo box drop down,
      //    the `<input>` has to updated with the 2nd item and the dropdown should be closed,
      //    even if there is no change in the selected value
      this._filterInputValue = item.textContent || '';
      this.open = false;
      this.requestUpdate();
    }
    super._handleUserInitiatedSelectItem(item);
  }

  protected _renderLabel(): TemplateResult {
    const {
      disabled,
      label,
      _filterInputValue: filterInputValue,
      _handleInput: handleInput,
    } = this;
    return html`
      <input
        id="trigger-label"
        class="${prefix}--text-input"
        ?disabled=${disabled}
        placeholder="${label}"
        .value=${filterInputValue}
        role="combobox"
        aria-expanded="${this.open}"
        aria-labelledby="assistiveStatus"
        aria-controls="menu-body"
        aria-autocomplete="list"
        @input=${handleInput} />
    `;
  }

  protected _renderFollowingLabel(): TemplateResult | void {
    const { clearSelectionLabel, _filterInputValue: filterInputValue } = this;
    return filterInputValue.length === 0
      ? undefined
      : html`
          <div
            id="selection-button"
            role="button"
            class="${prefix}--list-box__selection"
            tabindex="0"
            title="${clearSelectionLabel}">
            ${Close16({ 'aria-label': clearSelectionLabel })}
          </div>
        `;
  }

  /**
   * The `aria-label` attribute for the icon to clear selection.
   */
  @property({ attribute: 'clear-selection-label' })
  clearSelectionLabel = '';

  /**
   * The custom item matching callback.
   */
  @property({ attribute: false })
  itemMatches!: (item: CDSComboBoxItem, queryText: string) => boolean;

  shouldUpdate(changedProperties) {
    super.shouldUpdate(changedProperties);
    const { _selectedItemContent: selectedItemContent } = this;
    if (selectedItemContent && changedProperties.has('value')) {
      this._filterInputValue = selectedItemContent?.textContent || '';
    }
    return true;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    const { _listBoxNode: listBoxNode } = this;
    if (listBoxNode) {
      listBoxNode.classList.add(`${prefix}--combo-box`);
    }
  }

  // For combo box, open/selection with space key is disabled given the input box should take it over
  static TRIGGER_KEYS = new Set(['Enter']);

  /**
   * A selector that will return highlighted items.
   */
  static get selectorItemHighlighted() {
    return `${prefix}-combo-box-item[highlighted]`;
  }

  /**
   * A selector that will return combo box items.
   */
  static get selectorItem() {
    return `${prefix}-combo-box-item`;
  }

  /**
   * A selector that will return selected items.
   */
  static get selectorItemSelected() {
    return `${prefix}-combo-box-item[selected]`;
  }

  /**
   * The name of the custom event fired before this combo box item is being toggled upon a user gesture.
   * Cancellation of this event stops the user-initiated action of toggling this combo box item.
   */
  static get eventBeforeToggle() {
    return `${prefix}-combo-box-beingtoggled`;
  }

  /**
   * The name of the custom event fired after this combo box item is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `${prefix}-combo-box-toggled`;
  }

  /**
   * The name of the custom event fired before a combo box item is selected upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   */
  static get eventBeforeSelect() {
    return `${prefix}-combo-box-beingselected`;
  }

  /**
   * The name of the custom event fired after a a combo box item is selected upon a user gesture.
   */
  static get eventSelect() {
    return `${prefix}-combo-box-selected`;
  }
}

export default C4DComboBox;
