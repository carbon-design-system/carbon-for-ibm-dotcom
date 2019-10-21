/**
 * Horizontal Rule component
 *
 * @param {object} props Property object passed into the template
 * @param {string} props.style solid vs dashed [''|'bx--hr--dashed']
 * @param {string} props.size size of the hr [''|'bx--hr--small'|'bx--hr--medium'|'bx--hr--large']
 * @param {string} props.contrast color of the rule [''|'bx--hr--low-contrast'|'bx--hr--high-contrast']
 * @param {string} props.weight weight of the rule [''|'bx--hr--thick']
 * @returns {string} ES6 template literal of the horizontal rule
 */
const HorizontalRule = ({ style, size, contrast, weight }) =>
  `<hr data-autoid="dds--hr" class="bx--hr ${style} ${size} ${contrast} ${weight}"/>`;

export default HorizontalRule;
