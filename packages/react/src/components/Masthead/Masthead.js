/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ProfileAPI,
  TranslationAPI,
  globalInit,
} from '@carbon/ibmdotcom-services';
import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { DDS_MASTHEAD_L1 } from '../../internal/FeatureFlags';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
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
import PropTypes from 'prop-types';
import root from 'window-or-global';
import settings from 'carbon-components/es/globals/js/settings';
import SkipToContent from '../../internal/vendor/carbon-components-react/components/UIShell/SkipToContent';
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
  title,
  eyebrowText,
  eyebrowLink,
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
      const pageData = await TranslationAPI.getTranslation();
      if (!unmounted) {
        setMastheadData(pageData.mastheadNav.links);
        setProfileData(pageData.profileMenu);
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

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <div
          className={`${prefix}--masthead ${mastheadSticky}`}
          ref={stickyRef}>
          <div className={`${prefix}--masthead__l0`}>
            <Header aria-label="IBM" data-autoid={`${stablePrefix}--masthead`}>
              <SkipToContent />

              {navigation && (
                <HeaderMenuButton
                  aria-label="Open menu"
                  data-autoid={`${stablePrefix}--masthead__hamburger`}
                  onClick={onClickSideNavExpand}
                  isActive={isSideNavExpanded}
                />
              )}

              <IbmLogo />

              <div className={`${prefix}--header__search ${hasPlatform}`}>
                {navigation && (
                  <MastheadTopNav
                    {...mastheadProps}
                    platform={platform}
                    navigation={mastheadData}
                  />
                )}
                {hasSearch && (
                  <MastheadSearch
                    searchOpenOnload={searchOpenOnload}
                    placeHolderText={placeHolderText}
                  />
                )}
              </div>

              {hasProfile && (
                <HeaderGlobalBar>
                  <MastheadProfile
                    overflowMenuProps={{
                      ariaLabel: 'User Profile',
                      'data-autoid': `${stablePrefix}--masthead__profile`,
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
                  />
                </HeaderGlobalBar>
              )}

              {navigation && (
                <MastheadLeftNav
                  {...mastheadProps}
                  navigation={mastheadData}
                  isSideNavExpanded={isSideNavExpanded}
                />
              )}
            </Header>
          </div>
          {DDS_MASTHEAD_L1 && navigation && (
            <div ref={mastheadL1Ref}>
              <MastheadL1
                isShort={isMastheadSticky}
                title={title}
                eyebrowText={eyebrowText}
                eyebrowLink={eyebrowLink}
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
   * Navigation data object/string for Masthead. Use one from below:
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
   * Title for the masthead L1 (experimental).
   */
  title: PropTypes.string,

  /**
   * Text for the eyebrow link in masthead L1 (experimental).
   */
  eyebrowText: PropTypes.string,

  /**
   * URL for the eyebrow link in masthead L1 (experimental).
   */
  eyebrowLink: PropTypes.string,
};

Masthead.defaultProps = {
  hasProfile: true,
  hasSearch: true,
  searchOpenOnload: false,
  platform: null,
  placeHolderText: 'Search all of IBM',
  title: null,
  eyebrowText: null,
  eyebrowLink: null,
};

export default Masthead;
