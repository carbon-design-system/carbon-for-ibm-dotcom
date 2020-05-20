/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Header,
  HeaderContainer,
  HeaderGlobalBar,
  HeaderMenuButton,
  SkipToContent,
} from 'carbon-components-react';
import {
  ProfileAPI,
  TranslationAPI,
  globalInit,
} from '@carbon/ibmdotcom-services';
import React, { useEffect, useRef, useState } from 'react';
import { User20, UserOnline20 } from '@carbon/icons-react';
import cx from 'classnames';
import { DDS_MASTHEAD_L1 } from '../../internal/FeatureFlags';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { IbmLogo } from '../Icon';
import MastheadL1 from './MastheadL1';
import MastheadLeftNav from './MastheadLeftNav';
import MastheadProfile from './MastheadProfile';
import MastheadSearch from './MastheadSearch';
import MastheadTopNav from './MastheadTopNav';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import { settings } from 'carbon-components';

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

/**
 * @property {object} propTypes Masthead propTypes
 * @description Defined property types for component
 *
 * @type {{mastheadProps: object, navigation: object, hasProfile: boolean, hasSearch: boolean}}
 */
Masthead.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  hasProfile: PropTypes.bool,
  hasSearch: PropTypes.bool,
  searchOpenOnload: PropTypes.bool,
  platform: PropTypes.object,
  placeHolderText: PropTypes.string,
  title: PropTypes.string,
  eyebrowText: PropTypes.string,
  eyebrowLink: PropTypes.string,
  mastheadProps: PropTypes.object,
};

/**
 * @property {object} defaultProps default Masthead props
 * @type {{hasProfile: boolean, hasSearch: boolean}}
 */
Masthead.defaultProps = {
  hasProfile: true,
  hasSearch: true,
  searchOpenOnload: false,
  platform: null,
  placeHolderText: 'Search all of IBM',
  title: null,
  eyebrowText: null,
  eyebrowLink: null,
  mastheadProps: null,
};

export default Masthead;
