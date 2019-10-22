/**
 * Horizontal Rule template literal
 *
 * @param {object} props Property object passed into the template
 * @param {string} props.style solid vs dashed [''|'dashed']
 * @param {string} props.size size of the hr [''|'small'|'medium'|'large']
 * @param {string} props.contrast color of the rule [''|'low'|'high']
 * @param {string} props.weight weight of the rule [''|'thick']
 * @returns {string} ES6 template literal of the horizontal rule
 */
const horizontalruleTemplate = ({ style, size, contrast, weight }) => {
  const hrStyle = style === 'dashed' ? 'bx--hr--dashed' : '';
  const hrSize = size && size !== '' ? `bx--hr--${size}` : '';
  const hrContrast =
    contrast && contrast !== '' ? `bx--hr--${contrast}-contrast` : '';
  const hrWeight = weight === 'thick' ? 'bx--hr--thick' : '';

  return `<hr
    data-autoid="dds--hr"
    class="bx--hr ${hrStyle} ${hrSize} ${hrContrast} ${hrWeight}"
    />`;
};

export default horizontalruleTemplate;
