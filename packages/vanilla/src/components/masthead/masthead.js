/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NavigationMenu, OverflowMenu, SideNav } from 'carbon-components';
import MastheadSubmenu from './masthead-submenu';
import MastheadNavigationMenu from './masthead-navigation-menu';
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

    /**
    * Initialize profile menu
    *
    */
    const overflowMenu = document.getElementById(
      'data-floating-menu-container'
    );
    OverflowMenu.create(overflowMenu);

    const navigationMenu = document.getElementById(
      `data-navigation-menu-panel`
    );
    // MastheadNavigationMenu.create(navigationMenu);

    /**
    * Initialize top nav submenus
    *
    */
   const headerSubMenu = document.querySelectorAll(
      `.${prefix}--header__submenu`
    );
    [...headerSubMenu].forEach(menu => {
      MastheadSubmenu.create(menu);
    });

    /**
    * Initialize left nav submenus
    *
    */
   const mastheadSidenav = document.getElementById(`${prefix}--side-nav`);
    SideNav.create(mastheadSidenav);

    /**
    * Initialize search events
    *
    */
    const searchButton = document.querySelector(`.react-autosuggest__container .${prefix}--header__search--search`);
    const searchCloseButton = document.querySelector(`.react-autosuggest__container .${prefix}--header__search--close`);

    /**
    * Initialize search autocomplete
    *
    */
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
          console.log('data', data.match);
          // const query = data.match.replace(/ /g, '\u00a0');
          source.classList.add('react-autosuggest__suggestion');
          // source.innerHTML = data.match;
          const inner = `<div class="bx--container-class" tabindex="-1" data-autoid="dds--masthead__searchresults--suggestion">${data.match}</div>`;
          source.insertAdjacentHTML('beforeend', inner);
        },
        element: 'li',
      },
      threshold: 3,
      maxResults: 10,
      highlight: true,
      sort: (a, b) => {
        if (a.match < b.match) return -1;
        if (a.match > b.match) return 1;
        return 0;
      },
      onSelection: () => {},
    });
  }

  /**
   * This fetches the translation data, then returns the footer template
   * with the injected navigation data
   *
   * @param {boolean} hasProfile Determines whether to render Profile component
   * @param {object} searchProps Masthead search properties
   * @returns {Promise} Returned HTML content
   */
  static async getMastheadWithData(hasProfile, searchProps) {
    let isAuthenticated;
    if (hasProfile) {
      const status = await ProfileAPI.getUserStatus();
      isAuthenticated = status.user === 'Authenticated' ? true : false;
    }
    const lang = LocaleAPI.getLang();
    const response = await TranslationAPI.getTranslation(lang);

    searchProps = Object.assign(searchProps, {locale: lang});
    
    return mastheadTemplate({
      searchProps,
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
