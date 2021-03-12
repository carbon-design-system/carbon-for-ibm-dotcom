/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import HeaderSideNavItems from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderSideNavItems';
import PropTypes from 'prop-types';
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
  ...rest
}) => {
  const sideNavRef = useRef();

  /**
   * Left side navigation
   *
   * @returns {*} Left side navigation
   */
  const sideNav = navigation.map((link, i) => {
    const selected = rest.selectedMenuItem === link.titleEnglish;
    if (link.hasMenu || link.hasMegaPanel) {
      const autoid = `${stablePrefix}--masthead-${rest.navType}-sidenav__l0-nav${i}`;
      const dataTitle = link.titleEnglish
        ? link.titleEnglish
            .replace(/[^-a-zA-Z0-9_ ]/g, '')
            .replace(/ +/g, '-')
            .toLowerCase()
        : null;

      if (navigation.length === i + 1) {
        return (
          <>
            <SideNavMenuWithBackFoward
              title={link.title}
              backButtonText={backButtonText}
              key={i}
              autoid={autoid}
              selected={selected}
              navType={rest.navType}
              dataTitle={dataTitle}>
              {renderNavSections(
                link.menuSections,
                backButtonText,
                autoid,
                rest.navType
              )}
            </SideNavMenuWithBackFoward>
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
          </>
        );
      }
      return (
        <SideNavMenuWithBackFoward
          title={link.title}
          backButtonText={backButtonText}
          key={i}
          autoid={autoid}
          selected={selected}
          navType={rest.navType}
          heading={link.menuSections[0]?.heading}
          dataTitle={dataTitle}>
          {renderNavSections(
            link.menuSections,
            backButtonText,
            autoid,
            rest.navType
          )}
        </SideNavMenuWithBackFoward>
      );
    } else {
      if (navigation.length === i + 1) {
        return (
          <>
            <SideNavLink
              href={link.url}
              className={
                selected && `${prefix}--masthead__side-nav--submemu--selected`
              }
              data-autoid={`${stablePrefix}--masthead-${rest.navType}-sidenav__l0-nav${i}`}
              key={i}>
              {link.title}
            </SideNavLink>
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
          </>
        );
      }
      return (
        <SideNavLink
          href={link.url}
          className={
            selected && `${prefix}--masthead__side-nav--submemu--selected`
          }
          data-autoid={`${stablePrefix}--masthead-${rest.navType}-sidenav__l0-nav${i}`}
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
          <HeaderSideNavItems>{sideNav}</HeaderSideNavItems>
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
 * @param {Array} sections A list of link sections to be rendered
 * @param {string} backButtonText back button text
 * @param {string} autoid autoid predecessor
 * @param {string} navType navigation type
 * @returns {object} JSX object
 */
function renderNavSections(sections, backButtonText, autoid, navType) {
  const sectionItems = [];
  sections.forEach(section => {
    // get array of highlighted menu items to render first
    let highlightedItems = [];
    const menu = [];

    section.menuItems.forEach(item => {
      if (item.highlighted) return highlightedItems.push(item);
      return menu.push(item);
    });

    const menuItems = highlightedItems.concat(menu);
    const highlightedCount = highlightedItems.length;

    menuItems.forEach((item, k) => {
      const dataAutoId = `${autoid}-list${k}`;
      if (item.megapanelContent) {
        sectionItems.push(
          <SideNavMenuWithBackFoward
            title={item.title}
            titleUrl={item.url}
            lastHighlighted={
              highlightedCount !== 0 && k + 1 === highlightedCount
            }
            backButtonText={backButtonText}
            autoid={dataAutoId}
            navType={navType}
            key={k}>
            {renderNavItem(item.megapanelContent.quickLinks.links, dataAutoId)}
            <button
              className={`${prefix}--masthead__focus`}
              onFocus={e => {
                preventOutFocus(
                  e.target.parentElement.querySelector('a'),
                  true
                );
              }}
              aria-hidden={true}></button>
          </SideNavMenuWithBackFoward>
        );
      } else {
        sectionItems.push(
          <SideNavMenuItem
            href={item.url}
            className={
              highlightedCount !== 0 &&
              k + 1 === highlightedCount &&
              `${prefix}--masthead__side-nav__last-highlighted`
            }
            data-autoid={dataAutoId}
            key={item.title}>
            {item.title}
          </SideNavMenuItem>
        );
      }
    });
    sectionItems.push(
      <button
        className={`${prefix}--masthead__focus`}
        onFocus={e => {
          preventOutFocus(e.target.parentElement.querySelector('a'), true);
        }}
        aria-hidden={true}></button>
    );
  });

  return sectionItems;
}

/**
 * Loops through and renders a list of links for the side nav
 *
 * @param {Array} items A list of links to be rendered
 * @param {string} autoid autoid predecessor
 * @returns {object} JSX object
 */
function renderNavItem(items, autoid) {
  const navItems = [];
  items.forEach((item, i) => {
    const dataAutoId = `${autoid}-item${i}`;
    navItems.push(
      <SideNavMenuItem
        href={item.url}
        data-autoid={dataAutoId}
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
