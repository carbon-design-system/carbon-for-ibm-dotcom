/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
} from 'carbon-components-react';
import HeaderMenu from '../carbon-components-react/UIShell/HeaderMenu';
import PropTypes from 'prop-types';
import React from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';

const { stablePrefix } = ddsSettings;

/**
 * Masthead top nav component
 *
 * @param {object} navigation Object containing top navigation elements
 * @returns {*} Masthead top nav component
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
    <>
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
    </>
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

/**
 * @property propTypes
 * @description Defined property types for component
 * @type {{navigation: {}}}
 */
MastheadTopNav.propTypes = {
  navigation: PropTypes.array,
};

export default MastheadTopNav;
