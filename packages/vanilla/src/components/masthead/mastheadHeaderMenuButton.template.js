import { settings } from 'carbon-components';
import { Menu20 } from '@carbon/icons';
import { toString } from '@carbon/icon-helpers';

const { prefix } = settings;

/**
 * Masthead Header Menu Button
 *
 * @returns {string} ES6 template literal of the Masthead Header Menu ButtonSkip to main content
 */
const mastheadHeaderMenuButtonTemplate = () => {
  return `
    <button
      aria-label="Open menu"
      title="Open menu"
      class="
        ${prefix}--header__action
        ${prefix}--header__menu-trigger
        ${prefix}--header__menu-toggle"
      type="button">
      ${toString(Menu20)}
    </button>
  `;
};

export default mastheadHeaderMenuButtonTemplate;
