/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowRight16 from '@carbon/icons-react/es/arrow--right/16';
import classnames from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import LinkWithIcon from '../LinkWithIcon/LinkWithIcon';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Masthead megamenu component.
 */
const MastheadMegaMenu = ({ data }) => {
  let highlightedItems = [];
  let viewAllLink;
  let menuItems = [];

  data.menuSections[0].menuItems.forEach(item => {
    if (item.highlighted) return highlightedItems.push(item);
    if (item.megaPanelViewAll) return (viewAllLink = item);
    else return menuItems.push(item);
  });

  const hasHighlights = highlightedItems.length !== 0;

  return (
    <section
      className={classnames(`${prefix}--masthead__megamenu`, {
        [`${prefix}--masthead__megamenu__container--hasHighlights`]: hasHighlights,
      })}
      data-autoid={`${stablePrefix}--masthead__megamenu`}>
      <div className={`${prefix}--masthead__megamenu__container`}>
        <div className={`${prefix}--masthead__megamenu__container--row`}>
          {hasHighlights && (
            <div className={`${prefix}--masthead__megamenu__highlight-section`}>
              {_renderMenuCategory(highlightedItems)}
            </div>
          )}
          <div className={`${prefix}--masthead__megamenu__categories-section`}>
            <div className={`${prefix}--masthead__megamenu__categories`}>
              {_renderMenuCategory(menuItems)}
            </div>
            {viewAllLink && (
              <LinkWithIcon
                className={`${prefix}--masthead__megamenu__view-all-cta`}
                href={viewAllLink.url}>
                <span>{viewAllLink.title}</span>
                <ArrowRight16 />
              </LinkWithIcon>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Renders the menu category group with menu title and associated links
 *
 * @param {Array} items highlighted menu items
 * @returns {*} menu items and associated links
 */
const _renderMenuCategory = items => {
  return items.map(item => {
    return (
      <div className={`${prefix}--masthead__megamenu__menu-category`}>
        {_renderLinkOrString(item)}
        {item.megapanelContent?.quickLinks?.links.map(link => {
          return (
            <a
              className={`${prefix}--masthead__megamenu__category-sublink`}
              href={link.url}>
              {link.title}
            </a>
          );
        })}
      </div>
    );
  });
};

/**
 * Determines whether to render LinkWithIcon or plain string
 *
 * @param {object} item menu item
 * @returns {*} menu section item as LinkWithIcon or plain string
 */
const _renderLinkOrString = item => {
  if (item.url) {
    return (
      <LinkWithIcon
        className={`${prefix}--masthead__megamenu__category-headline`}
        href={item.url}>
        <span>{item.title}</span>
        <ArrowRight16 />
      </LinkWithIcon>
    );
  } else {
    return (
      <div className={`${prefix}--masthead__megamenu__category-headline`}>
        <span>{item.title}</span>
      </div>
    );
  }
};

MastheadMegaMenu.propTypes = {
  /**
   * Object containing megamenu nav data
   */
  data: PropTypes.shape({
    hasMenupanel: PropTypes.bool,
    title: PropTypes.string,
    url: PropTypes.string,
    menuSections: PropTypes.arrayOf(
      PropTypes.shape({
        menuItems: PropTypes.arrayOf(
          PropTypes.shape({
            highlighted: PropTypes.bool,
            title: PropTypes.string,
            url: PropTypes.string,
            megapanelContent: PropTypes.shape({
              quickLinks: PropTypes.shape({
                links: PropTypes.arrayOf(
                  PropTypes.shape({
                    title: PropTypes.string,
                    url: PropTypes.string,
                  })
                ),
              }),
            }),
          })
        ),
      })
    ),
  }),
};

export default MastheadMegaMenu;
