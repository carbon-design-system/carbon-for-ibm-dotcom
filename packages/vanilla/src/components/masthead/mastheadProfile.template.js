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
 * renders masthead profile menu
 *
 * @param {object} profileData Profile menu items
 * @returns {string} masthead profile menu html output
 */
function mastheadProfileTemplate(profileData) {
  return `
    <button data-floating-menu-container id="data-floating-menu-container" data-autoid="${stablePrefix}--masthead__profile" aria-label="User Profile" class="${prefix}--header__action" type="button">
      <div role="button" aria-haspopup="true" aria-expanded="false" class="${prefix}--overflow-menu" aria-label="Menu" tabindex="0" style="width: auto;">
        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true" style="will-change: transform;">
          <path d="M16 4a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7 7 7 0 0 0-7-7zm10 28h-2v-5a5 5 0 0 0-5-5h-6a5 5 0 0 0-5 5v5H6v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7z"></path>
        </svg>
      </div>
      <ul class="${prefix}--overflow-menu-options ${prefix}--overflow-menu--flip" tabindex="-1" role="menu" aria-label="Menu" data-floating-menu-direction="bottom">
        ${_renderProfileNav(profileData)}
      </ul>
    </button>
  `;
}

/**
 * Renders the array of nav link items
 *
 * @param {Array} links Profile links Array
 * @returns {string} HTML nav item
 * @private
 */
function _renderProfileNav(links) {
  let profileLinks = '';
  if (links && links.length > 0) {
    links.forEach(link => {
      profileLinks = profileLinks + _renderProfileLink(link);
    });
  }

  return profileLinks;
}

/**
 * Renders a single nav item
 *
 * @param {Array} link Profile links Array
 * @returns {string} HTML nav item
 * @private
 */
function _renderProfileLink(link) {
  return `
    <li class="${prefix}--overflow-menu-options__option" role="menuitem">
      <a href="${link.url}" class="${prefix}--overflow-menu-options__btn" tabindex="-1" index="0">
        <div class="${prefix}--overflow-menu-options__option-content">${link.title}</div>
      </a>
    </li>
  `;
}

export default mastheadProfileTemplate;
