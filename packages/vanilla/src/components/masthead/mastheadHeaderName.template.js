import { settings } from 'carbon-components';
import cx from 'classnames';

const { prefix: selectorPrefix } = settings;

/**
 * Masthead Header Name template literal
 *
 * @param {object} props Property object passed into the template
 * @param {string} props.className Custom css classes passed into the root element
 * @param {object} props.attrs Object with key/value HTML attributes passed into the root element
 * @param {string} props.prefix Prefix to the header name
 * @param {string} props.children ES6 template literal of the chidren content passed inside the root element
 * @returns {string} ES6 template literal of the Masthead Header Name
 *
 */
const mastheadHeaderNameTemplate = (props = {}) => {
  const {
    className: customClassName,
    attrs = {},
    prefix = 'IBM',
    children = '',
  } = props;

  const attrsTemplate = Object.entries(attrs).reduce((acc, [key, value]) => {
    return `${acc} ${key}="${value}"`;
  }, '');

  const className = cx(`${selectorPrefix}--header__name`, customClassName);

  const prefixTemplate = prefix
    ? `
      <span class="${selectorPrefix}--header__name--prefix">
        ${prefix}
      </span>
      &nbsp;
    `
    : '';

  return `
    <a
      ${attrsTemplate}
      class="${className}">
      ${prefixTemplate}
      ${children}
    </a>
  `;
};

export default mastheadHeaderNameTemplate;
