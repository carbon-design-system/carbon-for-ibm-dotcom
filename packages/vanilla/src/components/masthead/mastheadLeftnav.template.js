/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getAttributes, toString } from '@carbon/icon-helpers';
import arrowLeft from '@carbon/icons/es/arrow--left/20';
import chevronDown from '@carbon/icons/es/chevron--down/20';
import settings from 'carbon-components/es/globals/js/settings';
const { prefix } = settings;

/**
 * renders masthead profile menu
 *
 * @param {Array} navigation Navigation links Array
 * @returns {string} masthead profile menu html output
 */
function mastheadLeftnavTemplate(navigation) {
  return `
    <div class="${prefix}--side-nav__overlay"></div>
    <nav id="${prefix}--side-nav" class="${prefix}--side-nav__navigation ${prefix}--side-nav ${prefix}--side-nav--ux ${prefix}--side-nav--hidden" aria-label="Side navigation">
      <nav data-autoid="dds--masthead__l0-sidenav">
        <ul class="${prefix}--side-nav__items">
          <div class="${prefix}--side-nav__header-navigation">
            ${_renderNav(navigation)}
          </div>
        </ul>
      </nav>
    </nav>
  `;
}

/**
 * Renders the array of nav link items
 *
 * @param {Array} links Navigation links Array
 * @returns {string} HTML nav item
 * @private
 */
function _renderNav(links) {
  let navLinks = '';
  if (links && links.length > 0) {
    links.forEach((link, index) => {
      if (link.hasMenu) {
        navLinks = navLinks + _renderSubnavMenu(link, index);
      } else {
        navLinks = navLinks + _renderNavItem(link, index);
      }
    });
  }

  return navLinks;
}

/**
 * Renders a subnav nav menu
 *
 * @param {Array} sections Navigation links Array
 * @param {number} index Navigation submenu index
 * @returns {string} HTML nav item
 * @private
 */
function _renderSubnavMenu(sections, index) {
  const chevronDownIcon = toString({
    ...chevronDown,
    attrs: getAttributes(chevronDown.attrs),
  });

  const arrowLeftIcon = toString({
    ...arrowLeft,
    attrs: getAttributes(arrowLeft.attrs),
  });

  let subNavLinks = '';
  const col = index;
  sections.menuSections.forEach(section => {
    section.menuItems.forEach((item, index) => {
      subNavLinks = subNavLinks + _renderSubNavItem(item, col, index);
    });
  });

  return `
    <li class="${prefix}--side-nav__item">
      <button aria-haspopup="true" aria-expanded="false" data-autoid="dds--masthead__l0-sidenav--nav-${index}" class="${prefix}--side-nav__submenu" type="button">
        <span class="${prefix}--side-nav__submenu-title">${sections.title}</span>
        <div class="${prefix}--side-nav__icon ${prefix}--side-nav__icon--small ${prefix}--side-nav__submenu-chevron">
          ${chevronDownIcon}
        </div>
      </button>
      <ul class="${prefix}--side-nav__menu" role="menu">
        <li class="${prefix}--side-nav__menu-item ${prefix}--masthead__side-nav--submemu-back" role="none">
          <a href="javascript:void(0);" data-autoid="dds--masthead__l0-sidenav--subnav-back-${col}" class="${prefix}--side-nav__link" role="menuitem">
            <span class="${prefix}--side-nav__link-text">
              ${arrowLeftIcon}
              Back
            </span>
          </a>
        </li>
        <li class="${prefix}--masthead__side-nav--submemu-title">${sections.title}</li>
        ${subNavLinks}
      </ul>
    </li>
  `;
}

/**
 * Renders a single nav item
 *
 * @param {Array} link Navigation links Array
 * @param {number} index Navigation item index
 * @returns {string} HTML nav item
 * @private
 */
function _renderNavItem(link, index) {
  return `
    <li class="${prefix}--side-nav__item"><a href="${link.url}" data-autoid="dds--masthead__l0-sidenav--nav-${index}" class="${prefix}--side-nav__link"><span class="${prefix}--side-nav__link-text">${link.title}</span></a></li>
  `;
}

/**
 * Renders a single subnav item
 *
 * @param {Array} link Navigation links Array
 * @param {number} col Navigation submenu index
 * @param {number} index Navigation item index
 * @returns {string} HTML nav item
 * @private
 */
function _renderSubNavItem(link, col, index) {
  return `
    <li class="${prefix}--side-nav__menu-item" role="none"><a href="${link.url}" data-autoid="dds--masthead__l0-sidenav--subnav-col${col}-item${index}" class="${prefix}--side-nav__link" role="menuitem"><span class="${prefix}--side-nav__link-text">${link.title}</span></a></li>
  `;
}

export default mastheadLeftnavTemplate;
