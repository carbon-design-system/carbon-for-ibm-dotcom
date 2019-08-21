/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import MastheadSearch from './MastheadSearch';
import { settings } from 'carbon-components';
import HeaderContainer from 'carbon-components-react/lib/components/UIShell/HeaderContainer';
import UserProfile20 from '@carbon/icons-react/lib/user--profile/20';
import { ReactComponent as Logo } from '../Icon/svg/ibm-logo.svg';
import {
  Header,
  HeaderMenuButton,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderName,
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
import '@ibmdotcom/styles/scss/components/masthead/_masthead.scss';

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
            {navigation.platform ? (
              <>
                <div
                  className={`${prefix}--header__logo ${prefix}--header__logo--platform`}>
                  <a href="https://ibm.com">
                    <Logo data-autoid={`${prefix}--masthead__logo`} />
                  </a>
                </div>
                <HeaderName
                  prefix=""
                  href={navigation.platform.path}
                  data-autoid={`${prefix}--masthead__platform-name`}>
                  {navigation.platform.name}
                </HeaderName>
              </>
            ) : (
              <div className={`${prefix}--header__logo`}>
                <a href="https://ibm.com">
                  <Logo data-autoid={`${prefix}--masthead__logo`} />
                </a>
              </div>
            )}

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
                <UserProfile20 />
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
