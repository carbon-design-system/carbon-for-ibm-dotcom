/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CategoryGroup from './CategoryGroup';
import CategoryLink from './CategoryLink';
import LeftNavigation from './LeftNavigation';
import NavigationGroup from './NavigationGroup';
import PropTypes from 'prop-types';
import React from 'react';
import RightNavigation from './RightNavigation';

/**
 * Masthead megamenu component.
 */
const MegaMenu = ({ data }) => {
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
    <NavigationGroup hasHighlights={hasHighlights}>
      {hasHighlights && (
        <LeftNavigation>
          {highlightedItems.map(item => (
            <CategoryGroup href={item.url} title={item.title}>
              {item.megapanelContent?.quickLinks?.links.map(
                ({ title, url }) => (
                  <CategoryLink href={url} title={title} />
                )
              )}
            </CategoryGroup>
          ))}
        </LeftNavigation>
      )}
      <RightNavigation
        viewAllLinkHref={viewAllLink?.url}
        viewAllLinkTitle={viewAllLink?.title}>
        {menuItems.map(item => (
          <CategoryGroup href={item.url} title={item.title}>
            {item.megapanelContent?.quickLinks?.links.map(({ title, url }) => (
              <CategoryLink href={url} title={title} />
            ))}
          </CategoryGroup>
        ))}
      </RightNavigation>
    </NavigationGroup>
  );
};

MegaMenu.propTypes = {
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

export default MegaMenu;
