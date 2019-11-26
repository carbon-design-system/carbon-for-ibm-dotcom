import { settings } from 'carbon-components';
import cx from 'classnames';

const { prefix } = settings;

/**
 * Masthead Header Menu template literal
 *
 * @param {object} props Property object passed into the template
 * @param {string} props.className Custom css classes passed into the root element
 * @param {object} props.attrs Object with key/value HTML attributes passed into the root element
 * @param {string} props.menuLinkName Object containing label for the link text
 * @param {string} props.children ES6 template literal of the chidren content passed inside the <ul> element
 * @returns {string} ES6 template literal of the Masthead Header Menu
 *
 */
const mastheadHeaderMenuTemplate = (props = {}) => {
  const {
    className: customClassName,
    attrs = {},
    menuLinkName,
    children,
  } = props;

  const attrsTemplate = Object.entries(attrs).reduce((acc, [key, value]) => {
    return `${acc} ${key}="${value}"`;
  }, '');

  const className = cx(`${prefix}--header__submenu`, customClassName);

  return `
    <li
      class="${className}">
      <a
        ${attrsTemplate}
        aria-haspopup="menu"
        class="${prefix}--header__menu-item ${prefix}--header__menu-title"
        href="javascript:void(0)"
        role="menuitem"
        tabindex="0">
        ${menuLinkName}
      </a>
      <ul
        ${attrsTemplate}
        class="${prefix}--header__menu"
        role="menu">
          ${children}
      </ul>
    </li>
  `;
};

export default mastheadHeaderMenuTemplate;
