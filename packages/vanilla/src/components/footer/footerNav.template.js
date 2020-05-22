/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders footer nav for tall
 *
 * @param {object} footerMenu Footer menu data
 * @returns {string} footer nav html output
 */
function footerNavTemplate(footerMenu) {
  return `
  <nav data-autoid="${stablePrefix}--footer-nav" class="${prefix}--footer-nav">
    <ul class="${prefix}--accordion ${prefix}--footer-nav__container">
      ${_renderNavSections(footerMenu)}
    </ul>
  </nav>`;
}

/**
 * Renders the nav sections
 *
 * @param {Array} footerMenu footer menu items
 * @returns {string} navigation sections
 * @private
 */
function _renderNavSections(footerMenu) {
  let sections = '';
  if (footerMenu && footerMenu.length > 0) {
    footerMenu.forEach(item => {
      sections = sections + _renderNavSection(item);
    });
  }

  return sections;
}

/**
 * Render single nav section
 *
 * @param {object} section section data
 * @returns {string} section html response
 * @private
 */
function _renderNavSection(section) {
  return `
    <li class="${prefix}--accordion__item ${prefix}--footer-nav-group" data-autoid="${stablePrefix}--footer-nav-group"><button aria-expanded="false" class="${prefix}--accordion__heading" title="Expand/Collapse" type="button"><svg focusable="false"
          preserveAspectRatio="xMidYMid meet" aria-label="Expand/Collapse" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" class="${prefix}--accordion__arrow" style="will-change: transform;">
          <path d="M11 8l-5 5-.7-.7L9.6 8 5.3 3.7 6 3z"></path>
        </svg>
        <div class="${prefix}--accordion__title">${section.title}</div>
      </button>
      <div class="${prefix}--accordion__content">
        <h2 class="${prefix}--footer-nav-group__title">${section.title}</h2>
        <ul>
          ${_renderNavItems(section.links)}
        </ul>
      </div>
    </li>
  `;
}

/**
 * Renders the array of nav link items
 *
 * @param {Array} links Navigation links Array
 * @returns {string} HTML nav item
 * @private
 */
function _renderNavItems(links) {
  let navLinks = '';
  if (links && links.length > 0) {
    links.forEach(link => {
      navLinks = navLinks + _renderNavItem(link);
    });
  }

  return navLinks;
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
    <li class="${prefix}--footer-nav-group__item"><a href="${link.url}" class="${prefix}--link ${prefix}--footer-nav-group__link ${prefix}--footer__link" data-autoid="${stablePrefix}--footer-nav-group__link">${link.title}</a></li>
  `;
}

export default footerNavTemplate;
