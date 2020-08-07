/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import HeaderSideNavItems from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderSideNavItems';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import SideNav from '../../internal/vendor/carbon-components-react/components/UIShell/SideNav';
import SideNavItems from '../../internal/vendor/carbon-components-react/components/UIShell/SideNavItems';
import SideNavLink from '../../internal/vendor/carbon-components-react/components/UIShell/SideNavLink';
import SideNavMenuItem from '../../internal/vendor/carbon-components-react/components/UIShell/SideNavMenuItem';
import SideNavMenuWithBackFoward from '../carbon-components-react/UIShell/SideNavMenuWithBackForward';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Masthead left nav component.
 */
const MastheadLeftNav = ({
  backButtonText,
  navigation,
  isSideNavExpanded,
  platform,
}) => {
  /**
   * Left side navigation
   *
   * @returns {*} Left side navigation
   */
  const sideNav = navigation.map((link, i) => {
    if (link.hasMenu) {
      return (
        <SideNavMenuWithBackFoward
          title={link.title}
          backButtonText={backButtonText}
          key={i}>
          {renderNavSections(link.menuSections, backButtonText)}
        </SideNavMenuWithBackFoward>
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
        {platform && (
          <a
            data-autoid={`${stablePrefix}--side-nav__submenu-platform`}
            href={platform.url}
            aria-haspopup="true"
            className={`${prefix}--side-nav__submenu ${prefix}--side-nav__submenu-platform`}>
            {platform.name}
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
 * @param {Array} sections A list of link sections to be rendered
 * @returns {object} JSX object
 */
function renderNavSections(sections, backButtonText) {
  const sectionItems = [];
  sections.forEach((section, i) => {
    section.menuItems.forEach((item, j) => {
      if (item.megapanelContent) {
        sectionItems.push(
          <SideNavMenuWithBackFoward
            title={item.title}
            titleUrl={item.url}
            backButtonText={backButtonText}
            key={j}>
            {renderNavItem(item.megapanelContent.quickLinks.links)}
          </SideNavMenuWithBackFoward>
        );
      } else {
        sectionItems.push(
          <SideNavMenuItem
            href={item.url}
            data-autoid={`${stablePrefix}--masthead__l0-sidenav--subnav-col${i}-item${j}`}
            key={item.title}>
            {item.title}
          </SideNavMenuItem>
        );
      }
    });
  });

  return sectionItems;
}

/**
 * Loops through and renders a list of links for the side nav
 *
 * @param {Array} items A list of links to be rendered
 * @returns {object} JSX object
 */
function renderNavItem(items) {
  const navItems = [];
  items.forEach((item, i) => {
    navItems.push(
      <SideNavMenuItem
        href={item.url}
        data-autoid={`${stablePrefix}--masthead__l0-sidenav--subnav-col${i}-item${i}`}
        key={item.title}>
        {item.title}
      </SideNavMenuItem>
    );
  });
  return navItems;
}

MastheadLeftNav.propTypes = {
  /**
   * Back button text
   */
  backButtonText: PropTypes.string,

  /**
   * Object containing left navigation elements.
   */
  navigation: PropTypes.arrayOf(
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
  /**
   * `true` to make the sidenav expanded.
   */
  isSideNavExpanded: PropTypes.bool,

  /**
   * Platform object with name and url
   */
  platform: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
};

MastheadLeftNav.defaultProps = {
  backButtonText: 'Back',
};

export default MastheadLeftNav;
