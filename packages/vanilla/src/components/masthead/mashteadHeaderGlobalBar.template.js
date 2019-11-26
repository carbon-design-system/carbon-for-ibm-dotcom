import cx from 'classname';
import { settings } from 'carbon-components';

const { prefix } = settings;

/**
 * Masthead Heeader Global Bar template literal
 *
 * @param {object} props Property object passed into the template
 * @param {string} props.className Custom css classes passed into the root element
 * @returns {string} ES6 template literal of the horizontal rule
 *
 */
const mastheadHeaderGlobalBarTemplate = ({
  className: customClassName,
} = {}) => {
  const className = cx(`${prefix}--header__global`, customClassName);
  return `<div class="${className}"></div>`;
};

export default mastheadHeaderGlobalBarTemplate;
