/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowLeft16 from '@carbon/icons-react/es/arrow--left/16';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import HeaderSideNavItems from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderSideNavItems';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import SideNav from '../../internal/vendor/carbon-components-react/components/UIShell/SideNav';
import SideNavItems from '../../internal/vendor/carbon-components-react/components/UIShell/SideNavItems';
import SideNavLink from '../../internal/vendor/carbon-components-react/components/UIShell/SideNavLink';
import SideNavMenu from '../carbon-components-react/UIShell/SideNavMenu';
import SideNavMenuItem from '../../internal/vendor/carbon-components-react/components/UIShell/SideNavMenuItem';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Masthead left nav component
 *
 * @param {object} props react proptypes
 * @param {object} props.navigation Object containing left navigation elements
 * @param {boolean} props.isSideNavExpanded Is sidenav expanded
 * @returns {*} Masthead left nav component
 */
const MastheadLeftNav = ({
  navigation,
  isSideNavExpanded,
  ...leftNavProps
}) => {
  /**
   * Left side navigation
   *
   * @returns {*} Left side navigation
   */
  const sideNav = navigation.map((link, i) => {
    if (link.hasMenu) {
      return (
        <SideNavMenu title={link.title} key={i}>
          <SideNavMenuItem
            onClick={event => event.preventDefault()}
            className={`${prefix}--masthead__side-nav--submemu-back`}
            data-autoid={`${stablePrefix}--masthead__l0-sidenav--subnav-back-${i}`}
            isbackbutton="true"
            key={i}>
            <ArrowLeft16 />
            Back
          </SideNavMenuItem>
          <li className={`${prefix}--masthead__side-nav--submemu-title`}>
            {link.title}
          </li>
          {renderNav(link.menuSections)}
        </SideNavMenu>
      );
    } else {
      return (
        <SideNavLink
          href={link.url}
          data-autoid={`${stablePrefix}--masthead__l0-sidenav--nav-${i}`}
          key={i}>
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
      <nav data-autoid={`${stablePrefix}--masthead__l0-sidenav`}>
        {leftNavProps.platform && (
          <a
            data-autoid={`${stablePrefix}--side-nav__submenu-platform`}
            href={leftNavProps.platform.url}
            aria-haspopup="true"
            className={`${prefix}--side-nav__submenu ${prefix}--side-nav__submenu-platform`}>
            {leftNavProps.platform.name}
          </a>
        )}
        <SideNavItems>
          <HeaderSideNavItems>{sideNav}</HeaderSideNavItems>
        </SideNavItems>
      </nav>
    </SideNav>
  );
};

/**
 * Loops through and renders a list of links for the side nav
 *
 * @param {Array} sections A list of links to be rendered
 * @returns {object} JSX object
 */
function renderNav(sections) {
  const navItems = [];
  sections.forEach((section, i) => {
    section.menuItems.forEach((item, j) => {
      navItems.push(
        <SideNavMenuItem
          href={item.url}
          data-autoid={`${stablePrefix}--masthead__l0-sidenav--subnav-col${i}-item${j}`}
          key={item.title}>
          {item.title}
        </SideNavMenuItem>
      );
    });
  });
  return navItems;
}

/**
 * @property {object} propTypes MastheadLeftNav propTypes
 * @description Defined property types for component
 * @type {{isSideNavExpanded: boolean, navigation: []}}
 */
MastheadLeftNav.propTypes = {
  navigation: PropTypes.array,
  isSideNavExpanded: PropTypes.bool,
};

export default MastheadLeftNav;
