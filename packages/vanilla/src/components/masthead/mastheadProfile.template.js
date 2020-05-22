/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getAttributes, toString } from '@carbon/icon-helpers';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import settings from 'carbon-components/es/globals/js/settings';
import user from '@carbon/icons/es/user/20';
import userOnline from '@carbon/icons/es/user--online/20';

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
    <button id="data-floating-menu-container" data-autoid="${stablePrefix}--masthead__profile" aria-label="User Profile" class="${prefix}--header__action" type="button">
      <div role="button" aria-haspopup="true" aria-expanded="false" class="${prefix}--overflow-menu" aria-label="Menu" tabindex="0" style="width: auto;">
        ${_renderUserIcon(profileData.isAuthenticated)}
      </div>
      <ul class="${prefix}--overflow-menu-options ${prefix}--overflow-menu--flip" tabindex="-1" role="menu" aria-label="Menu" data-floating-menu-direction="bottom">
        ${_renderProfileNav(profileData.menu)}
      </ul>
    </button>
  `;
}

/**
 * Renders the profile user icon
 *
 * @param {boolean} isAuthenticated is user authenticated
 * @returns {string} HTML nav item
 * @private
 */
function _renderUserIcon(isAuthenticated) {
  const userIcon = toString({
    ...(isAuthenticated ? userOnline : user),
    attr: getAttributes(user.attrs),
  });

  return userIcon;
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
