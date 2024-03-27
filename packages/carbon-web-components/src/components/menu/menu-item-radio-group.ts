/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import Checkmark16 from '@carbon/icons/lib/checkmark/16';
import { ChangeEventHandler } from 'react';

const defaultItemToString = (item) => item.toString();

@customElement(`${prefix}-menu-item-radio-group`)
class CDSMenuItemRadioGroup extends HostListenerMixin(LitElement) {
  /**
   * A required label titling the MenuItem. Will be rendered as its text content.
   */
  @property({ type: String })
  label;

  /**
   * Provide the options for this radio group. Can be of any type, as long as you provide an appropriate props.itemToString function.
   */
  items;

  /**
   * Provide a function to convert an item to the string that will be rendered. Defaults to item.toString().
   */
  itemToString?: (item) => string;

  selection;

  /**
   * Provide an optional function to be called when the MenuItem is clicked.
   */
  onChange?: (event: ChangeEventHandler) => void;

  _handleClick(item, e) {
    const { onChange } = this;
    this.selection = item;
    if (onChange) {
      onChange(e);
    }
  }
  render() {
    //   if (context.state.mode === 'basic') {
    //     warning(
    //       false,
    //       'MenuItemRadioGroup is not supported when the menu is in "basic" mode.'
    //     );
    //   }
    const {
      label,
      items,
      selection,
      itemToString = defaultItemToString,
      _handleClick: handleClick,
    } = this;
    return html`
      <li class="${prefix}--menu-item-radio-group" role="none">
        <ul role="group" aria-label="${label}">
          ${items.map((item, i) => {
            html`
              <cds-menu-item
                key="${i}"
                label="${itemToString(item)}"
                role="menuitemradio"
                aria-checked="${item === selection}"
                renderIcon="${item === selection
                  ? Checkmark16({
                      part: 'selected-icon',
                      class: `${prefix}--list-box__menu-item__selected-icon`,
                    })
                  : undefined}"
                @click="${(e) => {
                  handleClick(item, e);
                }}">
              </cds-menu-item>
            `;
          })}
        </ul>
      </li>
    `;
  }
}
export default CDSMenuItemRadioGroup;
