/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import {
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderName,
} from 'carbon-components-react';
import { analytics } from '@carbon/ibmdotcom-utilities';

const { prefix } = settings;

/**
 * Masthead top nav component
 *
 * @param {object} navigation Object containing top navigation elements
 * @returns {*} Masthead top nav component
 */
const MastheadTopNav = ({ navigation, ...topNavprops }) => {
  /**
   * Event data for CoreMetrics
   *
   * @param {string} title title of the menu item
   * @param {number} key key for id of menu item
   * @param {string} type type of element
   * @returns {object} event fields
   */
  const menuItemEventData = (title, key, type) => ({
    type: 'element',
    primaryCategory: 'MASTHEAD',
    eventName: 'HOVER',
    executionPath: `masthead__l0-nav--nav-${key}`,
    execPathReturnCode: type,
    targetTitle: title,
  });

  /**
   * Top masthead navigation
   *
   * @returns {*} Top masthead navigation
   */
  const mastheadLinks = navigation.map((link, i) => {
    if (link.hasMenu) {
      return (
        <div
          className={`${prefix}--masthead__nav-item`}
          onMouseEnter={() =>
            analytics(menuItemEventData(link.title, i, 'dropdown'))
          }>
          <HeaderMenu
            onMouseEnter={() => analytics(menuItemEventData(link.title, i))}
            aria-label={link.title}
            menuLinkName={link.title}
            data-autoid={`masthead__l0-nav--nav-${i}`}>
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
        </div>
      );
    } else {
      return (
        <HeaderMenuItem
          href={link.url}
          onMouseEnter={() =>
            analytics(menuItemEventData(link.title, i, 'none'))
          }
          data-autoid={`masthead__l0-nav--nav-${i}`}>
          {link.title}
        </HeaderMenuItem>
      );
    }
  });

  return (
    <>
      {topNavprops.platform && (
        <HeaderName
          prefix=""
          href={topNavprops.platform.url}
          data-autoid="masthead__platform-name">
          {topNavprops.platform.name}
        </HeaderName>
      )}
      <HeaderNavigation aria-label="IBM" data-autoid="masthead__l0-nav">
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
  navigation: PropTypes.object,
};

export default MastheadTopNav;
