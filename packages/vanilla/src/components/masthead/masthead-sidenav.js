/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import eventMatches from 'carbon-components/es/globals/js/misc/event-matches';
import on from 'carbon-components/es/globals/js/misc/on';
import settings from 'carbon-components/es/globals/js/settings';
import SideNav from 'carbon-components/es/components/ui-shell/side-nav';

const { prefix } = settings;

/**
 * class to initialize Sidenav submenu component
 */
class MastheadSideNav extends SideNav {
  /**
   * MastheadSideNav constructor
   *
   * @class
   * @param {string} element DOM element
   * @param {object} options Class options
   */
  constructor(element, options) {
    super(element, options);
    this.manage(on(element, 'click', this._handleClick));
  }

  /**
   * SideNav event handlers
   *
   * @type {object}
   * @property {object} evt Target event
   */
  _handleClick = evt => {
    const matchesSideNavLink = eventMatches(
      evt,
      this.options.selectorSideNavLink
    );
    if (matchesSideNavLink) {
      [
        ...this.element.querySelectorAll(
          this.options.selectorSideNavLinkCurrent
        ),
      ].forEach(el => {
        el.classList.remove(
          this.options.classSideNavItemActive,
          this.options.classSideNavLinkCurrent
        );
        el.removeAttribute('aria-current');
      });
      matchesSideNavLink.classList.add(this.options.classSideNavLinkCurrent);
      const closestSideNavItem = matchesSideNavLink.closest(
        this.options.selectorSideNavItem
      );
      if (closestSideNavItem) {
        closestSideNavItem
          .querySelector('button')
          .setAttribute('aria-expanded', false);
      }
    }
  };

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode SideNav.create .create()}, or {@linkcode SideNav.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode SideNav.init .init()} works.
   *
   * @member SideNav.options
   * @type {object}
   * @property {string} selectorInit The data attribute to find side navs.
   */
  static options /* #__PURE_CLASS_PROPERTY__ */ = {
    selectorSideNavSubmenu: `.${prefix}--side-nav__submenu`,
    selectorSideNavItem: `.${prefix}--side-nav__item`,
    selectorSideNavLink: `.${prefix}--side-nav__link`,
    selectorSideNavLinkCurrent: `[aria-current="page"],.${prefix}--side-nav__link--current,.${prefix}--side-nav__item--active`,
    classSideNavItemActive: `${prefix}--side-nav__item--active`,
    classSideNavLinkCurrent: `${prefix}--side-nav__link--current`,
  };
}

export default MastheadSideNav;
