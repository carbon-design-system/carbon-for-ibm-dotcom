/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  LocaleAPI,
  ProfileAPI,
  SearchTypeaheadAPI,
  TranslationAPI,
  globalInit,
} from '@carbon/ibmdotcom-services';
import autoComplete from '@tarekraafat/autocomplete.js/dist/js/autoComplete';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import MastheadSideNav from './masthead-sidenav';
import MastheadSubmenu from './masthead-submenu';
import mastheadTemplate from './masthead.template';
import OverflowMenu from 'carbon-components/es/components/overflow-menu/overflow-menu';
import root from 'window-or-global';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Sets up default masthead props
 *
 * @type {string}
 * @private
 */
let defaultProps = {};

/**
 * Sets up the redirect URL when a user selects a search suggestion
 *
 * @type {string}
 * @private
 */
const _redirectUrl =
  process.env.SEARCH_REDIRECT_ENDPOINT ||
  `https://www.ibm.com/search?lnk=mhsrch`;

/**
 * class to initialize the masthead components
 *
 */
class Masthead {
  /**
   * Initializes the masthead components
   *
   * @param {object} props Masthead props
   */
  static setProps(props) {
    defaultProps = Object.assign(defaultProps, props);
  }

  /**
   * Initializes the masthead
   *
   */
  static init() {
    globalInit();
    /**
     * Initialize profile menu
     *
     */
    const overflowMenu = defaultProps.hasProfile
      ? document.getElementById('data-floating-menu-container')
      : null;
    OverflowMenu.create(overflowMenu);

    const headerNav = document.querySelector(this.options.mastheadNav);
    if (headerNav) {
      /**
       * Initialize top nav submenus
       *
       */
      const headerSubMenu = document.querySelectorAll(
        this.options.mastheadNavSubmenu
      );
      [...headerSubMenu].forEach(menu => {
        MastheadSubmenu.create(menu);
      });

      /**
       * Initialize left nav submenus
       *
       */
      const mastheadSideNav = document.getElementById(this.options.sideNav);
      MastheadSideNav.create(mastheadSideNav);

      const mastheadHamburger = document.querySelector(
        this.options.mastheadHamburger
      );
      const mastheadSideNavOverlay = document.querySelector(
        this.options.sideNavOverlay
      );

      mastheadHamburger.addEventListener('click', () => {
        mastheadHamburger.classList.toggle(this.options.sideNavToggleActive);
        mastheadSideNav.classList.toggle(this.options.sideNavExpanded);
        mastheadSideNavOverlay.classList.toggle(
          this.options.sideNavOverlayActive
        );
      });
    }

    /**
     * Initialize search events
     *
     */
    const mastheadSearch = document.querySelector(this.options.mastheadSearch);
    if (mastheadSearch) {
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
            source.classList.add('react-autosuggest__suggestion');
            const inner = `<div class="${prefix}--container-class" data-autoid="${stablePrefix}--masthead__searchresults--suggestion">${data.match}</div>`;
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
        onSelection: feedback => {
          root.parent.location.href = this.getRedirect(
            feedback.selection.value.name
          );
        },
      });

      const mastheadSearchInput = document.querySelector(
        this.options.mastheadSearchInput
      );
      const mastheadSearchButton = document.querySelector(
        this.options.mastheadSearchButton
      );
      const mastheadSearchButtonClose = document.querySelector(
        this.options.mastheadSearchButtonClose
      );

      /**
       * Close search button closes input and resets value
       *
       */
      mastheadSearchButtonClose.addEventListener('click', () => {
        mastheadSearchInput.value = '';
        this.resetSearch(mastheadSearch);
      });

      mastheadSearchButton.addEventListener('click', () => {
        if (
          mastheadSearch.classList.contains(this.options.mastheadSearchIsActive)
        ) {
          root.parent.location.href = this.getRedirect(
            mastheadSearchInput.value
          );
        } else {
          mastheadSearch.classList.add(this.options.mastheadSearchIsActive);
          mastheadSearchInput.focus();
        }
      });

      mastheadSearchInput.addEventListener('blur', evt => {
        evt.target.value = '';
        this.resetSearch(mastheadSearch);
      });
    }
  }

  /**
   * Close and reset search and clears input
   *
   * @param {string} el Search container
   */
  static resetSearch(el) {
    const mastheadSearchList = document.getElementById(
      this.options.mastheadSearchList
    );

    el.classList.remove(this.options.mastheadSearchIsActive);

    while (
      mastheadSearchList.firstChild &&
      mastheadSearchList.removeChild(mastheadSearchList.firstChild)
    );
  }

  /**
   * Redirect search query to IBM search
   *
   * @param {string} value User-inputted search value
   * @returns {string} string
   */
  static getRedirect(value) {
    return `${_redirectUrl}&q=${encodeURIComponent(value)}&lang=${
      defaultProps.search.locale.lc
    }&cc=${defaultProps.search.locale.cc}`;
  }

  /**
   * This fetches the translation data, then returns the masthead template
   * with the injected navigation data
   *
   * @param {object} navigation Masthead nav data
   * @param {object} platform Masthead platform data
   * @param {boolean} hasNavigation Determines whether to render Navigation components
   * @param {boolean} hasProfile Determines whether to render Profile component
   * @param {object} searchProps Masthead search properties
   * @returns {Promise} Returned HTML content
   */
  static async getMastheadWithData(
    navigation,
    platform,
    hasNavigation,
    hasProfile,
    searchProps
  ) {
    let isAuthenticated;
    let mastheadProps = {};
    if (hasProfile) {
      const status = await ProfileAPI.getUserStatus();
      isAuthenticated = status.user === 'Authenticated';
      mastheadProps = Object.assign(defaultProps, { hasProfile: hasProfile });
    }

    const lang = LocaleAPI.getLang();
    const response = await TranslationAPI.getTranslation(lang);

    if (searchProps.hasSearch) {
      searchProps = Object.assign(searchProps, { locale: lang });
      mastheadProps = Object.assign(defaultProps, { search: searchProps });
      this.setProps(mastheadProps);
    }

    return mastheadTemplate({
      ...(hasNavigation && {
        navigation:
          typeof navigation == 'object'
            ? navigation
            : response.mastheadNav.links,
      }),
      ...(platform && {
        platform: platform,
      }),
      ...(hasProfile && {
        profileData: {
          isAuthenticated: isAuthenticated,
          menu: isAuthenticated
            ? response.profileMenu.signedin
            : response.profileMenu.signedout,
        },
      }),
      ...(searchProps.hasSearch && {
        searchProps,
      }),
    });
  }

  /**
   * The component options.
   *
   * @member Masthead.options
   * @type {object}
   */
  static get options() {
    return {
      mastheadNav: `.${prefix}--header__nav`,
      mastheadNavSubmenu: `.${prefix}--header__submenu`,
      mastheadHamburger: `.${prefix}--header__menu-trigger`,
      mastheadSearch: `.${prefix}--masthead__search`,
      mastheadSearchList: 'autoComplete_list',
      mastheadSearchInput: `.${prefix}--header__search--input`,
      mastheadSearchIsActive: `${prefix}--masthead__search--active`,
      mastheadSearchButton: `.react-autosuggest__container .${prefix}--header__search--search`,
      mastheadSearchButtonClose: `.react-autosuggest__container .${prefix}--header__search--close`,
      sideNav: `${prefix}--side-nav`,
      sideNavExpanded: `${prefix}--side-nav--expanded`,
      sideNavToggleActive: `${prefix}--header__action--active`,
      sideNavOverlay: `.${prefix}--side-nav__overlay`,
      sideNavOverlayActive: `${prefix}--side-nav__overlay-active`,
    };
  }
}

export default Masthead;
