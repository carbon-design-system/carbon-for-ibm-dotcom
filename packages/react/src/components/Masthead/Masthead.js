/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import User20 from '@carbon/icons-react/es/user/20';
import { IbmLogo } from '../Icon';
import Header from 'carbon-components-react/es/components/UIShell/Header';
import HeaderContainer from 'carbon-components-react/es/components/UIShell/HeaderContainer';
import HeaderMenuButton from 'carbon-components-react/es/components/UIShell/HeaderMenuButton';
import HeaderGlobalBar from 'carbon-components-react/es/components/UIShell/HeaderGlobalBar';
import HeaderGlobalAction from 'carbon-components-react/es/components/UIShell/HeaderGlobalAction';
import HeaderName from 'carbon-components-react/es/components/UIShell/HeaderName';
import HeaderNavigation from 'carbon-components-react/es/components/UIShell/HeaderNavigation';
import HeaderMenu from 'carbon-components-react/es/components/UIShell/HeaderMenu';
import HeaderMenuItem from 'carbon-components-react/es/components/UIShell/HeaderMenuItem';
import HeaderSideNavItems from 'carbon-components-react/es/components/UIShell/HeaderSideNavItems';
import SkipToContent from 'carbon-components-react/es/components/UIShell/SkipToContent';
import SideNav from 'carbon-components-react/es/components/UIShell/SideNav';
import SideNavItems from 'carbon-components-react/es/components/UIShell/SideNavItems';
import SideNavLink from 'carbon-components-react/es/components/UIShell/SideNavLink';
import SideNavMenu from 'carbon-components-react/es/components/UIShell/SideNavMenu';
import SideNavMenuItem from 'carbon-components-react/es/components/UIShell/SideNavMenuItem';
import MastheadSearch from './MastheadSearch';
import cx from 'classnames';

const { prefix } = settings;

/**
 * MastHead component
 *
 * @typedef {object} navigation Object containing navigation elements
 * @param {string} type Type of masthead
 * @returns {*} Masthead component
 */
const Masthead = ({ navigation }) => {
  const navigationLinks = navigation.links;

  const className = cx({
    [`${prefix}--header__logo`]: true,
    [`${prefix}--header__logo--platform`]: navigation.platform,
  });

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="IBM" data-autoid={`${prefix}--masthead`}>
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Open menu"
              data-autoid={`${prefix}--masthead__hamburger`}
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <div className={className}>
              <a href="https://ibm.com">
                <IbmLogo data-autoid={`${prefix}--masthead__logo`} />
              </a>
            </div>
            {navigation.platform ? (
              <HeaderName
                prefix=""
                href={navigation.platform.path}
                data-autoid={`${prefix}--masthead__platform-name`}>
                {navigation.platform.name}
              </HeaderName>
            ) : null}
            <div className={`${prefix}--header__search`}>
              <HeaderNavigation
                aria-label="IBM"
                data-autoid={`${prefix}--masthead__l0-nav`}>
                {navigationLinks.map((item, index) => {
                  if (item.subnav) {
                    return (
                      <HeaderMenu
                        aria-label={item.name}
                        menuLinkName={item.name}
                        data-autoid={`${prefix}--masthead__l0-nav--nav-${index}`}>
                        {item.subnav.map((subnav, index) => {
                          return (
                            <HeaderMenuItem
                              href={subnav.path}
                              data-autoid={`masthead__l0-nav--subnav-${index}`}>
                              {subnav.name}
                            </HeaderMenuItem>
                          );
                        })}
                      </HeaderMenu>
                    );
                  } else {
                    return (
                      <HeaderMenuItem
                        href={item.path}
                        data-autoid={`${prefix}--masthead__l0-nav--nav-${index}`}>
                        {item.name}
                      </HeaderMenuItem>
                    );
                  }
                })}
              </HeaderNavigation>
              <MastheadSearch />
            </div>

            <HeaderGlobalBar>
              <HeaderGlobalAction
                aria-label="User Profile"
                data-autoid={`${prefix}--masthead__profile`}
                onClick={() => {}}>
                <User20 />
              </HeaderGlobalAction>
            </HeaderGlobalBar>

            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              isPersistent={false}>
              <div data-autoid={`${prefix}--masthead__l0-sidenav`}>
                <SideNavItems>
                  <HeaderSideNavItems>
                    {navigationLinks.map((item, index) => {
                      if (item.subnav) {
                        return (
                          <SideNavMenu aria-label={item.name} title={item.name}>
                            {item.subnav.map((subnav, index) => {
                              return (
                                <SideNavMenuItem
                                  href={subnav.path}
                                  data-autoid={`${prefix}--masthead__l0-sidenav--subnav-${index}`}>
                                  {subnav.name}
                                </SideNavMenuItem>
                              );
                            })}
                          </SideNavMenu>
                        );
                      } else {
                        return (
                          <SideNavLink
                            href={item.path}
                            data-autoid={`${prefix}--masthead__l0-sidenav--nav-${index}`}>
                            {item.name}
                          </SideNavLink>
                        );
                      }
                    })}
                  </HeaderSideNavItems>
                </SideNavItems>
              </div>
            </SideNav>
          </Header>
        </>
      )}
    />
  );
};

Masthead.propTypes = {
  /**
   * Navigation elements object to populate the masthead.
   * See ./MastheadLinks.js for example structure.
   */
  navigation: PropTypes.object,
};

export default Masthead;
