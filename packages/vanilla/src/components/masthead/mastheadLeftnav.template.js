/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';

const { prefix } = settings;

/**
 * renders masthead profile menu
 *
 * @param {Array} navigation Navigation links Array
 * @returns {string} masthead profile menu html output
 */
function mastheadLeftnavTemplate(navigation) {
  return `

    <div id="${prefix}--side-nav" class="bx--navigation" hidden data-navigation-menu>
   <div class="bx--navigation-section">
    <ul class="bx--navigation-items">
      <li class="bx--navigation-item bx--navigation-item--icon">
        <a class="bx--navigation-link" href="javascript:void(0)">
          <div class="bx--navigation-icon">
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z"></path>
            </svg>
          </div>
          Item link
        </a>
      </li>
      <li class="bx--navigation-item bx--navigation-item--icon">
        <a class="bx--navigation-link" href="javascript:void(0)">
          <div class="bx--navigation-icon">
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z"></path>
            </svg>
          </div>
          Item link
        </a>
      </li>
    </ul>
  </div>
 <div class="bx--navigation-section">
    <ul class="bx--navigation-items">
      <li class="bx--navigation-item bx--navigation-item--active bx--navigation-item--icon">
        <a class="bx--navigation-link" href="javascript:void(0)">
          <div class="bx--navigation-icon">
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z"></path>
            </svg>
          </div>
          Item link
        </a>
      </li>
      <li class="bx--navigation-item bx--navigation-item--icon">
        <a class="bx--navigation-link" href="javascript:void(0)">
          <div class="bx--navigation-icon">
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z"></path>
            </svg>
          </div>
          Item link
        </a>
      </li>
      <li class="bx--navigation-item bx--navigation-item--icon">
        <a class="bx--navigation-link" href="javascript:void(0)">
          <div class="bx--navigation-icon">
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z"></path>
            </svg>
          </div>
          Item link
        </a>
      </li>
      <li class="bx--navigation-item bx--navigation-item--icon">
          <div class="bx--navigation__category">
            <button class="bx--navigation__category-toggle" aria-haspopup="true" aria-expanded="false" aria-controls="category-1-menu">
              <div class="bx--navigation-icon">

                <svg aria-hidden="true" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z"></path>
                </svg>
              </div>
              <div class="bx--navigation__category-title">
                L1 category
                <svg aria-hidden="true" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path d="M16 22L6 12l1.414-1.414L16 19.172l8.586-8.586L26 12 16 22z"></path>
                </svg>
              </div>
            </button>
            <ul id="category-1-menu" class="bx--navigation__category-items" role="menu">
              <li class="bx--navigation__category-item">
                <a class="bx--navigation-link" href="javascript:void(0)" role="menuitem">
                  Nested link
                </a>
              </li>
              <li class="bx--navigation__category-item bx--navigation__category-item--active">
                <a class="bx--navigation-link" href="javascript:void(0)" role="menuitem">
                  Nested link
                </a>
              </li>
              <li class="bx--navigation__category-item">
                <a class="bx--navigation-link" href="javascript:void(0)" role="menuitem">
                  Nested link
                </a>
              </li>
            </ul>
          </div>
      </li>
    </ul>
  </div>
</div>
    
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
    <li class="${prefix}--side-nav__item">
      <button aria-haspopup="true" aria-expanded="false" class="${prefix}--side-nav__submenu" type="button">
        <span class="${prefix}--side-nav__submenu-title">${sections.title}</span>
        <div class="${prefix}--side-nav__icon ${prefix}--side-nav__icon--small ${prefix}--side-nav__submenu-chevron">
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true" style="will-change: transform;">
            <path d="M16 22L6 12l1.4-1.4 8.6 8.6 8.6-8.6L26 12z"></path>
          </svg>
        </div>
      </button>
      <ul class="${prefix}--side-nav__menu" role="menu">
        <li class="${prefix}--side-nav__menu-item ${prefix}--masthead__side-nav--submemu-back" role="none">
          <a href="javascript:void(0);" data-autoid="dds--masthead__l0-sidenav--subnav-back-1" class="${prefix}--side-nav__link" role="menuitem">
            <span class="${prefix}--side-nav__link-text">
              <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style="will-change: transform;">
                <path d="M6.7 12.3L2.9 8.5H15v-1H2.9l3.8-3.8L6 3 1 8l5 5z"></path>
              </svg>
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
 * @returns {string} HTML nav item
 * @private
 */
function _renderNavItem(link) {
  return `
    <li class="${prefix}--side-nav__item"><a href="${link.url}" data-autoid="dds--masthead__l0-sidenav--nav-2" class="${prefix}--side-nav__link"><span class="${prefix}--side-nav__link-text">${link.title}</span></a></li>
  `;
}

export default mastheadLeftnavTemplate;
