import mastheadHeaderMenuButton from './mastheadHeaderMenuButton.template';
import mastheadIbmLogo from './mastheadIbmLogo.template';
import mastheadHeaderSearch from './mastheadHeaderSearch.template';
import mastheadHeaderGlobalBar from './mastheadHeaderGlobalBar.template';
import mastheadLeftNav from './mastheadLeftNav.template';

import { settings } from 'carbon-components';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Masthead template literal
 *
 * @param {object} props Property object passed into the template
 * @param {Array|boolean} props.navigation Array with navigation items or false boolean
 * @param {boolean} props.hasProfile Inidicates if will have Profile
 * @param {boolean} props.hasSearch Inidicates if will have Search
 * @returns {string} ES6 template literal of the Masthead
 */
const mastheadTemplate = ({ navigation, hasProfile, hasSearch }) => {
  return `
    <div
      class="${prefix}--masthead">
      <div class="${prefix}--masthead__l0">
        <header
          aria-label="IBM"
          data-autoid="${stablePrefix}--masthead"
          class="${prefix}--header"
          role="banner">
          <a
            class="${prefix}--skip-to-content"
            href="#main-content"
            tabindex="0">
            Skip to main content
          </a>
          ${mastheadHeaderMenuButton()}
          ${mastheadIbmLogo()}
          ${mastheadHeaderSearch({
            navigation,
            hasSearch,
          })}
          ${mastheadHeaderGlobalBar({
            hasProfile,
          })}
          ${mastheadLeftNav({
            navigation,
          })}
        </header>
      </div>
    </div>
  `;
};

export default mastheadTemplate;
