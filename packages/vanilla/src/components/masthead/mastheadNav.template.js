/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import chevronDown from '@carbon/icons/es/chevron--down/16';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import settings from 'carbon-components/es/globals/js/settings';
import { toString } from '@carbon/icon-helpers';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders masthead nav
 *
 * @param {object} navigation Masthead menu data
 * @returns {string} masthead nav html output
 */
function mastheadNavTemplate(navigation) {
  return `
      <nav data-autoid="${stablePrefix}--masthead__l0-nav" aria-label="IBM" class="${prefix}--header__nav">
        <ul arial-label="IBM" class="${prefix}--header__menu-bar" role="menubar">
          ${_renderNav(navigation)}
        </ul>
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
        navLinks = navLinks + _renderSubnav(link, index);
      } else {
        navLinks = navLinks + _renderNavItem(link, index);
      }
    });
  }

  return navLinks;
}

/**
 * Renders a subnav nav item
 *
 * @param {Array} sections Navigation links Array
 * @param {number} index Navigation submenu index
 * @returns {string} HTML nav item
 * @private
 */
function _renderSubnav(sections, index) {
  const chevronDownIcon = toString({
    ...chevronDown,
    attrs: {
      ...chevronDown.attrs,
      class: `${prefix}--header__menu-arrow`,
    },
  });

  let subNavLinks = '';
  const col = index;
  sections.menuSections.forEach(section => {
    section.menuItems.forEach((item, index) => {
      subNavLinks = subNavLinks + _renderSubNavItem(item, col, index);
    });
  });

  return `
    <li class="${prefix}--header__submenu">
      <a aria-haspopup="menu" aria-expanded="false" class="${prefix}--header__menu-item ${prefix}--header__menu-title" href="javascript:void(0)" role="menuitem" tabindex="0" aria-label="${sections.title}">
        ${sections.title}
        ${chevronDownIcon}
      </a>
      <ul aria-label="${sections.title}" class="${prefix}--header__menu" role="menu">
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
    <li><a href="${link.url}" data-autoid="${stablePrefix}--masthead__l0-nav--nav-${index}" class="${prefix}--header__menu-item" role="menuitem" tabindex="0"><span class="${prefix}--text-truncate--end">${link.title}</span></a></li>
  `;
}

/**
 * Renders a single subnav item
 *
 * @param {Array} link Navigation links Array
 * @param {number} col Navigation submenu index
 * @param {number} index Navigation submenu item index
 * @returns {string} HTML nav item
 * @private
 */
function _renderSubNavItem(link, col, index) {
  return `
    <li role="none"><a href="${link.url}" data-autoid="${stablePrefix}--masthead__l0-nav--subnav-col${col}-item${index}" class="${prefix}--header__menu-item" role="menuitem" tabindex="0"><span class="${prefix}--text-truncate--end">${link.title}</span></a></li>
  `;
}

export default mastheadNavTemplate;
