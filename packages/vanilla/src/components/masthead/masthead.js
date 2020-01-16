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
  SearchTypeaheadAPI,
  TranslationAPI,
} from '@carbon/ibmdotcom-services';
import autoComplete from '@tarekraafat/autocomplete.js/dist/js/autoComplete';
import root from 'window-or-global';
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
   */
  static init() {
    globalInit();

    const overflowMenu = document.getElementById(
      'data-floating-menu-container'
    );
    OverflowMenu.create(overflowMenu);

    const headerSubMenu = document.querySelectorAll(
      `.${prefix}--header__submenu`
    );
    [...headerSubMenu].forEach(menu => {
      MastheadSubmenu.create(menu);
    });

    const mastheadSidenav = document.getElementById(`${prefix}--side-nav`);
    SideNav.create(mastheadSidenav);

    new autoComplete({
      data: {
        src: async () => {
          const data = [];
          const query = document.getElementById('autoComplete').value;
          const source = await SearchTypeaheadAPI.getResults(query);
          source.forEach(item => {
            data.push({ name: item[0] });
          });
          return data;
        },
        key: ['name'],
        cache: false,
      },
      resultsList: {
        render: true,
        destination: document.getElementById('react-autowhatever-1'),
        position: 'afterbegin',
        element: 'ul',
        container: source => {
          source.classList.add('react-autosuggest__suggestions-list');
          source.setAttribute('role', 'listbox');
        },
      },
      resultItem: {
        content: (data, source) => {
          source.classList.add('react-autosuggest__suggestion');
          source.innerHTML = data.match;
        },
        element: 'li',
        container: source => {
          source.classList.add('foo');
        },
      },
      threshold: 3,
      highlight: true,
      sort: (a, b) => {
        if (a.match < b.match) return -1;
        if (a.match > b.match) return 1;
        return 0;
      },
      onSelection: () => {

      },
    });
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
    let isAuthenticated;
    if (hasProfile) {
      const status = await ProfileAPI.getUserStatus();
      isAuthenticated = status.user === 'Authenticated' ? true : false;
    }
    const lang = LocaleAPI.getLang();
    const response = await TranslationAPI.getTranslation(lang);

    return mastheadTemplate({
      hasSearch,
      navigation: response.mastheadNav.links,
      ...(hasProfile && {
        profileData: {
          isAuthenticated: isAuthenticated,
          menu: isAuthenticated
            ? response.profileMenu.signedin
            : response.profileMenu.signedout,
        },
      }),
    });
  }
}

export default Masthead;
