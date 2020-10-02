/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import calculateTotalWidth from '@carbon/ibmdotcom-utilities/es/utilities/calculateTotalWidth/calculateTotalWidth';
import CaretLeft20 from '@carbon/icons-react/lib/caret--left/20';
import CaretRight20 from '@carbon/icons-react/lib/caret--right/20';
import cx from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import HeaderGlobalAction from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderGlobalAction';
import HeaderMenu from '../carbon-components-react/UIShell/HeaderMenu';
import HeaderMenuItem from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderMenuItem';
import HeaderNavigation from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderNavigation';
import MegaMenu from './MastheadMegaMenu/MegaMenu';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * MastHead L1 component.
 */
const MastheadL1 = ({ title, titleLink, navigationL1, ...rest }) => {
  const [resizeObserver, setResizeObserver] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [totalNavWidth, setTotalNavWidth] = useState(0);
  const [showRightCaret, setShowRightCaret] = useState(false);
  const [showLeftCaret, setShowLeftCaret] = useState(false);

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
  }, [containerWidth, totalNavWidth]);

  useEffect(() => {
    if (totalNavWidth > containerWidth) {
      if (
        headerNavContainer.current.scrollLeft === 0 ||
        headerNavContainer.current.scrollLeft + containerWidth < totalNavWidth
      ) {
        setShowRightCaret(true);
      }
      if (headerNavContainer.current.scrollLeft > 0) {
        setShowLeftCaret(true);
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

  const className = cx({
    [`${prefix}--masthead__l1`]: true,
  });

  const mastheadL1Links = navigationL1.map((link, index) => {
    const autoid = `${stablePrefix}--masthead-${rest.navType}__l1-nav${index}`;
    if (link.hasMenu || link.hasMegapanel) {
      return (
        <HeaderMenu
          aria-label={link.title}
          menuLinkName={link.title}
          className={cx({
            [`${prefix}--masthead__megamenu__l1-nav`]: link.hasMegapanel,
          })}
          autoId={autoid}
          key={index}>
          {renderNav(link, rest.navType, autoid)}
        </HeaderMenu>
      );
    } else {
      return (
        <HeaderMenuItem href={link.url} data-autoid={autoid} key={index}>
          {link.title}
        </HeaderMenuItem>
      );
    }
  });

  return (
    <>
      <div className={className}>
        <div className={`${prefix}--masthead__l1-name`}>
          <span className={`${prefix}--masthead__l1-name-title`}>
            <a href={titleLink}>{title}</a>
          </span>
        </div>
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
            className={`${prefix}--masthead__l1-nav`}
            aria-label="">
            {mastheadL1Links}
          </HeaderNavigation>
        </div>
        <HeaderGlobalAction
          className={`${prefix}--header__action-right-caret`}
          aria-label="Masthead right caret"
          hidden={!showRightCaret}
          onClick={paginateRight}>
          <CaretRight20 />
        </HeaderGlobalAction>
      </div>
    </>
  );
};

/**
 * Loops through and renders a list of links for the masthead nav
 *
 * @param {object} link A list of links to be rendered
 * @param {string} navType navigation type for autoids
 * @param {string} autoid autoid predecessor for megamenu items/menu items data-autoids
 * @returns {object} JSX object
 */
function renderNav(link, navType, autoid) {
  const navItems = [];
  if (link.hasMegapanel) {
    navItems.push(<MegaMenu key={link.title} data={link} autoid={autoid} />);
  } else {
    link.menuSections.forEach((section, i) => {
      section.menuItems.forEach((item, j) => {
        navItems.push(
          <HeaderMenuItem
            href={item.url}
            data-autoid={`${stablePrefix}--masthead-${navType}__l1-nav${i}-item${j}`}
            key={item.title}>
            {item.title}
          </HeaderMenuItem>
        );
      });
    });
  }
  return navItems;
}

MastheadL1.propTypes = {
  /**
   * The title (experimental).
   */
  title: PropTypes.string,

  /**
   * The optional title link (experimental)
   */
  titleLink: PropTypes.string,

  /**
   * Object containing masthead l1 navigation elements.
   */
  navigationL1: PropTypes.arrayOf(
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

MastheadL1.defaultProps = {
  navigationL1: [],
  titleLink: null,
};

export default MastheadL1;
