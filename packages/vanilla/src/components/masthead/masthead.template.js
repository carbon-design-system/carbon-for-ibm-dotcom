import { settings } from 'carbon-components';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import cx from 'classnames';

import headerTemplate from './mastheadHeader.template';
import skipToContentTemplate from './mastheadSkipToContent.template';
import headerMenuButtonTemplate from './mastheadHeaderMenuButton.template';
import ibmLogoTemplate from './mastheadIbmLogo.template';
import topNavTemplate from './mastheadTopNav.template';
import searchTemplate from './mastheadSearch.template';
import headerGlobalBarTemplate from './mashteadHeaderGlobalBar.template';
import leftNavTemplate from './mashteadLeftNav.template';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Masthead template literal
 *
 * @param {object} props Property object passed into the template
 * @param {object} props.navigation Object containing navigation elements
 * @param {boolean} props.hasProfile Boolean to determine whether profile should show or not
 * @param {boolean} props.hasSearch Boolean to determine whether search should show or not
 * @returns {string} ES6 template literal of the masthead
 *
 * @example
 * import { mastheadTemplate } from '@carbon/ibmdotcom';
 * import '@carbon/ibmdotcom-styles/scss/components/masthead/index.scss';
 *
 * console.log(
 *   mastheadTemplate({ ... })
 * );
 * // <div class="bx--masthead"> ... </div>
 *
 */
const mastheadTemplate = (props = {}) => {
  const { navigation, hasProfile, hasSearch, ...mastheadProps } = props;

  const headerSearchClassName = cx({
    [`${prefix}--header__search`]: true,
    [`${prefix}--masthead__platform`]: mastheadProps.platform,
  });

  const skipToContent = skipToContentTemplate();

  const headerMenuButton = navigation
    ? headerMenuButtonTemplate({
        attrs: {
          'aria-label': 'Open menu',
          'aria-labelledby': '',
        },
      })
    : '';

  const ibmLogo = ibmLogoTemplate();

  const topNav = navigation
    ? topNavTemplate({ navigation: navigation.custom, ...mastheadProps })
    : '';

  const search = hasSearch ? searchTemplate() : '';

  const headerGlobalBar = hasProfile ? headerGlobalBarTemplate() : '';

  const leftNav = navigation ? leftNavTemplate() : '';

  const children = `
    ${skipToContent}
    ${headerMenuButton}
    ${ibmLogo}
    <div class="${headerSearchClassName}">
      ${topNav}
      ${search}
    </div>
    ${headerGlobalBar}
    ${leftNav}
  `;

  return `
    <div class="${prefix}--masthead">
      <div class="${prefix}--masthead__l0">
        ${headerTemplate({
          attrs: {
            'aria-label': 'IBM',
            'data-autoid': `${stablePrefix}--masthead`,
          },
          children,
        })}
      </div>
    </div>
  `;
};

export default mastheadTemplate;
