import mastheadHeaderMenuButton from './mastheadHeaderMenuButton.template';
import mastheadIbmLogo from './mastheadIbmLogo.template';
import mastheadHeaderSearch from './mastheadHeaderSearch.template';
import mastheadHeaderGlobalBar from './mastheadHeaderGlobalBar.template';
import mastheadLeftNav from './mastheadLeftNav.template';

// import { settings } from 'carbon-components';
// import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';

// const { stablePrefix } = ddsSettings;
// const { prefix } = settings;

/**
 * Masthead template literal
 *
 * @param {object} props Property object passed into the template
 * @param {Array|boolean} props.navigation Array with custom navigation or false boolean
 * @param {boolean} props.hasProfile Inidicates if will have Profile
 * @param {boolean} props.hasSearch Inidicates if will have Search
 * @returns {string} ES6 template literal of the Masthead
 *
 */
const mastheadTemplate = ({ navigation, hasProfile, hasSearch }) => {
  return `
    <header>
      ${navigation}, ${hasProfile}, ${hasSearch}
      ${mastheadHeaderMenuButton()}
      ${mastheadIbmLogo()}
      ${mastheadHeaderSearch()}
      ${mastheadHeaderGlobalBar()}
      ${mastheadLeftNav()}
    </header>
  `;
};

export default mastheadTemplate;
