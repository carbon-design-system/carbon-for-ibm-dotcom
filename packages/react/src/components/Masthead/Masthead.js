/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { baseFontSize, breakpoints } from '@carbon/layout';
import React, { useEffect, useRef, useState } from 'react';
import calculateTotalWidth from '@carbon/ibmdotcom-utilities/es/utilities/calculateTotalWidth/calculateTotalWidth';
import cx from 'classnames';
import { DDS_MASTHEAD_L1 } from '../../internal/FeatureFlags';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { globalInit } from '@carbon/ibmdotcom-services/es/services/global/global';
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
import ProfileAPI from '@carbon/ibmdotcom-services/es/services/Profile/Profile';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import settings from 'carbon-components/es/globals/js/settings';
import SkipToContent from '../../internal/vendor/carbon-components-react/components/UIShell/SkipToContent';
import TranslationAPI from '@carbon/ibmdotcom-services/es/services/Translation/Translation';
import User20 from '@carbon/icons-react/es/user/20';
import UserOnline20 from '@carbon/icons-react/es/user--online/20';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * MastHead component
 *
 * @param {object} props React props object
 * @param {object} props.navigation Object containing navigation elements
 * @param {boolean} props.hasProfile Determines whether to render Profile component
 * @param {boolean} props.hasSearch Determines whether to render Search Bar
 * @param {boolean} props.searchOpenOnload Determines if the search field is open on page load
 * @param {string} props.placeHolderText Placeholder value for search input
 * @param {object} props.platform Platform name that appears on L0.
 * @param {string} props.title Title for the masthead L1
 * @param {string} props.eyebrowText Text for the eyebrow link in masthead L1
 * @param {string} props.eyebrowLink URL for the eyebrow link in masthead L1
 * @returns {*} Masthead component
 */
const Masthead = ({
  navigation,
  hasProfile,
  hasSearch,
  searchOpenOnload,
  placeHolderText,
  platform,
  mastheadL1Data,
  ...mastheadProps
}) => {
  /**
   * Returns IBM.com authenticated status
   *
   * @param {boolean} isAuthenticated Whether the user is authenticated to IBM.com
   * @returns {*} The user status
   */
  const [isAuthenticated, setStatus] = useState(false);

  useEffect(() => {
    // initialize global execution calls
    globalInit();
  }, []);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const status = await ProfileAPI.getUserStatus();
      if (!unmounted) {
        setStatus(status.user === 'Authenticated');
      }
    })();
    return () => {
      unmounted = true;
    };
  }, []);

  let [mastheadData, setMastheadData] = useState([]);
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

  const [isMastheadSticky, setIsMastheadSticky] = useState(false);
  const stickyRef = useRef(null);
  const mastheadL1Ref = useRef(null);

  const mastheadSticky = cx({
    [`${prefix}--masthead--sticky`]: isMastheadSticky,
    [`${prefix}--masthead--sticky__l1`]: mastheadL1Ref.current != null,
  });

  const hasPlatform = cx({
    [`${prefix}--masthead__platform`]: platform,
  });

  useEffect(() => {
    /**
     * Sets sticky masthead. If both L0 and L1 are present, L1 will be sticky.
     *
     */
    const hideTopnavThreshold = 0.25;
    const handleScroll = root.addEventListener('scroll', () => {
      /**
       * L0 will hide/show only in the top 25% of the viewport.
       *
       */
      if (mastheadL1Ref.current != null) {
        setIsMastheadSticky(
          root.pageYOffset > root.innerHeight * hideTopnavThreshold
        );
      }
    });

    return () => {
      root.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

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

  /**
   * Determines whether to add class to masthead to hide nav items and
   * display hamburger menu instead to prevent overlapping of menu items
   */
  const [hideNavItems, setHideNavItems] = useState(false);

  /**
   * set nav items to hide/show depending if the window size is smaller/larger to
   * the total width of the masthead items calculated previously
   *
   * @param {object} mediaQuery MediaQueryList object
   */
  const hideShowNavItems = mediaQuery => {
    if (mediaQuery.matches) {
      setHideNavItems(true);
    } else {
      setHideNavItems(false);
    }
  };

  const lgBreakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;

  /**
   * check window size to determine whether to trigger hide/show nav item function
   */
  const onResize = () => {
    if (root.innerWidth >= lgBreakpoint) {
      /**
       * get total width of masthead items (logo, nav menu items, search icons) and set css media query
       * in order to hide nav menu items at the width and show hamburger menu. This prevents menu items
       * from overlapping
       */
      const width = calculateTotalWidth([
        'bx--header__logo',
        'bx--header__nav-container',
        'bx--masthead__platform-name',
        'bx--header__search--actions',
        'bx--header__global',
      ]);

      if (width > lgBreakpoint) {
        const mediaQuery = root.matchMedia(
          `(min-width: ${lgBreakpoint}px) and (max-width: ${width + 50}px)`
        );
        hideShowNavItems(mediaQuery);
        mediaQuery.addListener(hideShowNavItems);

        return () => {
          mediaQuery.removeListener(hideShowNavItems);
        };
      }
    }
  };

  useEffect(() => {
    onResize();
    root.document.addEventListener('resize', onResize);

    return () => {
      root.document.removeEventListener('resize', onResize);
    };
  });

  // set navigation type (default, alternate, or ecosystem) for autoids
  let navType;
  if (!navigation && !platform) {
    navType = 'alt';
  } else if (navigation && !platform) {
    navType = 'default';
  } else if (platform) {
    navType = 'eco';
  }

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <div
          className={cx(`${prefix}--masthead ${mastheadSticky}`, {
            [`${prefix}--masthead--hide-items`]: hideNavItems,
          })}
          ref={stickyRef}>
          <div className={`${prefix}--masthead__l0`}>
            <Header aria-label="IBM" data-autoid={`${stablePrefix}--masthead`}>
              <SkipToContent />

              {(mastheadL1Data || navigation) && (
                <HeaderMenuButton
                  aria-label="Open menu"
                  data-autoid={`${stablePrefix}--masthead__hamburger`}
                  onClick={onClickSideNavExpand}
                  isActive={isSideNavExpanded}
                />
              )}

              <IbmLogo
                autoid={`${stablePrefix}--masthead-${navType}__l0-logo`}
              />

              <div className={`${prefix}--header__search ${hasPlatform}`}>
                {navigation && !mastheadL1Data && (
                  <MastheadTopNav
                    {...mastheadProps}
                    platform={platform}
                    navigation={mastheadData}
                    navType={navType}
                  />
                )}
                {hasSearch && (
                  <MastheadSearch
                    searchOpenOnload={searchOpenOnload}
                    placeHolderText={placeHolderText}
                    navType={navType}
                  />
                )}
              </div>

              {hasProfile && (
                <HeaderGlobalBar>
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
                    navType={navType}
                  />
                </HeaderGlobalBar>
              )}

              {(navigation || mastheadL1Data) && (
                <MastheadLeftNav
                  {...mastheadProps}
                  backButtonText="Back"
                  platform={platform}
                  navigation={mastheadL1Data?.navigationL1 ?? mastheadData}
                  isSideNavExpanded={isSideNavExpanded}
                  navType={navType}
                />
              )}
            </Header>
          </div>
          {mastheadL1Data && DDS_MASTHEAD_L1 && (
            <div ref={mastheadL1Ref}>
              <MastheadL1
                {...mastheadL1Data}
                isShort={isMastheadSticky}
                navType={navType}
              />
            </div>
          )}
        </div>
      )}
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
   * See [this](https://www.ibm.com/common/v18/js/data/jsononly/usen.json) for an example.
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
   * `true` to render SearchBar component.
   */
  hasSearch: PropTypes.bool,

  /**
   * `true` to have search field open on page load.
   */
  searchOpenOnload: PropTypes.bool,

  /**
   * Platform name that appears on L0.
   * Includes platform name (only available with `default` and `custom navigation`).
   * Object requires `name` and `url`.
   * See [docs](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-masthead--default#platform) for more details.
   */
  platform: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),

  /**
   * Placeholder value for search input.
   */
  placeHolderText: PropTypes.string,

  /**
   * All the data that goes to the L1 of the Masthead.
   */
  mastheadL1Data: PropTypes.shape({
    /**
     * Title for the masthead L1 (experimental).
     */
    title: PropTypes.string,

    /**
     * Title optional link for the masthead L1 (experimental).
     */
    titleLink: PropTypes.string,
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
     * See [this](https://www.ibm.com/common/v18/js/data/jsononly/usen.json) for an example.
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
};

Masthead.defaultProps = {
  hasProfile: true,
  hasSearch: true,
  searchOpenOnload: false,
  platform: null,
  placeHolderText: 'Search all of IBM',
  mastheadL1Data: null,
};

export default Masthead;
