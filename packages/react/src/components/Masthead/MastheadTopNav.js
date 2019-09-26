/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import {
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderName,
} from 'carbon-components-react';

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
          data-autoid={`${stablePrefix}--masthead__l0-nav--nav-${i}`}>
          {link.menuSections[0].menuItems[
            i
          ].megapanelContent.quickLinks.links.map((item, j) => {
            return (
              <HeaderMenuItem
                href={item.url}
                data-autoid={`${stablePrefix}--masthead__l0-nav--subnav-${j}`}>
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
          data-autoid={`${stablePrefix}--masthead__l0-nav--nav-${i}`}>
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
 * @property propTypes
 * @description Defined property types for component
 * @type {{navigation: {}}}
 */
MastheadTopNav.propTypes = {
  navigation: PropTypes.array,
};

export default MastheadTopNav;
