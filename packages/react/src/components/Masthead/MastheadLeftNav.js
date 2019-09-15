/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from 'carbon-components-react';

/**
 * Masthead left nav component
 *
 * @typedef {object} navigation Object containing left navigation elements
 * @param {boolean} isSideNavExpanded Is side nav expanded
 * @returns {*} Masthead left nav component
 */
const MastheadLeftNav = ({ navigation, isSideNavExpanded }) => {
  /**
   * Left side navigation
   *
   * @returns {*} Left side navigation
   */
  const sideNav = navigation.map((link, i) => {
    if (link.hasMenu) {
      return (
        <SideNavMenu aria-label={link.title} title={link.title}>
          {link.menuSections[0].menuItems[
            i
          ].megapanelContent.quickLinks.links.map((item, j) => {
            return (
              <SideNavMenuItem
                href={item.url}
                data-autoid={`masthead__l0-sidenav--subnav-${j}`}>
                {item.title}
              </SideNavMenuItem>
            );
          })}
        </SideNavMenu>
      );
    } else {
      return (
        <SideNavLink
          href={link.url}
          data-autoid={`masthead__l0-sidenav--nav-${i}`}>
          {link.title}
        </SideNavLink>
      );
    }
  });

  return (
    <SideNav
      aria-label="Side navigation"
      expanded={isSideNavExpanded}
      isPersistent={false}>
      <div data-autoid="masthead__l0-sidenav">
        <SideNavItems>
          <HeaderSideNavItems>{sideNav}</HeaderSideNavItems>
        </SideNavItems>
      </div>
    </SideNav>
  );
};

/**
 * @property propTypes
 * @description Defined property types for component
 * @type {{isSideNavExpanded: boolean, navigation: {}}}
 */
MastheadLeftNav.propTypes = {
  navigation: PropTypes.object,
  isSideNavExpanded: PropTypes.bool,
};

export default MastheadLeftNav;
