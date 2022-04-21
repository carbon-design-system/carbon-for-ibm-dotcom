/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import ChevronLeft20 from '@carbon/icons-react/es/chevron--left/20';
import ddsSettings from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import settings from 'carbon-components/es/globals/js/settings';
import SideNavLink from '../../../internal/vendor/carbon-components-react/components/UIShell/SideNavLink';
import SideNavMenu from './SideNavMenu';
import SideNavMenuItem from '../../../internal/vendor/carbon-components-react/components/UIShell/SideNavMenuItem';
import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Side nav menu with back button
 *
 * @returns {*} SideNavMenuWithBackFoward menu items
 */
const SideNavMenuWithBackForward = ({
  title,
  titleUrl,
  backButtonText,
  children,
  ...rest
}) => {
  const refSideNavMenu = useRef(null);
  const handleToggle = useCallback(() => {
    const { current: sideNavMenuNode } = refSideNavMenu;
    const sideNav = sideNavMenuNode.closest('.bx--side-nav');
    if (sideNav) {
      Array.prototype.forEach.call(
        sideNav.querySelectorAll('.bx--side-nav__menu'),
        elem => {
          const hasExpandedSubmenu = elem.querySelector(
            '.bx--side-nav__submenu[aria-expanded="true"]'
          );
          elem.classList.toggle(
            'bx--side-nav__menu--hasactivechildren',
            hasExpandedSubmenu
          );
        }
      );
    }

    // return scroll to top when menu toggles
    const sideNavItems = sideNavMenuNode.closest('.bx--side-nav__items');
    sideNavItems.scrollTop = 0;
  }, []);
  return (
    <SideNavMenu
      autoid={rest.autoid}
      selected={rest.selected}
      title={title}
      className={
        rest.lastHighlighted &&
        `${prefix}--masthead__side-nav__last-highlighted`
      }
      onToggle={handleToggle}
      ref={refSideNavMenu}
      dataTitle={rest.dataTitle}>
      <SideNavMenuItem
        onClick={event => event.preventDefault()}
        className={`${prefix}--masthead__side-nav--submemu-back`}
        data-autoid={`${stablePrefix}--masthead-${rest.navType}-sidenav__l0-back`}
        isbackbutton="true"
        role="button"
        tabIndex="0">
        <ChevronLeft20 />
        {backButtonText}
      </SideNavMenuItem>
      {titleUrl ? (
        <SideNavLink
          className={`${prefix}--masthead__side-nav--submemu-section-title`}
          href={titleUrl}>
          {title}
          <div
            className={`${prefix}--masthead__side-nav--submemu-section-title__icon`}>
            <ArrowRight20 />
          </div>
        </SideNavLink>
      ) : (
        <li className={`${prefix}--masthead__side-nav--submemu-title`}>
          {title}
        </li>
      )}
      {rest.heading && (
        <p className={`${prefix}--masthead__side-nav--submemu-heading`}>
          {rest.heading}
        </p>
      )}
      {children}
    </SideNavMenu>
  );
};

SideNavMenuWithBackForward.propTypes = {
  /**
   * Submenu nav section title
   */
  title: PropTypes.string.isRequired,

  /**
   * Submenu nav section title url
   */
  titleUrl: PropTypes.string,

  /**
   * Back button text
   */
  backButtonText: PropTypes.string,

  /**
   * Sidenav child elements to be rendered
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default SideNavMenuWithBackForward;
