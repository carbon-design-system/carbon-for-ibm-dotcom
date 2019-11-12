/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import root from 'window-or-global';
import { globalInit } from '@carbon/ibmdotcom-utilities';
import { User20, UserOnline20 } from '@carbon/icons-react';
import { IbmLogo } from '../Icon';
import {
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderGlobalBar,
  SkipToContent,
} from 'carbon-components-react';
import { ProfileAPI, TranslationAPI } from '@carbon/ibmdotcom-services';
import MastheadL1 from './MastheadL1';
import MastheadSearch from './MastheadSearch';
import MastheadProfile from './MastheadProfile';
import MastheadLeftNav from './MastheadLeftNav';
import MastheadTopNav from './MastheadTopNav';
import cx from 'classnames';
import { MASTHEAD_L1 } from '../../internal/FeatureFlags';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * MastHead component
 *
 * @typedef {object} navigation Object containing navigation elements
 * @param {string} type Type of masthead
 * @returns {*} Masthead component
 */
const Masthead = ({ navigation, hasProfile, hasSearch, ...mastheadProps }) => {
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
    /**
     *  Login Status of user
     *
     *  @returns {*} User authentication status
     */
    async function loginStatus() {
      return await ProfileAPI.getUserStatus();
    }
    const status = loginStatus();
    status.then(result => setStatus(result.user === 'Authenticated'));
  }, []);

  let [mastheadData, setMastheadData] = useState([]);
  const [profileData, setProfileData] = useState({
    signedin: [],
    signedout: [],
  });

  useEffect(() => {
    /**
     * Page data including masthead, footer, profile links
     *
     * @returns {*} Page data object
     */
    async function getPageData() {
      return await TranslationAPI.getTranslation();
    }
    const pageData = getPageData();
    pageData.then(result => {
      setMastheadData(result.mastheadNav.links);
      setProfileData(result.profileMenu);
    });
  }, []);

  const [isMastheadSticky, setIsMastheadSticky] = useState(false);
  const stickyRef = useRef(null);
  const mastheadL1Ref = useRef(null);

  const mastheadSticky = cx({
    [`${prefix}--masthead--sticky`]: isMastheadSticky,
    [`${prefix}--masthead--sticky__l1`]: mastheadL1Ref.current != null,
  });

  const hasPlatform = cx({
    [`${prefix}--masthead__platform`]: mastheadProps.platform,
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
      case 'string':
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
                    navigation={mastheadData}
                  />
                )}
                {hasSearch && (
                  <MastheadSearch
                    searchOpenOnload={mastheadProps.searchOpenOnload}
                    placeHolderText={mastheadProps.placeHolderText}
                  />
                )}
              </div>

              {hasProfile && (
                <HeaderGlobalBar>
                  <MastheadProfile
                    overflowMenuProps={{
                      flipped: true,
                      style: { width: 'auto' },
                      renderIcon: () =>
                        isAuthenticated ? <UserOnline20 /> : <User20 />,
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
                  navigation={mastheadData}
                  isSideNavExpanded={isSideNavExpanded}
                />
              )}
            </Header>
          </div>
          {MASTHEAD_L1 && navigation && (
            <div ref={mastheadL1Ref}>
              <MastheadL1 />
            </div>
          )}
        </div>
      )}
    />
  );
};

/**
 * @property propTypes
 * @description Defined property types for component
 *
 * @type {{mastheadProp: object, navigation: object, hasProfile: boolean, hasSearch: boolean}}
 */
Masthead.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  hasProfile: PropTypes.bool,
  hasSearch: PropTypes.bool,
  mastheadProp: PropTypes.object,
};

/**
 * @property defaultProps
 * @type {{hasProfile: boolean, hasSearch: boolean}}
 */
Masthead.defaultProps = {
  hasProfile: true,
  hasSearch: true,
};

export default Masthead;
