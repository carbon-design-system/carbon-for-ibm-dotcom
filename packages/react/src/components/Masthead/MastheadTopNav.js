/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import calculateTotalWidth from '@carbon/ibmdotcom-utilities/es/utilities/calculateTotalWidth/calculateTotalWidth';
import CaretLeft20 from '@carbon/icons-react/es/caret--left/20';
import CaretRight20 from '@carbon/icons-react/es/caret--right/20';
import classnames from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import HeaderGlobalAction from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderGlobalAction';
import HeaderMenu from '../carbon-components-react/UIShell/HeaderMenu';
import HeaderMenuItem from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderMenuItem';
import HeaderName from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderName';
import HeaderNavigation from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderNavigation';
import MegaMenu from './MastheadMegaMenu/MegaMenu';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Masthead top nav component.
 */
const MastheadTopNav = ({ navigation, ...topNavProps }) => {
  const [resizeObserver, setResizeObserver] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [totalNavWidth, setTotalNavWidth] = useState(0);
  const [showRightCaret, setShowRightCaret] = useState(false);
  const [showLeftCaret, setShowLeftCaret] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const headerNavContainer = useRef(null);

  useEffect(() => {
    if (window.ResizeObserver) {
      setResizeObserver(
        new ResizeObserver(() => {
          setContainerWidth(calculateTotalWidth(['bx--header__nav-container']));
          setTotalNavWidth(calculateTotalWidth(['bx--header__nav']));
        })
      );
    }
  }, []);

  useEffect(() => {
    if (totalNavWidth > containerWidth) {
      if (
        headerNavContainer.current.scrollLeft === 0 ||
        headerNavContainer.current.scrollLeft + containerWidth < totalNavWidth
      ) {
        setShowRightCaret(true);
      }
    } else {
      setShowLeftCaret(false);
      setShowRightCaret(false);
    }
  }, [totalNavWidth, containerWidth]);

  useEffect(() => {
    if (resizeObserver && headerNavContainer) {
      resizeObserver.observe(headerNavContainer.current);
    }
  }, [headerNavContainer, resizeObserver]);

  /**
   * Scroll navigation left
   */
  function paginateLeft() {
    headerNavContainer.current.scrollLeft -= containerWidth;
    if (showLeftCaret) {
      headerNavContainer.current.scrollLeft -= 40;
    }
    setShowRightCaret(true);
    if (headerNavContainer.current.scrollLeft <= 0) {
      setShowLeftCaret(false);
    }
  }
  /**
   * Scroll navigation right
   */
  function paginateRight() {
    headerNavContainer.current.scrollLeft += containerWidth;
    setShowLeftCaret(true);
    if (
      headerNavContainer.current.scrollLeft + containerWidth >=
      totalNavWidth
    ) {
      setShowRightCaret(false);
    }
  }

  /**
   * Top masthead navigation
   *
   * @returns {*} Top masthead navigation
   */
  const mastheadLinks = navigation.map((link, i) => {
    const autoid = `${stablePrefix}--masthead-${topNavProps.navType}__l0-nav${i}`;
    const selected = link.titleEnglish === topNavProps.selectedMenuItem;
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
          setOverlay={setOverlay}>
          {renderNav(link, autoid)}
        </HeaderMenu>
      );
    } else {
      return (
        <HeaderMenuItem
          className={selected && `${prefix}--masthead__l0-nav--selected`}
          href={link.url}
          data-autoid={autoid}
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
          data-autoid={`${stablePrefix}--masthead-${topNavProps.navType}__l0-ecosystemname`}>
          {topNavProps.platform.name}
        </HeaderName>
      )}
      <HeaderGlobalAction
        className={`${prefix}--header__action-left-caret`}
        aria-label="Masthead left caret"
        hidden={!showLeftCaret}
        onClick={paginateLeft}>
        <CaretLeft20 />
      </HeaderGlobalAction>
      <div
        className={`${prefix}--header__nav-container`}
        ref={headerNavContainer}>
        <HeaderNavigation
          aria-label="IBM"
          data-autoid={`${stablePrefix}--masthead__l0-nav`}>
          {mastheadLinks}
        </HeaderNavigation>
      </div>
      <div
        className={classnames(`${prefix}--masthead__overlay`, {
          [`${prefix}--masthead__overlay-show`]: overlay,
        })}></div>
      <HeaderGlobalAction
        className={`${prefix}--header__action-right-caret`}
        aria-label="Masthead right caret"
        hidden={!showRightCaret}
        onClick={paginateRight}>
        <CaretRight20 />
      </HeaderGlobalAction>
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
