/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { User20, UserOnline20 } from '@carbon/icons-react';
import { analytics } from '@carbon/ibmdotcom-utilities';
import { IbmLogo } from '../Icon';
import {
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderGlobalBar,
  SkipToContent,
} from 'carbon-components-react';
import { ProfileAPI, TranslationAPI } from '@carbon/ibmdotcom-services';
import MastheadSearch from './MastheadSearch';
import MastheadProfile from './MastheadProfile';
import MastheadLeftNav from './MastheadLeftNav';
import MastheadTopNav from './MastheadTopNav';
import cx from 'classnames';

const { prefix } = settings;

/**
 * MastHead component
 *
 * @typedef {object} navigation Object containing navigation elements
 * @param {string} type Type of masthead
 * @returns {*} Masthead component
 */
const Masthead = ({ navigation, ...mastheadProps }) => {
  /**
   * Returns IBM.com authenticated status
   *
   * @param {boolean} isAuthenticated Whether the user is authenticated to IBM.com
   * @returns {*} The user status
   */
  const [isAuthenticated, setStatus] = useState(false);
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

  const className = cx({
    [`${prefix}--header__logo`]: true,
    // [`${prefix}--header__logo--platform`]: navigation.platform,
  });

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

  switch (typeof navigation) {
    case 'string':
      // eslint-disable-next-line
      mastheadData = mastheadData;
      break;
    case 'object':
      mastheadData = navigation;
      break;
    case false:
      break;
    default:
      break;
  }

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="IBM" data-autoid="masthead">
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Open menu"
              data-autoid="masthead__hamburger"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <div className={className}>
              <a
                href="https://ibm.com"
                onMouseEnter={() =>
                  analytics({
                    type: 'element',
                    primaryCategory: 'MASTHEAD',
                    eventName: 'HOVER',
                    executionPath: 'masthead__logo',
                    execPathReturnCode: 'none',
                    targetTitle: 'logo',
                  })
                }>
                <IbmLogo data-autoid="masthead__logo" />
              </a>
            </div>
            <div className={`${prefix}--header__search`}>
              {navigation !== false ? (
                <MastheadTopNav {...mastheadProps} navigation={mastheadData} />
              ) : null}
              <MastheadSearch />
            </div>

            <HeaderGlobalBar>
              <MastheadProfile
                overflowMenuProps={{
                  flipped: true,
                  style: { width: 'auto' },
                  renderIcon: () =>
                    isAuthenticated ? <UserOnline20 /> : <User20 />,
                }}
                profileMenu={
                  isAuthenticated ? profileData.signedin : profileData.signedout
                }
              />
            </HeaderGlobalBar>
            <MastheadLeftNav
              navigation={mastheadData}
              isSideNavExpanded={isSideNavExpanded}
            />
          </Header>
        </>
      )}
    />
  );
};

/**
 * @property propTypes
 * @description Defined property types for component
 * @type {{navigation: {}}}
 */
Masthead.propTypes = {
  navigation: PropTypes.object,
};

export default Masthead;
