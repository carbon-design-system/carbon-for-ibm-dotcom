/**
 * Wrapper template for the storybook story
 *
 * @param {object} props props object
 * @param {string} props.children Example content
 * @param {string} props.masthead Masthead string to insert
 * @param {string} props.footer Footer string to instert
 * @returns {string} Wrapper template literal string
 */
const wrapper = ({ masthead, content }) => `
  ${masthead}
  ${content}

`;

export default wrapper;
