import { settings } from 'carbon-components';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Masthead Header Global Bar
 *
 * @returns {string} ES6 template literal of the Masthead Header Global Bar
 */
const mastheadHeaderGlobalBarTemplate = () => {
  return `
    <div class="${prefix}--header__global">
      <button
        aria-label="User Profile"
        data-autoid="${stablePrefix}--masthead__profile"
        class="${prefix}--header__action"
        type="button">
        {children}
      </button>
    </div>
  `;
};

export default mastheadHeaderGlobalBarTemplate;
