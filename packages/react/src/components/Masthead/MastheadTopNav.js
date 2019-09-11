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
import { IbmLogo } from '../Icon';
import {
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderSideNavItems,
  SkipToContent,
} from 'carbon-components-react';

const { prefix } = settings;

/**
 * MastHead top navigation component
 *
 * @typedef {object} navigation Object containing navigation elements
 * @param {string} type Type of masthead
 * @returns {*} Masthead component
 */
const MastheadTopNav = ({ navigation }) => {
  const mastheadNav = mastheadData.map((link, i) => {
    if (link.hasMenu) {
      return (
        <HeaderMenu
          aria-label={link.title}
          menuLinkName={link.title}
          data-autoid={`${prefix}--masthead__l0-nav--nav-${i}`}>
          {link.menuSections[0].menuItems[
            i
          ].megapanelContent.quickLinks.links.map((item, j) => {
            return (
              <HeaderMenuItem
                href={item.url}
                data-autoid={`masthead__l0-nav--subnav-${j}`}>
                {item.title}
              </HeaderMenuItem>
            );
          })}
        </HeaderMenu>
      );
    } else {
      return (
        <HeaderMenuItem
          href={link.url}
          data-autoid={`${prefix}--masthead__l0-nav--nav-${i}`}>
          {link.title}
        </HeaderMenuItem>
      );
    }
  });
};

MastheadTopNav.propTypes = {
  /**
   * Navigation elements object to populate the masthead.
   * See ./MastheadLinks.js for example structure.
   */
  navigation: PropTypes.object,
};

export default MastheadTopNav;
