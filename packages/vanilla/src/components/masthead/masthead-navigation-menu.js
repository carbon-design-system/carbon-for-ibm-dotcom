/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NavigationMenu } from 'carbon-components';
import on from 'carbon-components/src/globals/js/misc/on';
import eventMatches from 'carbon-components/src/globals/js/misc/event-matches';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * class to initialize Header submenu Component
 */
class MastheadNavigationMenu extends NavigationMenu {
  /**
   * A navigation menu
   * @extends NavigationMenuPanel
   * @param {HTMLElement} element The element working as a selector.
   * @param {object} [options] The component options.
   * @param {string} [options.selectorInit] The CSS class to find navigation
   * menus.
   * @param {string} [options.attribInitTarget] The attribute name in the
   * launcher buttons to find target navigation menu.
   * @param {string} [options.selectorShellNavSubmenu] The CSS selector for a
   * nav submenu
   * @param {string} [options.selectorShellNavLink] The CSS selector for a nav
   * link
   * @param {string} [options.selectorShellNavLinkCurrent] The CSS selector for
   * the current nav link
   * @param {string} [options.selectorShellNavItem] The CSS selector for a nav
   * item
   * @param {string} [options.selectorShellNavCategory] The CSS selector for a
   * nav category
   * @param {string} [options.classShellNavItemActive] The CSS class for the
   * active nav item
   * @param {string} [options.classShellNavLinkCurrent] The CSS class for the
   * current lav link
   * @param {string} [options.classShellNavCategoryExpanded] The CSS class
   * for an expanded nav category
   */
  constructor(element, options) {
    super(element, options);
    this.manage(on(element, 'click', this._handleClick));
    this.manage(on(element, 'keydown', this._handleKeyDown));
    this.manage(
      on(this.element.ownerDocument, 'click', event => {
        if (
          !this.element.hasAttribute('hidden') &&
          !this.triggerButton.contains(event.target) &&
          !this.element.contains(event.target)
        ) {
          this.changeState('collapsed');
        }
      })
    );
    const hasFocusOut = 'onfocusout' in window;
    this.manage(
      on(
        this.element,
        hasFocusOut ? 'focusout' : 'blur',
        this._handleFocusOut,
        !hasFocusOut
      )
    );
  }

  /**
   * toggle the state of the nav menu on click
   * 
   * @param {Event} event The event triggering this method
   */
  _handleClick = event => {
    console.log('event');
    const matchesNavSubmenu = eventMatches(
      event,
      this.options.selectorShellNavSubmenu
    );
    console.log('subnav', matchesNavSubmenu);
    const matchesShellNavLink = eventMatches(
      event,
      this.options.selectorShellNavLink
    );
    const matchesNestedShellNavLink = eventMatches(
      event,
      this.options.selectorShellNestedNavLink
    );
    if (matchesNavSubmenu) {
      const isExpanded =
        matchesNavSubmenu.getAttribute('aria-expanded') === 'true';
      this.changeNavSubmenuState({ matchesNavSubmenu, isExpanded });
      return;
    }
  };

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * 
   * {@linkcode NavigationMenuPanel.create .create()}, or
   * {@linkcode NavigationMenuPanel.init .init()},
   * properties in this object are overriden for the instance being create and
   * how {@linkcode NavigationMenuPanel.init .init()} works.
   * 
   * @member NavigationMenuPanel.options
   * @type {object}
   * @property {string} selectorInit The CSS class to find popup navs.
   * @property {string} attribInitTarget The attribute name in the launcher buttons to find target popup nav.
   * @property {string[]} initEventNames The events that the component will handles
   */
  static get options() {
    return {
      selectorInit: '[data-navigation-menu]',
      attribInitTarget: 'data-navigation-menu-target',
    }
  }
}

export default MastheadNavigationMenu;
