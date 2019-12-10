import { settings } from 'carbon-components';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { ChevronDownGlyph } from '@carbon/icons';
import { toString, getAttributes } from '@carbon/icon-helpers';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Masthead Header Search
 *
 * @param {object} props Property object passed into the template
 * @param {Array|boolean} props.navigation Array with navigation items or false boolean
 * @returns {string} ES6 template literal of the Masthead Header Search
 */
const mastheadHeaderSearchTemplate = ({ navigation, hasSearch }) => {
  return `
    <div class="${prefix}--header__search">
      <!-- Masthead Top Nav -->
      ${navigation ? _mastheadTopNavTemplate(navigation) : ''}

      <!-- Masthead Search -->
      ${hasSearch ? _mastheadSearchTemplate() : ''}
    </div>
  `;
};

/**
 * Masthead Search Template
 *
 * @returns {string} ES6 template literal of the Masthead Search
 * @private
 */
const _mastheadSearchTemplate = () => {
  return `
    <div
      data-autoid="${stablePrefix}--masthead__search"
      class="${prefix}--masthead__search">
      <form
        action="https://www.ibm.com/search?lnk=mhsrch"
        method="get">
        <input type="hidden" name="lang" value="en" />
        <input type="hidden" name="cc" value="us" />
        <input type="hidden" name="lnk" value="mhsrch" />
        <!-- Auto suggest -->
      </form>
    </div>
  `;
};

/**
 * Masthead Top Nav Template
 *
 * @param {Array} navigation Array with navigation items
 * @returns {string} ES6 template literal of the Masthead Top Nav
 * @private
 */
const _mastheadTopNavTemplate = navigation => {
  return `
    <!-- Header Name -->

    <!-- Header Navigation -->
    <nav
      aria-label="IBM"
      data-autoid="${stablePrefix}--masthead__l0-nav"
      class="${prefix}--header__nav"
    >
      <ul
        aria-label="IBM"
        class="${prefix}--header__menu-bar"
        role="menubar">
          ${_renderNavLinks(navigation)}
      </ul>
    </nav>
  `;
};

/**
 * Render Nav links based on navigation array
 *
 * @param {Array} navigation Array with navigation items
 * @returns {string} ES6 template literal of the Nav Links
 * @private
 */
const _renderNavLinks = navigation => {
  return navigation
    .map((link, i) => {
      if (link.hasMenu) {
        return `
        <li
          class="${prefix}--header__submenu">
          <a
            data-autoid="${stablePrefix}--masthead__l0-nav--nav-${i}"
            aria-label="${link.title}"
            aria-haspopup="menu"
            class="${prefix}--header__menu-item ${prefix}--header__menu-title"
            href="javascript:void(0)"
            role="menuitem"
            tabindex="0">
            ${link.title}
            ${toString({
              ...ChevronDownGlyph,
              attrs: {
                ...getAttributes(ChevronDownGlyph.attrs),
                class: `${prefix}--header__menu-arrow`,
              },
            })}
          </a>
          <ul
            aria-label="${link.title}"
            class="${prefix}--header__menu"
            role="menu">
            ${_renderNav(link.menuSections)}
          </ul>
        </li>
      `;
      } else {
        return `
        <li>
          <a
            aria-label="${link.title}"
            data-autoid="${stablePrefix}--masthead__l0-nav--nav-${i}"
            class="${prefix}--header__menu-item"
            href="${link.url}"
            role="menuitem"
            tabindex="0">
            <span
              class="${prefix}--text-truncate--end">
              ${link.title}
            </span>
          </a>
        </li>
      `;
      }
    })
    .join('');
};

/**
 * Render Nav links based on links list
 *
 * @param {Array} sections Array with links to be rendered
 * @returns {string} ES6 template literal of the Nav
 * @private
 */
const _renderNav = sections => {
  const navItems = [];
  sections.forEach((section, i) => {
    section.menuItems.forEach((item, j) => {
      navItems.push(`
        <li>
          <a
            data-autoid="${stablePrefix}--masthead__l0-nav--subnav-col${i}-item${j}"
            class="${prefix}--header__menu-item"
            href="${item.url}"
            role="menuitem"
            tabindex="0">
            <span
              class="${prefix}--text-truncate--end">
              ${item.title}
            </span>
          </a>
        </li>
      `);
    });
  });
  return navItems.join('');
};

export default mastheadHeaderSearchTemplate;
