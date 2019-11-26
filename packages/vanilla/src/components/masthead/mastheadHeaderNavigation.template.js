import { settings } from 'carbon-components';
import cx from 'classnames';

const { prefix } = settings;

/**
 * Masthead Header Navigation template literal
 *
 * @param {object} props Property object passed into the template
 * @param {string} props.className Custom css classes passed into the root element
 * @param {object} props.attrs Object with key/value HTML attributes passed into the root element
 * @param {string} props.children ES6 template literal of the chidren content passed inside the <ul> element
 * @returns {string} ES6 template literal of the Masthead Header Navigation
 *
 */
const mastheadHeaderNavigationTemplate = (props = {}) => {
  const { className: customClassName, attrs = {}, children } = props;

  const attrsTemplate = Object.entries(attrs).reduce((acc, [key, value]) => {
    return `${acc} ${key}="${value}"`;
  }, '');

  const className = cx(`${prefix}--header__nav`, customClassName);

  const { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy } = attrs;

  const ariaLabelTemplate = ariaLabel ? `aria-label="${ariaLabel}"` : '';
  const ariaLabelledByTemplate = ariaLabelledBy
    ? `aria-labelledby="${ariaLabelledBy}"`
    : '';

  return `
    <nav
      ${attrsTemplate}
      ${ariaLabelTemplate}
      ${ariaLabelledByTemplate}
      class="${className}">
      <ul
        ${ariaLabelTemplate}
        ${ariaLabelledByTemplate}
        class="${prefix}--header__menu-bar"
        role="menubar">
        ${children}
      </ul>
    </nav>
  `;
};

export default mastheadHeaderNavigationTemplate;
