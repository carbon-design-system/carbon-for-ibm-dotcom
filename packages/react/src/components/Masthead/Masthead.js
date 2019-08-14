/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import MastheadSearch from './MastheadSearch';
import HeaderContainer from 'carbon-components-react/lib/components/UIShell/HeaderContainer';
import UserProfile20 from '@carbon/icons-react/lib/user--profile/20';
import { ReactComponent as Logo }  from '../Icon/svg/ibm-logo.svg';
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
import { settings } from 'carbon-components';
import '@ibmdotcom/styles/scss/components/masthead/_masthead.scss';

const { prefix } = settings;

/**
 * MastHead component
 *
 * @typedef {object} navigation Object containing navigation elements
 * @param {string} type Type of masthead
 * @returns {*} Masthead component
 */
const Masthead = ({ navigation, type }) => {
  return (
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
            {type === 'branded' ? (
              <>
              <Logo />
              <HeaderName href="#" prefix="">
                [Platform]
              </HeaderName>
              </>
            ) : (
              <Logo />
            )}

            <div className={`${prefix}--header__search`}>
              <HeaderNavigation aria-label="IBM">
                {navigation.map(item => {
                  if (item.subnav) {
                    return (
                      <HeaderMenu
                        aria-label={item.name}
                        menuLinkName={item.name}
                      >
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
                    return <HeaderMenuItem href={item.path}>{item.name}</HeaderMenuItem>;
                  }
                })}
              </HeaderNavigation>
              <MastheadSearch />
            </div>
              <HeaderGlobalBar>
                <HeaderGlobalAction
                  aria-label="User Profile"
                  onClick={() => {}}
                >
                  <UserProfile20 />
                </HeaderGlobalAction>
              </HeaderGlobalBar>

            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              isPersistent={false}
            >
              <SideNavItems>
                <HeaderSideNavItems>
                  {navigation.map(item => {
                    if (item.subnav) {
                      return (
                        <SideNavMenu
                          aria-label={item.name}
                          title={item.name}
                        >
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
  );
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
