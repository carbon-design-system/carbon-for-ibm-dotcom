/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowLeft16 from '@carbon/icons-react/es/arrow--left/16';
import cx from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import HeaderMenu from '../carbon-components-react/UIShell/HeaderMenu';
import HeaderMenuItem from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderMenuItem';
import HeaderNavigation from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderNavigation';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * MastHead L1 component.
 */
const MastheadL1 = ({
  isShort,
  title,
  titleLink,
  eyebrowText,
  eyebrowLink,
  navigationL1,
}) => {
  const className = cx({
    [`${prefix}--masthead__l1`]: true,
    [`${prefix}--masthead__l1--short`]: isShort,
  });

  const mastheadL1Links = navigationL1.map((link, index) => {
    if (link.hasMenu) {
      return (
        <HeaderMenu
          aria-label={link.title}
          menuLinkName={link.title}
          data-autoid={`${stablePrefix}--masthead__l0-nav--nav-${index}`}
          key={index}>
          {renderNav(link.menuSections)}
        </HeaderMenu>
      );
    } else {
      return (
        <HeaderMenuItem
          href={link.url}
          data-autoid={`${stablePrefix}--masthead__l1-nav--nav-${index}`}
          key={index}>
          {link.title}
        </HeaderMenuItem>
      );
    }
  });

  return (
    <div className={className}>
      <div className={`${prefix}--masthead__l1-name`}>
        {eyebrowText && eyebrowLink && (
          <span className={`${prefix}--masthead__l1-name-eyebrow`}>
            <ArrowLeft16 />
            <a href={eyebrowLink}>{eyebrowText}</a>
          </span>
        )}
        <span className={`${prefix}--masthead__l1-name-title`}>
          <a href={titleLink}>{title}</a>
        </span>
      </div>
      <HeaderNavigation className={`${prefix}--masthead__l1-nav`} aria-label="">
        {mastheadL1Links}
      </HeaderNavigation>
    </div>
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
          data-autoid={`${stablePrefix}--masthead__l1-nav--subnav-col${i}-item${j}`}
          key={item.title}>
          {item.title}
        </HeaderMenuItem>
      );
    });
  });
  return navItems;
}

MastheadL1.propTypes = {
  /**
   * `true` to make this L1 short.
   */
  isShort: PropTypes.bool,

  /**
   * The title (experimental).
   */
  title: PropTypes.string,

  /**
   * The optional title link (experimental)
   */
  titleLink: PropTypes.string,
  /**
   * Text for the eyebrow link (experimental).
   */
  eyebrowText: PropTypes.string,

  /**
   * URL for the eyebrow link (experimental).
   */
  eyebrowLink: PropTypes.string,
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
  isShort: false,
  navigationL1: [],
  titleLink: null,
};

export default MastheadL1;
