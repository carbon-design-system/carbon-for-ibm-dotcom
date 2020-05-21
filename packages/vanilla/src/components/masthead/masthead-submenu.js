/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import eventMatches from 'carbon-components/es/globals/js/misc/event-matches';
import HeaderSubmenu from 'carbon-components/es/components/ui-shell/header-submenu';

/**
 * class to initialize Header submenu component
 */
class MastheadSubmenu extends HeaderSubmenu {
  /**
   * Header submenu action method
   *
   * @param {Event} event The event triggering this method
   * @returns {null|*} Various actions
   * @private
   */
  _getAction = event => {
    const isFlyoutMenu = eventMatches(event, this.options.selectorFlyoutMenu);
    if (isFlyoutMenu) {
      return this.constructor.actions.DELEGATE_TO_FLYOUT_MENU;
    }
    switch (event.type) {
      case 'keydown':
        return {
          32: this.constructor.actions.TOGGLE_SUBMENU_WITH_FOCUS, // space bar
          13: this.constructor.actions.TOGGLE_SUBMENU_WITH_FOCUS, // enter
          27: this.constructor.actions.CLOSE_SUBMENU, // esc
          // possible arrow keys
        }[event.which];
      case 'blur':
      case 'focusout': {
        const isOfSelf = this.element.contains(event.relatedTarget);
        return isOfSelf ? null : this.constructor.actions.CLOSE_SUBMENU;
      }
      case 'click':
        return this.constructor.actions.TOGGLE_SUBMENU_WITH_FOCUS;
      default:
        return null;
    }
  };
}

export default MastheadSubmenu;
