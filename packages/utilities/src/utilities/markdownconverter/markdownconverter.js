const _htmlTagRegex = /<.*?>/g;
const _doubleSpaceRegex = /\s{2,}/g;
const _italicRegex = /[_*](.*?)[_*]/g;
const _boldRegex = /[_*]{2}(.*?)[_*]{2}/g;

/**
 *
 * @param {string} str String to be checked for html tags
 * @returns {string} String with html tags stripped out
 */
const _removeHtmlTags = str => str.replace(_htmlTagRegex, '');

/**
 *
 * @param {string} str String to be checked for double spaces
 * @returns {string} String with html double spaces fixed
 */
const _fixDoubleSpaces = str => str.replace(_doubleSpaceRegex, ' ');

/**
 * Utiltity function for converting markdown into html
 *
 * @param {string} str String to convert to html
 * @param {object} options Object with options for the conversion
 * @param {boolean} options.italic Defines if should convert italic
 * @param {boolean} options.bold Defines if should convert bold
 * @returns {string} String converted to html
 * @example
 * import { markdownConverter } from '@carbon/ibmdotcom-utilities';
 *
 * markdownConverter('Lorem _ipsum_ __dolor__ *sit* **amet**.')
 * // Lorem <em>ipsum</em> <strong>dolor</strong> <em>sit</em> <strong>amet</strong>.'
 */
function markdownConverter(str, { italic, bold } = {}) {
  const isAllStyles = !italic && !bold;
  let converted = _removeHtmlTags(str);

  if (italic || isAllStyles) {
    converted = converted.replace(_italicRegex, (match, p1) => {
      if (!p1.length) {
        return match;
      }
      return `<em>${p1}</em>`;
    });
  }
  if (bold || isAllStyles) {
    converted = converted.replace(_boldRegex, '<strong>$1</strong>');
  }

  return _fixDoubleSpaces(converted);
}

export default markdownConverter;
