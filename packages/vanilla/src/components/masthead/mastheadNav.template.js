/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

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
    links.forEach(link => {
      if (link.hasMenu) {
        navLinks = navLinks + _renderSubnavItem(link);
      } else {
        navLinks = navLinks + _renderNavItem(link);
      }
    });
  }

  return navLinks;
}

/**
 * Renders a subnav nav item
 *
 * @param {Array} sections Navigation links Array
 * @returns {string} HTML nav item
 * @private
 */
function _renderSubnavItem(sections) {
  let subNavLinks = '';
  sections.menuSections.forEach(section => {
    section.menuItems.forEach(item => {
      subNavLinks = subNavLinks + _renderNavItem(item);
    });
  });

  return `
    <li class="${prefix}--header__submenu">
      <a aria-haspopup="menu" aria-expanded="false" class="${prefix}--header__menu-item ${prefix}--header__menu-title" href="javascript:void(0)" role="menuitem" tabindex="0" aria-label="${sections.title}">
        ${sections.title}
        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" class="${prefix}--header__menu-arrow" style="will-change: transform;">
          <path d="M5 6L0 1 .7.3 5 4.6 9.3.3l.7.7z"></path>
        </svg>
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
 * @returns {string} HTML nav item
 * @private
 */
function _renderNavItem(link) {
  return `
    <li><a href="${link.url}" data-autoid="${stablePrefix}--masthead__l0-nav--nav-2" class="${prefix}--header__menu-item" role="menuitem" tabindex="0"><span class="${prefix}--text-truncate--end">${link.title}</span></a></li>
  `;
}

export default mastheadNavTemplate;
