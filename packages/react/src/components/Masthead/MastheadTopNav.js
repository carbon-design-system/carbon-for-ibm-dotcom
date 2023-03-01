/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import HeaderMenu from '../carbon-components-react/UIShell/HeaderMenu';
import HeaderMenuItem from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderMenuItem';
import HeaderName from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderName';
import HeaderNavContainer from './HeaderNavContainer';
import HeaderNavigation from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderNavigation';
import MegaMenu from './MastheadMegaMenu/MegaMenu';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Masthead top nav component.
 */
const MastheadTopNav = ({ navigation, ...topNavProps }) => {
  const [overlay, setOverlay] = useState(false);

  const childLinkChecker = topNavProps.hasCurrentUrl();

  useEffect(() => {
    document
      .querySelector(`.${prefix}--header__menu-bar`)
      ?.setAttribute('role', 'menu');
    document
      .querySelectorAll(`.${prefix}--header__menu-bar li`)
      .forEach((e) => {
        e.setAttribute('role', 'menuitem');
        e.querySelector('a').removeAttribute('role');
      });
  }, []);

  /**
   * Top masthead navigation
   *
   * @returns {*} Top masthead navigation
   */
  const mastheadLinks = navigation.map((link, i) => {
    const selectedUrlItem =
      childLinkChecker && childLinkChecker(link, root.location?.href);
    const autoid = `${stablePrefix}--masthead-${topNavProps.navType}__l0-nav${i}`;
    const selected = topNavProps.selectedMenuItem
      ? link.titleEnglish === topNavProps.selectedMenuItem
      : selectedUrlItem;
    const dataTitle = link.titleEnglish
      ? link.titleEnglish
          .replace(/[^-a-zA-Z0-9_ ]/g, '')
          .replace(/ +/g, '-')
          .toLowerCase()
      : null;

    if (link.hasMenu || link.hasMegapanel) {
      return (
        <HeaderMenu
          aria-label={link.title}
          menuLinkName={link.title}
          className={classnames({
            [`${prefix}--masthead__megamenu__l0-nav`]: link.hasMegapanel,
          })}
          selected={selected}
          autoId={autoid}
          key={i}
          disableScroll={link.hasMegapanel}
          setOverlay={setOverlay}
          dataTitle={dataTitle}>
          {renderNav(link, autoid)}
        </HeaderMenu>
      );
    }

    return (
      <HeaderMenuItem
        data-selected={`${!!selected}`}
        href={link.url}
        data-autoid={autoid}
        key={i}>
        {link.title}
      </HeaderMenuItem>
    );
  });

  return (
    <>
      {topNavProps.platform && (
        <div className={`${prefix}--masthead__platform-name`}>
          <HeaderName
            prefix=""
            href={topNavProps.platform.url}
            data-autoid={`${stablePrefix}--masthead-${topNavProps.navType}__l0-ecosystemname`}>
            {topNavProps.platform.name}
          </HeaderName>
        </div>
      )}
      <HeaderNavContainer>
        <HeaderNavigation
          aria-label="IBM"
          data-autoid={`${stablePrefix}--masthead__l0-nav`}>
          {mastheadLinks}
        </HeaderNavigation>
      </HeaderNavContainer>
      <div
        className={classnames(`${prefix}--masthead__overlay`, {
          [`${prefix}--masthead__overlay-show`]: overlay,
        })}></div>
    </>
  );
};

/**
 * Loops through and renders a list of links for the masthead nav
 *
 * @param {object} link A list of links to be rendered
 * @param {string} autoid autoid predecessor for megamenu items/menu items data-autoids
 * @returns {object} JSX object
 */
function renderNav(link, autoid) {
  const navItems = [];
  if (link.hasMegapanel) {
    navItems.push(<MegaMenu key={link.title} data={link} autoid={autoid} />);
  } else {
    link.menuSections.forEach((section, i) => {
      section.menuItems.forEach((item, j) => {
        navItems.push(
          <HeaderMenuItem
            href={item.url}
            data-autoid={`${autoid}--subnav-col${i}-item${j}`}
            key={item.title}>
            {item.title}
          </HeaderMenuItem>
        );
      });
    });
  }
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
