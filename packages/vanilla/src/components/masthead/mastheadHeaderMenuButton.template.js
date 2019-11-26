import { settings } from 'carbon-components';
import { toString } from '@carbon/icon-helpers';
import { Close20, Menu20 } from '@carbon/icons';
import cx from 'classnames';

const { prefix } = settings;

/**
 * Masthead Header Button Menu
 *
 * @param {object} props Property object passed into the template
 * @param {string} props.className Custom css classes passed into the root element
 * @param {object} props.attrs Object with key/value HTML attributes passed into the root element
 * @param {boolean} props.isActive Boolean to show proper content based on active state
 * @param {boolean} props.isCollapsible Boolean to show proper content based on collapsible state
 * @returns {string} ES6 template literal of the horizontal rule
 *
 */
const mastheadHeaderMenuButtonTemplate = (props = {}) => {
  const {
    className: customClassName,
    attrs = {},
    isActive,
    isCollapsible,
  } = props;
  const { 'aria-label': ariaLabel } = attrs;

  // TODO: Check if should use root
  window.onHeaderMenuButtonClick = () => {
    alert('Works');
  };

  const attrsTemplate = Object.entries(attrs).reduce((acc, [key, value]) => {
    return `${acc} ${key}="${value}"`;
  }, '');

  const titleTemplate = ariaLabel ? `title="${ariaLabel}"` : '';

  const className = cx({
    [customClassName]: !!customClassName,
    [`${prefix}--header__action`]: true,
    [`${prefix}--header__menu-trigger`]: true,
    [`${prefix}--header__action--active`]: isActive,
    [`${prefix}--header__menu-toggle`]: true,
    [`${prefix}--header__menu-toggle__hidden`]: !isCollapsible,
  });

  const icon = isActive ? toString(Close20) : toString(Menu20);

  return `
    <button
      ${attrsTemplate}
      ${titleTemplate}
      class="${className}"
      type="button"
      onclick="onHeaderMenuButtonClick()">
      ${icon}
    </button>
  `;
};

export default mastheadHeaderMenuButtonTemplate;
