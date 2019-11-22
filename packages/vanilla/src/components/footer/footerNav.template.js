import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders footer nav for tall
 *
 * @param {object} footerMenu Footer menu data
 * @returns {string} footer nav html output
 */
function footerNavTemplate(footerMenu) {
  console.log('footerMenu', footerMenu);
  return `
  <nav data-autoid="${stablePrefix}--footer-nav" class="${prefix}--footer-nav">
    <ul class="${prefix}--accordion ${prefix}--footer-nav__container">
      ${_renderNavSections(footerMenu)}
    </ul>
  </nav>`;
}

/**
 * Renders the nav sections
 *
 * @param {Array} footerMenu footer menu items
 * @returns {string} navigation sections
 * @private
 */
function _renderNavSections(footerMenu) {
  let sections = '';

  console.log(footerMenu);
  /*footerMenu.map(item, () => {
    sections = sections + _renderNavSection(item);
  });*/

  return sections;
}

/**
 * Render single nav section
 *
 * @param {object} section section data
 * @returns {string} section html response
 * @private
 */
function _renderNavSection(section) {
  console.log('section', section);
  return `
    <li class="${prefix}--accordion__item ${prefix}--footer-nav-group" data-autoid="${stablePrefix}--footer-nav-group"><button aria-expanded="false" class="${prefix}--accordion__heading" title="Expand/Collapse" type="button"><svg focusable="false"
          preserveAspectRatio="xMidYMid meet" aria-label="Expand/Collapse" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" class="${prefix}--accordion__arrow" style="will-change: transform;">
          <path d="M11 8l-5 5-.7-.7L9.6 8 5.3 3.7 6 3z"></path>
        </svg>
        <div class="${prefix}--accordion__title">Discover</div>
      </button>
      <div class="${prefix}--accordion__content">
        <h2 class="${prefix}--footer-nav-group__title">Discover</h2>
        <ul>
          ${_renderNavItem()}
        </ul>
      </div>
    </li>
  `;
}

/**
 * Renders a single nav item
 *
 * @param {object} item Navigation item
 * @returns {string} HTML nav item
 * @private
 */
function _renderNavItem(item) {
  console.log('item', item);
  return `
    <li class="${prefix}--footer-nav-group__item"><a href="https://www.ibm.com/products?lnk=fdi" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Marketplace</a></li>
  `;
}
export default footerNavTemplate;
