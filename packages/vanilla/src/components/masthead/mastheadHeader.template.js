import cx from 'classnames';
import { settings } from 'carbon-components';
const { prefix } = settings;

/**
 * Masthead Heeader template literal
 *
 * @param {object} props Property object passed into the template
 * @param {string} props.className Custom css classes passed into the root element
 * @param {object} props.attrs Object with key/value HTML attributes passed into the root element
 * @param {string} props.children ES6 template literal of the chidren content passed inside the root element
 * @returns {string} ES6 template literal of the horizontal rule
 *
 */
const mastheadHeaderTemplate = (props = {}) => {
  const { className: customClassName, attrs, children } = props;

  const attrsTemplate = Object.entries(attrs).reduce((acc, [key, value]) => {
    return `${acc} ${key}="${value}"`;
  }, '');

  const className = cx(`${prefix}--header`, customClassName);

  return `
    <header
      ${attrsTemplate}
      class="${className}"
      role="banner">
      ${children}
    </header>
  `;
};

export default mastheadHeaderTemplate;
