/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState } from 'react';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import HeaderSideNavItems from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderSideNavItems';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import SideNav from '../../internal/vendor/carbon-components-react/components/UIShell/SideNav';
import SideNavItems from '../../internal/vendor/carbon-components-react/components/UIShell/SideNavItems';
import SideNavMenu from '../carbon-components-react/UIShell/SideNavMenu';
import SideNavMenuItem from '../../internal/vendor/carbon-components-react/components/UIShell/SideNavMenuItem';
import SideNavMenuSection from '../carbon-components-react/UIShell/SideNavMenuSection';

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
  ...rest
}) => {
  const [menuState, setMenuState] = useState({ level0: -1, level1: -1 }); //default state
  const sideNavRef = useRef();

  const level0Items = [];
  const level1Items = [];

  const sideNav = () => {
    navigation.map((link, i) => {
      const selected = rest.selectedMenuItem === link.titleEnglish;

      const dataTitle = link.titleEnglish
        ? link.titleEnglish
            .replace(/[^-a-zA-Z0-9_ ]/g, '')
            .replace(/ +/g, '-')
            .toLowerCase()
        : null;

      const autoid = `${stablePrefix}--masthead-${rest.navType}-sidenav__l0-nav${i}`;

      if (link.hasMenu || link.hasMegaPanel || link.menuSections.length !== 0) {
        level1Items.push({
          title: link.title,
          autoid,
          sections: link.menuSections,
        });

        level0Items.push(
          <SideNavMenu
            autoid={autoid}
            dataTitle={dataTitle}
            title={link.title}
            selected={selected}
            onToggle={() => setMenuState({ ...menuState, level0: i })}
            isSideNavExpanded={i === menuState.level0 && menuState.level1 == -1}
          />
        );
      } else {
        level0Items.push(
          <SideNavMenuItem
            href={link.url}
            className={
              selected && `${prefix}--masthead__side-nav--submemu--selected`
            }
            data-autoid={autoid}
            key={link.title}>
            {link.title}
          </SideNavMenuItem>
        );
      }
    });
    level0Items.push(
      <button
        className={`${prefix}--masthead__focus`}
        onFocus={() => {
          preventOutFocus(
            sideNavRef.current?.parentNode.querySelector(
              `.${prefix}--header__menu-toggle`
            ),
            isSideNavExpanded
          );
        }}
        aria-hidden={true}></button>
    );

    const level1 = _renderLevel1Submenus(
      level1Items,
      backButtonText,
      setMenuState,
      menuState,
      rest.navType
    );

    const level2Submenus = _renderLevel2Submenus(
      level1.submenus,
      backButtonText,
      setMenuState,
      menuState,
      rest.navType
    );

    return (
      <div>
        <SideNavMenuSection show={menuState.level0 === -1}>
          {level0Items}
        </SideNavMenuSection>
        {level1.menuSections}
        {level2Submenus}
      </div>
    );
  };

  return (
    <SideNav
      aria-label="Side navigation"
      expanded={isSideNavExpanded}
      isPersistent={false}
      ref={sideNavRef}>
      <nav
        data-autoid={`${stablePrefix}--masthead-${rest.navType}-sidenav__l0`}>
        {platform && (
          <a // eslint-disable-line jsx-a11y/role-supports-aria-props
            data-autoid={`${stablePrefix}--masthead-${rest.navType}-sidenav__l0-productname`}
            href={platform.url}
            aria-haspopup="true"
            className={`${prefix}--side-nav__submenu ${prefix}--side-nav__submenu-platform`}>
            {platform.name}
          </a>
        )}
        <SideNavItems>
          <HeaderSideNavItems>{sideNav()}</HeaderSideNavItems>
        </SideNavItems>
      </nav>
    </SideNav>
  );
};

const preventOutFocus = (target, isSideNavExpanded) => {
  if (isSideNavExpanded) {
    target.focus();
  }
};

/**
 * Loops through and renders a list of links for the side nav
 *
 *  @param {Array} menuItems menu items
 * @param {string} backButtonText back button text
 * @param {Function} setMenuState setState func
 * @param {object} menuState currrent menu that is visible
 * @param {string} navType navigation type
 * @returns {object} JSX object
 */
function _renderLevel1Submenus(
  menuItems,
  backButtonText,
  setMenuState,
  menuState,
  navType
) {
  // gather submenu items for next level
  const submenus = [];

  const sideNavMenuSections = menuItems.map((menu, i) => {
    // get array of highlighted menu items to render first
    let highlightedItems = [];
    const items = [];

    menu.sections[0].menuItems.forEach(item => {
      if (item.highlighted) return highlightedItems.push(item);
      return items.push(item);
    });

    const sortedMenu = highlightedItems.concat(items);
    const highlightedCount = highlightedItems.length;

    return (
      <SideNavMenuSection
        heading={menu.sections[0]?.heading}
        title={menu.title}
        navType={navType}
        backButtonText={backButtonText}
        onBackClick={() => setMenuState({ level0: -1, level1: -1 })}
        show={menuState.level0 === i && menuState.level1 === -1}>
        {sortedMenu.map((item, k) => {
          submenus.push({
            title: item.title,
            titleUrl: item.url,
            autoid: `${menu.autoid}-list${k}`,
            sections: item.megapanelContent?.quickLinks?.links,
            parentKey: i,
            index: k,
          });

          const highlightedClass =
            highlightedCount !== 0 &&
            k + 1 === highlightedCount &&
            `${prefix}--masthead__side-nav__last-highlighted`;

          if (item.megapanelContent) {
            return (
              <SideNavMenu
                autoid={`${menu.autoid}-list${k}`}
                title={item.title}
                className={highlightedClass}
                onToggle={() => setMenuState({ ...menuState, level1: k })}
                isSideNavExpanded={
                  i === menuState.level0 && menuState.level1 == k
                }
              />
            );
          } else {
            return (
              <SideNavMenuItem
                href={item.url}
                className={highlightedClass}
                data-autoid={`${menu.autoid}-list${k}`}
                key={item.title}>
                {item.title}
              </SideNavMenuItem>
            );
          }
        })}
      </SideNavMenuSection>
    );
  });

  return { menuSections: sideNavMenuSections, submenus };
}

/**
 * Loops through and renders a list of links for the side nav
 *
 *  @param {Array} menuItems menu items
 * @param {string} backButtonText back button text
 * @param {Function} setMenuState setState func
 * @param {object} menuState currrent menu that is visible
 * @param {string} navType navigation type
 * @returns {object} JSX object
 */
function _renderLevel2Submenus(
  menuItems,
  backButtonText,
  setMenuState,
  menuState,
  navType
) {
  const sideNavMenuSections = menuItems.map(menu => {
    return (
      <SideNavMenuSection
        title={menu.title}
        titleUrl={menu.titleUrl}
        navType={navType}
        backButtonText={backButtonText}
        onBackClick={() => setMenuState({ ...menuState, level1: -1 })}
        show={
          menuState.level0 === menu.parentKey && menuState.level1 === menu.index
        }>
        {menu.sections?.map((item, k) => {
          return (
            <SideNavMenuItem
              href={item.url}
              data-autoid={`${menu.autoid}-item${k}`}
              key={item.title}>
              {item.title}
            </SideNavMenuItem>
          );
        })}
      </SideNavMenuSection>
    );
  });

  return sideNavMenuSections;
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
