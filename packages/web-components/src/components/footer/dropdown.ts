/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { html } from 'lit';
import { property, query } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import CDSDropdown, {
  DROPDOWN_KEYBOARD_ACTION,
  DROPDOWN_TYPE,
  NAVIGATION_DIRECTION,
} from '@carbon/web-components/es/components/dropdown/dropdown.js';
import CDSDropdownItem from '@carbon/web-components/es/components/dropdown/dropdown-item.js';
import ChevronDown16 from '../../internal/vendor/@carbon/web-components/icons/chevron--down/16.js';
import WarningFilled16 from '../../internal/vendor/@carbon/web-components/icons/warning--filled/16.js';
import { DROPDOWN_COLOR_SCHEME, DROPDOWN_SIZE } from './defs';
import { forEach, indexOf } from '../../globals/internal/collection-helpers';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

export {
  DROPDOWN_COLOR_SCHEME,
  DROPDOWN_KEYBOARD_ACTION,
  DROPDOWN_SIZE,
  DROPDOWN_TYPE,
  NAVIGATION_DIRECTION,
};

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Dropdown.
 *
 * @element c4d-dropdown
 * @csspart label-text The label text.
 * @csspart helper-text The helper text.
 * @csspart trigger-button The trigger button.
 * @csspart menu-body The menu body.
 * @csspart validity-message The validity message.
 * @fires cds-dropdown-beingselected
 *   The custom event fired before a dropdown item is selected upon a user gesture.
 *   Cancellation of this event stops changing the user-initiated selection.
 * @fires cds-dropdown-beingtoggled
 *   The custom event fired before the open state of this dropdown is toggled upon a user gesture.
 *   Cancellation of this event stops the user-initiated toggling.
 * @fires cds-dropdown-selected - The custom event fired after a dropdown item is selected upon a user gesture.
 * @fires cds-dropdown-toggled - The custom event fired after the open state of this dropdown is toggled upon a user gesture.
 */
@customElement(`${c4dPrefix}-dropdown`)
class C4DDropdown extends CDSDropdown {
  /**
   * The `<input` node in ComboBox, used to get value.
   */
  @query(`input`)
  protected _inputNode;

  /**
   * The formatter, used for announcing selected item and current item. Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatSelectedItemStatusText = ({ latestSelection, currentItem }) =>
    currentItem === ''
      ? `${latestSelection}`
      : `${latestSelection}, Current input is: ${currentItem}`;

  /**
   * Navigate through dropdown items.
   *
   * @param direction `-1` to navigate backward, `1` to navigate forward.
   */
  protected _navigate(direction: number) {
    const constructor = this.constructor as typeof CDSDropdown;
    const items = this.querySelectorAll(constructor.selectorItem);
    const highlightedItem = this.querySelector(
      constructor.selectorItemHighlighted
    );
    const highlightedIndex = indexOf(items, highlightedItem!);
    let nextIndex = highlightedIndex + direction;
    if (nextIndex < 0) {
      nextIndex = items.length - 1;
    }
    if (nextIndex >= items.length) {
      nextIndex = 0;
    }
    forEach(items, (item, i) => {
      (item as CDSDropdownItem).highlighted = i === nextIndex;
    });

    const nextItem = items[nextIndex];
    // Using `{ block: 'nearest' }` to prevent scrolling unless scrolling is absolutely necessary.
    // `scrollIntoViewOptions` seems to work in latest Safari despite of MDN/caniuse table.
    // IE falls back to the old behavior.
    nextItem.scrollIntoView({ block: 'nearest' });

    const nextItemText = nextItem.textContent;
    if (nextItemText) {
      this._assistiveStatusText = this.formatSelectedItemStatusText({
        latestSelection: `${nextItemText}`,
        currentItem: `${this._inputNode.value}`,
      });
    }
    this.requestUpdate();
  }

  render() {
    const {
      disabled,
      helperText,
      invalid,
      titleText,
      open,
      toggleLabelClosed,
      toggleLabelOpen,
      size,
      type,
      validityMessage,
      _assistiveStatusText: assistiveStatusText,
      _shouldTriggerBeFocusable: shouldTriggerBeFocusable,
      _handleClickInner: handleClickInner,
      _handleKeydownInner: handleKeydownInner,
      _handleKeypressInner: handleKeypressInner,
      _handleSlotchangeHelperText: handleSlotchangeHelperText,
      _handleSlotchangeLabelText: handleSlotchangeLabelText,
      _slotHelperTextNode: slotHelperTextNode,
      _slotTitleTextNode: slotTitleTextNode,
    } = this;
    const inline = type === DROPDOWN_TYPE.INLINE;
    const selectedItemsCount = this.querySelectorAll(
      (this.constructor as typeof C4DDropdown).selectorItemSelected
    ).length;
    const classes = classMap({
      [`${prefix}--dropdown`]: true,
      [`${prefix}--list-box`]: true,
      [`${prefix}--list-box--disabled`]: disabled,
      [`${prefix}--list-box--inline`]: inline,
      [`${prefix}--list-box--expanded`]: open,
      [`${prefix}--list-box--${size}`]: size,
      [`${prefix}--dropdown--invalid`]: invalid,
      [`${prefix}--dropdown--inline`]: inline,
      [`${prefix}--dropdown--selected`]: selectedItemsCount > 0,
    });
    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--label-visually-hidden`]: true,
      [`${prefix}--label--disabled`]: disabled,
    });
    const helperClasses = classMap({
      [`${prefix}--form__helper-text`]: true,
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });
    const iconContainerClasses = classMap({
      [`${prefix}--list-box__menu-icon`]: true,
      [`${prefix}--list-box__menu-icon--open`]: open,
    });
    const toggleLabel =
      (open ? toggleLabelOpen : toggleLabelClosed) || undefined;
    const hasHelperText =
      helperText ||
      (slotHelperTextNode && slotHelperTextNode.assignedNodes().length > 0);
    const hasTitleText =
      titleText ||
      (slotTitleTextNode && slotTitleTextNode.assignedNodes().length > 0);
    const helper = !invalid
      ? html`
          <div
            part="helper-text"
            class="${helperClasses}"
            ?hidden="${inline || !hasHelperText}">
            <slot name="helper-text" @slotchange="${handleSlotchangeHelperText}"
              >${helperText}</slot
            >
          </div>
        `
      : html`
          <div part="validity-message" class=${`${prefix}--form-requirement`}>
            <slot name="validity-message">${validityMessage}</slot>
          </div>
        `;
    const validityIcon = !invalid
      ? undefined
      : WarningFilled16({
          class: `${prefix}--list-box__invalid-icon`,
          'aria-label': toggleLabel,
        });
    const menuBody = !open
      ? undefined
      : html`
          <div
            id="menu-body"
            part="menu-body"
            class="${prefix}--list-box__menu"
            role="listbox"
            tabindex="-1">
            <slot></slot>
          </div>
        `;
    return html`
      <label
        part="label-text"
        class="${labelClasses}"
        ?hidden="${!hasTitleText}">
        <slot name="label-text" @slotchange="${handleSlotchangeLabelText}"
          >${hasTitleText}</slot
        >
      </label>
      <div
        class="${classes}"
        ?data-invalid=${invalid}
        @click=${handleClickInner}
        @keydown=${handleKeydownInner}
        @keypress=${handleKeypressInner}>
        ${validityIcon}
        <div
          part="trigger-button"
          role="button"
          class="${prefix}--list-box__field"
          tabindex="${ifDefined(!shouldTriggerBeFocusable ? undefined : '0')}"
          aria-labelledby="trigger-label"
          aria-expanded="${String(open)}"
          aria-haspopup="listbox"
          aria-owns="menu-body"
          aria-controls="menu-body">
          ${this._renderPrecedingLabel()}${this._renderLabel()}${this._renderFollowingLabel()}
          <div class="${iconContainerClasses}">
            ${ChevronDown16({ 'aria-label': toggleLabel })}
          </div>
        </div>
        ${menuBody}
      </div>
      ${helper}
      <div
        id="assistiveStatus"
        class="${prefix}--assistive-text"
        role="status"
        aria-live="assertive"
        aria-relevant="additions text">
        ${assistiveStatusText}
      </div>
    `;
  }
}

export default C4DDropdown;
