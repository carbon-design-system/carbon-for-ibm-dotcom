/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Search20 from '@carbon/icons-react/lib/search/20';
import UserProfile20 from '@carbon/icons-react/lib/user--profile/20';
import { ReactComponent as Logo } from '../Icons/svg/ibm-logo.svg';
import HeaderContainer from 'carbon-components-react/lib/components/UIShell/HeaderContainer';
import {
  Header,
  HeaderMenuButton,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderSideNavItems,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from 'carbon-components-react/lib/components/UIShell';

/**
 * Test MastHead component
 *
 * @typedef {object} navigation Object containing navigation elements
 * @param {string} type Standard or Branded masthead
 * @returns {*} Masthead component
 * @class
 */
const Masthead = ({ navigation, type }) => {
  if (type === 'branded') {
    return (
      <div className="masthead">
        <p>This is a branded masthead</p>
      </div>
    );
  } else {
    return (
      <div className="container">
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <>
              <Header aria-label="IBM">
                <SkipToContent />
                <HeaderMenuButton
                  aria-label="Open menu"
                  onClick={onClickSideNavExpand}
                  isActive={isSideNavExpanded}
                />
                <Logo />
                <HeaderNavigation aria-label="IBM">
                  {navigation.map(item => {
                    if (item.subnav) {
                      return (
                        <HeaderMenu
                          aria-label={item.name}
                          menuLinkName={item.name}>
                          {item.subnav.map(subnav => {
                            return (
                              <HeaderMenuItem href={subnav.path}>
                                {subnav.name}
                              </HeaderMenuItem>
                            );
                          })}
                        </HeaderMenu>
                      );
                    } else {
                      return (
                        <HeaderMenuItem href={item.path}>
                          {item.name}
                        </HeaderMenuItem>
                      );
                    }
                  })}
                </HeaderNavigation>
                <HeaderGlobalBar>
                  <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
                    <Search20 />
                  </HeaderGlobalAction>
                  <HeaderGlobalAction
                    aria-label="User Profile"
                    onClick={() => {}}>
                    <UserProfile20 />
                  </HeaderGlobalAction>
                </HeaderGlobalBar>
                <SideNav
                  aria-label="Side navigation"
                  expanded={isSideNavExpanded}
                  isPersistent={false}>
                  <SideNavItems>
                    <HeaderSideNavItems>
                      {navigation.map(item => {
                        if (item.subnav) {
                          return (
                            <SideNavMenu
                              aria-label={item.name}
                              title={item.name}>
                              {item.subnav.map(subnav => {
                                return (
                                  <SideNavMenuItem href={subnav.path}>
                                    {subnav.name}
                                  </SideNavMenuItem>
                                );
                              })}
                            </SideNavMenu>
                          );
                        } else {
                          return (
                            <SideNavLink href={item.path}>
                              {item.name}
                            </SideNavLink>
                          );
                        }
                      })}
                    </HeaderSideNavItems>
                  </SideNavItems>
                </SideNav>
              </Header>
            </>
          )}
        />
      </div>
    );
  }
};

Masthead.propTypes = {
  /**
   * Navigation elements object to populate the masthead.
   * See ./MastheadLinks.js for example structure.
   */
  navigation: PropTypes.object,

  /**
   * Specify Masthead type
   */
  type: PropTypes.string,
};

export default Masthead;
