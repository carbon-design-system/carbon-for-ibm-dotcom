import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';

import headerMenuTemplate from './mastheadHeaderMenu.template';
import headerMenuItemTemplate from './mastheadHeaderMenuItem.template';
import headerNameTemplate from './mastheadHeaderName.template';
import headerNavigationTemplate from './mastheadHeaderNavigation.template';

const { stablePrefix } = ddsSettings;

/**
 * Loops through and renders a list of links for the masthead nav
 *
 * @param {Array} sections A list of links to be rendered
 * @returns {string} ES6 template literal of the Masthead Header Menu
 *
 */
const renderNav = sections => {
  const navItems = [];
  sections.forEach((section, i) => {
    section.menuItems.forEach((item, j) => {
      const headerMenuItem = headerMenuItemTemplate({
        attrs: {
          href: item.url,
          'data-autoid': `${stablePrefix}--masthead__l0-nav--subnav-col${i}-item${j}`,
        },
        children: item.title,
      });

      navItems.push(headerMenuItem);
    });
  });
  return navItems.join('');
};

/**
 * Masthead Top Nav template literal
 *
 * @param {object} props Property object passed into the template
 * @param {object} props.navigation Object containing navigation elements
 * @returns {string} ES6 template literal of the Masthead Top Nav
 *
 */
const mastheadTopNavTemplate = (props = {}) => {
  const { navigation, ...topNavProps } = props;

  /**
   * Top masthead navigation
   *
   * @returns {string} ES6 template literal of the Masthead Links
   */
  const mastheadLinks = navigation.map((link, i) => {
    if (link.hasMenu) {
      return headerMenuTemplate({
        attrs: {
          'aria-label': link.title,
          'data-autoid': `${stablePrefix}--masthead__l0-nav--nav-${i}`,
        },
        menuLinkName: link.title,
        children: renderNav(link.menuSections),
      });
    } else {
      return headerMenuItemTemplate({
        attrs: {
          href: link.url,
          'data-autoid': `${stablePrefix}--masthead__l0-nav--nav-${i}`,
        },
        children: link.title,
      });
    }
  });

  const headerName = topNavProps.platform
    ? headerNameTemplate({
        attrs: {
          href: topNavProps.platform.url,
          'data-autoid': `${stablePrefix}--masthead__platform-name`,
        },
        prefix: '',
        children: topNavProps.platform.name,
      })
    : '';
  const headerNavigation = headerNavigationTemplate({
    attrs: {
      'aria-label': 'IBM',
      'data-autoid': `${stablePrefix}--masthead__l0-nav`,
    },
    children: mastheadLinks.join(''),
  });

  return `
    ${headerName}
    ${headerNavigation}
  `;
};

export default mastheadTopNavTemplate;
