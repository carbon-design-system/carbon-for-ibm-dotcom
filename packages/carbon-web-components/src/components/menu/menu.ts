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
import { provide } from "@lit-labs/context";
import { myContext } from "./menu-context";

// type StateType = {
//     isRoot: boolean;
//     mode: 'full' | 'basic';
//     hasIcons: boolean;
//     size: 'xs' | 'sm' | 'md' | 'lg' | null;
//     items: any[];
//     requestCloseRoot: (e: Pick<KeyboardEvent, 'type'>) => void;
//   };

//   const menuDefaultState: StateType = {
//     isRoot: true,
//     mode: 'full',
//     hasIcons: false,
//     size: null,
//     items: [],
//     requestCloseRoot: () => {},
//   };

@customElement(`${prefix}-menu`)
class CDSMenu extends HostListenerMixin(LitElement) {
  @provide({ context: myContext })
  data: string = "...";
  //   private _provider = new ContextProvider(this, {context: menuContext, initialValue: {
  //     state: menuDefaultState
  //   }});
  /**
   * A required label titling the Menu. Will be rendered as its aria-label content.
   */
  @property({ type: String })
  label;
  /**
   * Provide an optional function to be called when the MenuItem is clicked.
   */
  onClose?: () => void;

  _handleKeyDown(e: KeyboardEvent) {
    e.stopPropagation();
    const { onClose, _handleClose: handleClose, _focusItem: focusItem } = this;
    if (e.key === 'Escape' || (!isRoot && e.key === 'ArrowLeft' && onClose)) {
      handleClose(e);
    } else {
      focusItem(e);
    }
  }
  _handleClose(e: Pick<KeyboardEvent, 'type'>) {
    const { _returnFocus: returnFocus, onClose } = this;
    // if (/^key/.test(e.type)) {
    //   window.addEventListener('keyup', returnFocus, { once: true });
    // } else if (e.type === 'click' && menu.current) {
    //   menu.current.addEventListener('focusout', returnFocus, { once: true });
    // } else {
    //   returnFocus();
    // }

    if (onClose) {
      onClose();
    }
  }
  _focusItem(e: KeyboardEvent) {
    // const currentItem = focusableItems.findIndex((item) =>
    //   item.ref.current.contains(document.activeElement)
    // );
    // let indexToFocus = currentItem;
    // // if currentItem is -1, no menu item is focused yet.
    // // in this case, the first item should receive focus.
    // if (currentItem === -1) {
    //   indexToFocus = 0;
    // } else if (e) {
    //   if (e.key == 'ArrowUp') {
    //     indexToFocus = indexToFocus - 1;
    //   }
    //   if (e.key === 'ArrowDown') {
    //     indexToFocus = indexToFocus + 1;
    //   }
    // }
    // if (indexToFocus < 0) {
    //   indexToFocus = focusableItems.length - 1;
    // }
    // if (indexToFocus >= focusableItems.length) {
    //   indexToFocus = 0;
    // }
    // if (indexToFocus !== currentItem) {
    //   const nodeToFocus = focusableItems[indexToFocus];
    //   nodeToFocus.ref.current.focus();
    // }
  }
  _returnFocus() {
    // if (focusReturn.current) {
    //   focusReturn.current.focus();
    // }
  }
  _handleBlur() {
    // if (open && onClose && isRoot && !menu.current?.contains(e.relatedTarget)) {
    //   handleClose(e);
    // }
  }
  render() {
    const {
      label,
      _handleKeyDown: handleKeyDown,
      _handleBlur: handleBlur,
    } = this;
    return html`
      <ul
        role="menu"
        aria-label="${label}"
        tabindex="-1"
        @keyDown="${handleKeyDown}"
        @blur="${handleBlur}">
        <slot></slot>
      </ul>
    `;
  }
}
export default CDSMenu;
