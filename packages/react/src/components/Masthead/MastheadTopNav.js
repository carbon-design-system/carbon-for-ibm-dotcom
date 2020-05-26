/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import HeaderMenu from '../carbon-components-react/UIShell/HeaderMenu';
import HeaderMenuItem from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderMenuItem';
import HeaderName from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderName';
import HeaderNavigation from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderNavigation';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Masthead top nav component.
 */
const MastheadTopNav = ({ navigation, ...topNavProps }) => {
  /**
   * Top masthead navigation
   *
   * @returns {*} Top masthead navigation
   */
  const mastheadLinks = navigation.map((link, i) => {
    if (link.hasMenu) {
      return (
        <HeaderMenu
          aria-label={link.title}
          menuLinkName={link.title}
          data-autoid={`${stablePrefix}--masthead__l0-nav--nav-${i}`}
          key={i}>
          {renderNav(link.menuSections)}
        </HeaderMenu>
      );
    } else {
      return (
        <HeaderMenuItem
          href={link.url}
          data-autoid={`${stablePrefix}--masthead__l0-nav--nav-${i}`}
          key={i}>
          {link.title}
        </HeaderMenuItem>
      );
    }
  });

  return (
    <div className={`${prefix}--header__nav-container`}>
      {topNavProps.platform && (
        <HeaderName
          prefix=""
          href={topNavProps.platform.url}
          data-autoid={`${stablePrefix}--masthead__platform-name`}>
          {topNavProps.platform.name}
        </HeaderName>
      )}
      <HeaderNavigation
        aria-label="IBM"
        data-autoid={`${stablePrefix}--masthead__l0-nav`}>
        {mastheadLinks}
      </HeaderNavigation>
    </div>
  );
};

/**
 * Loops through and renders a list of links for the masthead nav
 *
 * @param {Array} sections A list of links to be rendered
 * @returns {object} JSX object
 */
function renderNav(sections) {
  const navItems = [];
  sections.forEach((section, i) => {
    section.menuItems.forEach((item, j) => {
      navItems.push(
        <HeaderMenuItem
          href={item.url}
          data-autoid={`${stablePrefix}--masthead__l0-nav--subnav-col${i}-item${j}`}
          key={item.title}>
          {item.title}
        </HeaderMenuItem>
      );
    });
  });
  return navItems;
}

MastheadTopNav.propTypes = {
  /**
   * Object containing top navigation elements.
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
};

export default MastheadTopNav;
