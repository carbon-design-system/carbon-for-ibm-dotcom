import { settings } from 'carbon-components';
import cx from 'classnames';

const { prefix } = settings;

/**
 * Masthead Skip To Content template literal
 *
 * @param {object} props Property object passed into the template
 * @param {string} props.className Custom css classes passed into the root element
 * @param {object} props.attrs Object with key/value HTML attributes passed into the root element
 * @param {string} props.children ES6 template literal of the chidren content passed inside the root element
 * @returns {string} ES6 template literal of the Masthead Skip To Content
 *
 */
const mastheadSkipToContentTemplate = (props = {}) => {
  const {
    attrs = {},
    className: customClassName,
    children = 'Skip to main content',
  } = props;

  const {
    href = '#main-content',
    tabindex = '0',
    ...skipToContentAttrs
  } = attrs;

  const attrsTemplate = Object.entries(skipToContentAttrs).reduce(
    (acc, [key, value]) => {
      return `${acc} ${key}="${value}"`;
    },
    ''
  );

  const className = cx(`${prefix}--skip-to-content`, customClassName);

  return `
    <a
      href=${href}
      tabindex=${tabindex}
      ${attrsTemplate}
      class="${className}"
    >
      ${children}
    </a>
  `;
};

export default mastheadSkipToContentTemplate;
