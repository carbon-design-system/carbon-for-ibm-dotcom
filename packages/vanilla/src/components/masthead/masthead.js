/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { OverflowMenu, SideNav } from 'carbon-components';
import MastheadSubmenu from './masthead-submenu';
import {
  globalInit,
  LocaleAPI,
  ProfileAPI,
  TranslationAPI,
} from '@carbon/ibmdotcom-services';
import mastheadTemplate from './masthead.template';
import { settings } from 'carbon-components';

const { prefix } = settings;

/**
 * class to initialize the masthead components
 */
class Masthead {
  /**
   * Initializes the masthead components
   *
   * @param {string} El type of masthead in use
   */
  static init() {
    globalInit();

    const overflowMenu = document.getElementById('data-floating-menu-container');
    OverflowMenu.create(overflowMenu);

    const headerSubMenu = document.querySelectorAll(`.${prefix}--header__submenu`);
    [...headerSubMenu].forEach((menu) => {
      MastheadSubmenu.create(menu);
    });

    const mastheadSidenav = document.getElementById(`${prefix}--side-nav`);
    // console.log('sidenav', mastheadSidenav);
    SideNav.create(mastheadSidenav);
  }

  /**
   * This fetches the translation data, then returns the footer template
   * with the injected navigation data
   *
   * @param {boolean} hasProfile Determines whether to render Profile component
   * @param {boolean} hasSearch Determines whether to render Search Bar
   * @returns {Promise} Returned HTML content
   */
  static async getMastheadWithData(hasProfile, hasSearch) {
    const status = ProfileAPI.getUserStatus();
    console.log('status', status);
    const lang = LocaleAPI.getLang();
    const response = await TranslationAPI.getTranslation(lang);

    return mastheadTemplate({
      hasProfile,
      hasSearch,
      navigation: response.mastheadNav.links,
      profileData: response.profileMenu,
    });
  }
}

export default Masthead;
