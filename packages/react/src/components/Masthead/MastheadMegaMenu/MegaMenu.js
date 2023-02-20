/**
 * Copyright IBM Corp. 2016, 2023
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
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * Masthead megamenu component.
 */
const MegaMenu = React.forwardRef(function MegaMenu(props, ref) {
  const { data, ...rest } = props;
  let highlightedItems = [];
  let viewAllLink;
  let menuItems = [];

  data.menuSections[0].menuItems.forEach((item) => {
    if (item.highlighted) return highlightedItems.push(item);
    if (item.megaPanelViewAll) return (viewAllLink = item);
    else return menuItems.push(item);
  });

  const hasHighlights = highlightedItems.length !== 0;

  const heading = data.menuSections[0]?.heading;

  return (
    <NavigationGroup ref={ref}>
      {hasHighlights && (
        <LeftNavigation>
          {heading && (
            <p className={`${prefix}--masthead__megamenu__copy`}>{heading}</p>
          )}
          {highlightedItems.map((item, i) => (
            <CategoryGroup
              autoid={rest.autoid}
              key={i}
              href={item.url}
              title={item.title}>
              {item.megapanelContent?.description && (
                <p className={`${prefix}--masthead__megamenu__copy`}>
                  {item.megapanelContent?.description}
                </p>
              )}
              {item.megapanelContent?.quickLinks?.links.map(
                ({ title, url, highlightedLink }, key) => (
                  <CategoryLink
                    href={url}
                    title={title}
                    highlighted={highlightedLink}
                    autoid={`${rest.autoid}-list${i}`}
                    key={key}
                  />
                )
              )}
            </CategoryGroup>
          ))}
        </LeftNavigation>
      )}
      <RightNavigation
        hasHighlights={hasHighlights}
        viewAllLinkHref={viewAllLink?.url}
        viewAllLinkTitle={viewAllLink?.title}
        autoid={rest.autoid}>
        {menuItems.map((item, i) => (
          <CategoryGroup
            key={i}
            autoid={rest.autoid}
            index={i + highlightedItems.length}
            href={item.url}
            title={item.title}>
            {item.megapanelContent?.quickLinks?.links.map(
              ({ title, url }, key) => (
                <CategoryLink
                  key={key}
                  href={url}
                  title={title}
                  autoid={`${rest.autoid}-list${i + highlightedItems.length}`}
                  index={key}
                />
              )
            )}
          </CategoryGroup>
        ))}
      </RightNavigation>
    </NavigationGroup>
  );
});

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
        heading: PropTypes.string,
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
