/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { baseFontSize, breakpoints } from '@carbon/layout';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { DDS_CUSTOM_PROFILE_LOGIN } from '../../internal/FeatureFlags';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import deprecate from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/deprecate/deprecate.js';
import { globalInit } from '../../internal/vendor/@carbon/ibmdotcom-services/services/global/global';
import Header from '../../internal/vendor/carbon-components-react/components/UIShell/Header';
import HeaderContainer from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderContainer';
import HeaderGlobalBar from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderGlobalBar';
import HeaderMenuButton from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderMenuButton';
import { IbmLogo } from '../Icon';
import MastheadL1 from './MastheadL1';
import MastheadLeftNav from './MastheadLeftNav';
import MastheadProfile from './MastheadProfile';
import MastheadSearch from './MastheadSearch';
import MastheadTopNav from './MastheadTopNav';
import ProfileAPI from '../../internal/vendor/@carbon/ibmdotcom-services/services/Profile/Profile';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import settings from 'carbon-components/es/globals/js/settings';
import SkipToContent from '../../internal/vendor/carbon-components-react/components/UIShell/SkipToContent';
import TranslationAPI from '../../internal/vendor/@carbon/ibmdotcom-services/services/Translation/Translation';
import User20 from '@carbon/icons-react/es/user/20';
import UserOnline20 from '@carbon/icons-react/es/user--online/20';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

const gridBreakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;

/**
 * MastHead component
 *
 * @param {object} props React props object
 * @param {object} props.navigation Object containing navigation elements
 * @param {boolean} props.hasProfile Determines whether to render Profile component
 * @param {boolean} props.hasSearch Determines whether to render Search Bar
 * @param {boolean} props.searchOpenOnload Determines if the search field is open on page load
 * @param {string} props.placeholder Placeholder value for search input
 * @param {string} props.initialSearchTerm Initial value for search input
 * @param {object} props.platform Platform name that appears on L0.
 * @param {string} props.title Title for the masthead L1
 * @param {string} props.eyebrowText Text for the eyebrow link in masthead L1
 * @param {string} props.eyebrowLink URL for the eyebrow link in masthead L1
 * @param {string} props.selectedMenuItem L0/L1 menu item to render with selected state
 * @returns {*} Masthead component
 */
const Masthead = ({
  navigation,
  hasProfile,
  hasSearch,
  searchOpenOnload,
  placeholder,
  initialSearchTerm,
  platform,
  mastheadL1Data,
  selectedMenuItem,
  ...mastheadProps
}) => {
  /**
   * Returns IBM.com authenticated status
   *
   * @param {boolean} isAuthenticated Whether the user is authenticated to IBM.com
   * @returns {*} The user status
   */
  const [isAuthenticated, setStatus] = useState(false);

  /**
   * Returns state of search status
   *
   * @param {boolean} isSearchActive Whether the search bar is open
   * @returns {*} The active search status
   */
  const [isSearchActive, setIsSearchActive] = useState(searchOpenOnload);
  const searchIconButton = useRef(null);

  const handleChangeSearchActive = useCallback((event, { isOpen }) => {
    setIsSearchActive(isOpen);
    setTimeout(() => {
      searchIconButton.current.focus();
    }, 0);
  }, []);

  useEffect(() => {
    // initialize global execution calls
    globalInit();
  }, []);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const status = await ProfileAPI.getUserStatus();
      if (!unmounted) {
        setStatus(status.user !== 'Unauthenticated');
      }
    })();
    return () => {
      unmounted = true;
    };
  }, []);

  let [mastheadData, setMastheadData] = useState([]);
  let [searchData, setSearchData] = useState([]);
  const [profileData, setProfileData] = useState({
    signedin: [],
    signedout: [],
  });

  useEffect(() => {
    let unmounted = false;
    (async () => {
      try {
        const pageData = await TranslationAPI.getTranslation();
        if (!unmounted) {
          setMastheadData(pageData.mastheadNav.links);
          setProfileData(pageData.profileMenu);
          setSearchData(pageData.masthead.search);
        }
      } catch (error) {
        console.error('Error populating masthead data:', error);
      }
    })();
    return () => {
      unmounted = true;
    };
  }, []);

  /**
   * Forces profile menu position to fixed to prevent scrolling
   *
   */
  const _setProfileListPosition = () => {
    const profileMenuList = document.querySelector(
      `.${prefix}--masthead__profile-item`
    );
    profileMenuList.closest('ul').style.position = 'fixed';
    profileMenuList.closest('ul').style.top = '48px';
  };

  const stickyRef = useRef(null);
  const mastheadL1Ref = useRef(null);

  const headerSearchClasses = cx({
    [`${prefix}--masthead__platform`]: platform,
    [`${prefix}--masthead__header--search-active`]: isSearchActive,
  });

  const [scrollOffset] = useState(root.scrollY);
  const [tableOfContents, setTableOfContents] = useState(null);

  useEffect(() => {
    setTableOfContents(
      document.querySelector('.bx--tableofcontents__sidebar') ??
        document
          .querySelector('dds-table-of-contents')
          ?.shadowRoot.querySelector('.bx--tableofcontents__navbar')
    );
  }, [tableOfContents]);

  useEffect(() => {
    let lastScrollPosition = 0;

    /**
     * Sets sticky masthead. If both L0 and L1 are present, L1 will be sticky.
     *
     */
    const handleScroll = root.addEventListener('scroll', () => {
      /**
       * L0 will hide on scroll down, show on scroll up
       *
       */
      if (mastheadL1Ref.current != null && tableOfContents != null) {
        const tocBoundingClient = tableOfContents.getBoundingClientRect();
        const mobileMastheadTop = Math.round(
          Math.min(0, tocBoundingClient.top - stickyRef.current.offsetHeight)
        );
        const tocPosition =
          tocBoundingClient.top + lastScrollPosition - window.scrollY;

        tableOfContents.style.top = `${Math.max(
          Math.min(tocPosition, stickyRef.current.offsetHeight),
          0
        )}px`;

        const regularMastheadTop =
          window.scrollY < lastScrollPosition
            ? 0
            : -Math.min(
                stickyRef.current.offsetHeight -
                  mastheadL1Ref.current.offsetHeight,
                Math.abs(mobileMastheadTop)
              );
        const mastheadTop =
          window.innerWidth < gridBreakpoint
            ? mobileMastheadTop
            : regularMastheadTop;

        stickyRef.current.style.top = `${mastheadTop}px`;
        stickyRef.current.style.transition = 'none';

        /**
         * L0 will hide on scroll down, show up on scroll up when mobile ToC is present
         */
      } else if (tableOfContents != null && stickyRef.current !== null) {
        const tocBoundingClient = tableOfContents.getBoundingClientRect();
        stickyRef.current.style.transition = `none`;

        const mastheadTop = Math.round(
          Math.min(0, tocBoundingClient.top - stickyRef.current.offsetHeight)
        );
        const tocPosition =
          tocBoundingClient.top + lastScrollPosition - window.scrollY;

        if (
          tableOfContents?.getRootNode()?.host?.getAttribute('toc-layout') ===
          'horizontal'
        ) {
          tableOfContents.style.top = `${stickyRef.current.offsetHeight}px`;
        } else if (window.innerWidth < gridBreakpoint) {
          tableOfContents.style.top = `${Math.max(
            Math.min(tocPosition, stickyRef.current.offsetHeight),
            0
          )}px`;

          if (tableOfContents.style.top === '0px') {
            stickyRef.current.style.top = `-${stickyRef.current.offsetHeight}px`;
          } else if (
            tableOfContents.style.top === `${stickyRef.current.offsetHeight}px`
          ) {
            stickyRef.current.style.top = '0';
          } else {
            stickyRef.current.style.top = `${mastheadTop}px`;
          }
        }
      }
      lastScrollPosition = window.scrollY;
    });

    return () => {
      root.removeEventListener('scroll', () => handleScroll);
    };
  }, [scrollOffset, tableOfContents]);

  if (navigation) {
    switch (typeof navigation) {
      case 'default':
        // eslint-disable-next-line
        mastheadData = mastheadData;
        break;
      case 'object':
        mastheadData = navigation;
        break;
      default:
        break;
    }
  }

  // set navigation type (default, alternate, or ecosystem) for autoids
  let navType;
  if (!navigation && !platform) {
    navType = 'alt';
  } else if (navigation && !platform) {
    navType = 'default';
  } else if (platform) {
    navType = 'eco';
  }

  /**
   * checks if there is a child item in the menu section that matches current url and returns true for first valid result
   *
   * @returns {boolean} function that returns true or false
   */
  // eslint-disable-next-line class-methods-use-this
  const _hasCurrentUrl = () => {
    let matchFound = false;

    return (sections, currentUrlPath) => {
      if (!matchFound) {
        if (sections.url === currentUrlPath) {
          matchFound = true;
        } else if (sections?.menuSections?.[0]) {
          const { menuItems } = sections?.menuSections[0];

          for (let i = 0; i < menuItems.length; i++) {
            if (
              menuItems[i]?.url === currentUrlPath ||
              menuItems[i]?.megapanelContent?.quickLinks?.links?.filter(
                (link) => link.url === currentUrlPath
              ).length
            ) {
              matchFound = true;
            }
          }
        }
        return matchFound;
      }
      return false;
    };
  };

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => {
        if (isSideNavExpanded) {
          root.document?.body?.classList.add(`${prefix}--body__lock-scroll`);
        } else {
          root.document?.body?.classList.remove(`${prefix}--body__lock-scroll`);
        }
        return (
          <div className={`${prefix}--masthead`} ref={stickyRef}>
            <div className={`${prefix}--masthead__l0`}>
              <Header
                aria-label="IBM"
                data-autoid={`${stablePrefix}--masthead`}>
                <SkipToContent />

                {(mastheadL1Data || navigation) && (
                  <HeaderMenuButton
                    aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
                    data-autoid={`${stablePrefix}--masthead-${navType}-sidenav__l0-menu`}
                    onClick={onClickSideNavExpand}
                    isActive={isSideNavExpanded}
                    className={headerSearchClasses}
                    onBlur={(e) => {
                      const platform = e.target.parentElement.querySelector(
                        `nav .${prefix}--side-nav__submenu-platform`
                      );

                      const firstMenuItem =
                        e.target.parentElement.querySelector(
                          `.${prefix}--side-nav__menu-section--expanded li:first-of-type button`
                        ) ||
                        e.target.parentElement.querySelector(
                          `.${prefix}--side-nav__menu-section--expanded li:first-of-type a`
                        );

                      const lastMenuItem =
                        e.target.parentElement.querySelector(
                          `.${prefix}--side-nav__menu-section--expanded li:last-of-type button`
                        ) ||
                        e.target.parentElement.querySelector(
                          `.${prefix}--side-nav__menu-section--expanded li:last-of-type a`
                        );

                      if (
                        e.relatedTarget &&
                        e.relatedTarget !== firstMenuItem &&
                        e.relatedTarget !== platform
                      )
                        return lastMenuItem.focus();
                    }}
                  />
                )}

                {(navigation || mastheadL1Data) && (
                  <MastheadLeftNav
                    {...mastheadProps}
                    backButtonText="Back"
                    platform={platform}
                    hasL1Data={!!mastheadL1Data}
                    navigation={mastheadL1Data?.navigationL1 ?? mastheadData}
                    isSideNavExpanded={isSideNavExpanded}
                    navType={navType}
                    selectedMenuItem={selectedMenuItem}
                    onOverlayClick={onClickSideNavExpand}
                  />
                )}

                <IbmLogo
                  logoData={mastheadProps.mastheadLogo}
                  autoid={`${stablePrefix}--masthead-${navType}__l0-logo`}
                  isSearchActive={isSearchActive}
                />

                <div
                  className={`${prefix}--header__search ${headerSearchClasses}`}>
                  {navigation && !mastheadL1Data && (
                    <MastheadTopNav
                      {...mastheadProps}
                      platform={platform}
                      navigation={mastheadData}
                      navType={navType}
                      hasCurrentUrl={_hasCurrentUrl}
                      selectedMenuItem={selectedMenuItem}
                    />
                  )}
                  {hasSearch && (
                    <MastheadSearch
                      {...mastheadProps}
                      {...(searchOpenOnload
                        ? { searchOpenOnload: searchOpenOnload }
                        : {})}
                      placeholder={
                        placeholder || searchData?.placeholder
                      }
                      initialSearchTerm={initialSearchTerm}
                      navType={navType}
                      isSearchActive={isSearchActive}
                      ref={searchIconButton}
                      onChangeSearchActive={handleChangeSearchActive}
                    />
                  )}
                </div>

                {hasProfile && (
                  <HeaderGlobalBar className={`${prefix}--header__profile`}>
                    <MastheadProfile
                      overflowMenuProps={{
                        ariaLabel: 'User Profile',
                        'data-autoid': `${stablePrefix}--masthead-${navType}__l0-account`,
                        flipped: true,
                        style: { width: '3rem' },
                        onOpen: () => _setProfileListPosition(),
                        renderIcon: () =>
                          isAuthenticated ? <UserOnline20 /> : <User20 />,
                      }}
                      overflowMenuItemProps={{
                        wrapperClassName: `${prefix}--masthead__profile-item`,
                      }}
                      profileMenu={
                        isAuthenticated
                          ? profileData.signedin
                          : profileData.signedout
                      }
                      {...(mastheadProps.customProfileLogin &&
                      DDS_CUSTOM_PROFILE_LOGIN
                        ? {
                            customProfileLogin:
                              mastheadProps.customProfileLogin,
                          }
                        : {})}
                      navType={navType}
                    />
                  </HeaderGlobalBar>
                )}
              </Header>
            </div>
            {mastheadL1Data && (
              <div ref={mastheadL1Ref}>
                <MastheadL1
                  {...mastheadL1Data}
                  platform={platform}
                  navType={navType}
                  hasCurrentUrl={_hasCurrentUrl}
                  selectedMenuItem={selectedMenuItem}
                />
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

Masthead.propTypes = {
  /**
   * Navigation data object/string for Masthead. These navigation properties belongs to the Masthead L0 Top navigation. Use one from below:
   *
   * | Behavior           | Data Type | Description                                 | Example                             |
   * | ------------------ | --------- | ------------------------------------------- | ----------------------------------- |
   * | default navigation | String    | Default navigation data from IBM.com        | `<Masthead navigation="default" />` |
   * | custom navigation  | Object    | Pass in custom navigation data as an object | `<Masthead navigation={myNavObj}/>` |
   * | none               | null      | No navigation                               | `<Masthead />`                      |
   *
   * `Custom` navigation data must follow the same structure and key names as `default`.
   * See [this](https://1.www.s81c.com/common/carbon-for-ibm-dotcom/translations/masthead-footer/usen.json) for an example.
   */
  navigation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        hasMenu: PropTypes.bool,
        title: PropTypes.string,
        url: PropTypes.string,
        menuSections: PropTypes.arrayOf(
          PropTypes.shape({
            menuItems: PropTypes.arrayOf(
              PropTypes.shape({
                title: PropTypes.string,
                url: PropTypes.string,
              })
            ),
          })
        ),
      })
    ),
  ]),

  /**
   * `true` to render IBM Profile Menu component.
   */
  hasProfile: PropTypes.bool,

  /**
   * Custom login url in masthead profile menu (experimental)
   */
  customProfileLogin: PropTypes.string,

  /**
   * `true` to render SearchBar component.
   */
  hasSearch: PropTypes.bool,

  /**
   * `true` to have search field open on page load. Does not close `onBlur`
   */
  searchOpenOnload: PropTypes.bool,

  /**
   * Platform name that appears on L0.
   * Includes platform name (only available with `default` and `custom navigation`).
   * Object requires `name` and `url`.
   * See [docs](http://www.ibm.com/standards/carbon/react/?path=/docs/components-masthead--default#platform) for more details.
   */
  platform: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),

  /**
   * L0 menu item to render with selected state. Needs to match `titleEnglish` field from nav data.
   */
  selectedMenuItem: PropTypes.string,

  /**
   * Placeholder value for search input.
   */
  placeholder: PropTypes.string,

  /**
   * Initial value for search input.
   */
  initialSearchTerm: PropTypes.string,

  /**
   * All the data that goes to the L1 of the Masthead.
   */
  mastheadL1Data: PropTypes.shape({
    /**
     * Platform name that appears on L1.
     * Includes platform name
     * Object requires `name` and `url`.
     * See [docs](http://www.ibm.com/standards/carbon/react/?path=/docs/components-masthead--default#platform) for more details.
     */
    platform: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),

    /**
     * Text for the eyebrow link in masthead L1 (experimental).
     */
    eyebrowText: PropTypes.string,

    /**
     * URL for the eyebrow link in masthead L1 (experimental).
     */
    eyebrowLink: PropTypes.string,
    /**
     * Navigation data object/string for Masthead L1. Use one from below:
     *
     * | Behavior           | Data Type | Description                                 | Example                             |
     * | ------------------ | --------- | ------------------------------------------- | ----------------------------------- |
     * | default navigation | String    | Default navigation data from IBM.com        | `<MastheadL1 navigationL1="default" />` |
     * | custom navigation  | Object    | Pass in custom navigation data as an object | `<MastheadL1 navigationL1={myNavObj}/>` |
     * | none               | null      | No navigation                               | `<MastheadL1 />`                      |
     *
     * `Custom` navigation data must follow the same structure and key names as `default`.
     * See [this](https://1.www.s81c.com/common/carbon-for-ibm-dotcom/translations/masthead-footer/usen.json) for an example.
     */
    navigationL1: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.shape({
          hasMenu: PropTypes.bool,
          title: PropTypes.string,
          url: PropTypes.string,
          menuSections: PropTypes.arrayOf(
            PropTypes.shape({
              menuItems: PropTypes.arrayOf(
                PropTypes.shape({
                  title: PropTypes.string,
                  url: PropTypes.string,
                })
              ),
            })
          ),
        })
      ),
    ]),
  }),

  /**
   * Custom typeahead API function
   */
  customTypeaheadApi: PropTypes.func,

  /**
   * Multiple search sections
   */
  multiSection: PropTypes.bool,
};

Masthead.defaultProps = {
  hasProfile: true,
  hasSearch: true,
  searchOpenOnload: false,
  selectedMenuItem: '',
  platform: null,
  placeholder: 'Search all of IBM',
  initialSearchTerm: '',
  mastheadL1Data: null,
};

export default deprecate(
  Masthead,
  `
  The React Masthead is now in feature freeze; any new features or enhancements will only be added to the Web Components Masthead.

  We will continue to address any bugs specific to the React version for the rest of of Carbon for IBM.com v1.

  Please refer to the Web Components Masthead documentation for further details.
  https://www.ibm.com/standards/carbon/web-components/?path=/docs/components-masthead--default
`
);
