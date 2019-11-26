import { settings } from 'carbon-components';
import cx from 'classnames';

const { prefix } = settings;

/**
 * Masthead Header Menu Item template literal
 *
 * @param {object} props Property object passed into the template
 * @param {string} props.className Custom css classes passed into the root element
 * @param {object} props.attrs Object with key/value HTML attributes passed into the root element
 * @param {string} props.role Role for the underlying <li> node
 * @param {string} props.children ES6 template literal of the chidren content passed inside the <span> element
 * @returns {string} ES6 template literal of the Masthead Header Menu Item
 *
 */
const mastheadHeaderMenuItemTemplate = (props = {}) => {
  const { className: customClassName, attrs = {}, role, children } = props;

  const attrsTemplate = Object.entries(attrs).reduce((acc, [key, value]) => {
    return `${acc} ${key}="${value}"`;
  }, '');

  const className = cx(customClassName);
  const roleTemplate = role ? `role="${role}"` : '';

  return `
    <li class="${className}" ${roleTemplate}>
    <a
      ${attrsTemplate}
      class="${prefix}--header__menu-item"
      role="menuitem"
      tabindex="0">
      <span className="${prefix}--text-truncate--end">${children}</span>
    </a>
  </li>
  `;
};

export default mastheadHeaderMenuItemTemplate;
