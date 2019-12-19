import { settings } from 'carbon-components';
const { prefix } = settings;

const _htmlTagRegex = /<.*?>/g;
const _doubleSpaceRegex = /\s{2,}/g;
const _italicRegex = /[_*](.*?)[_*]/g;
const _boldRegex = /[_*]{2}(.*?)[_*]{2}/g;

/**
 * Removes any html tags from a string and keeps inner text if any
 *
 * @param {string} str String to be checked for html tags
 * @returns {string} String with html tags stripped out
 */
const _removeHtmlTags = str => str.replace(_htmlTagRegex, '');

/**
 * Checks for double spaces between words in a string and replaces for single spaces
 *
 * @param {string} str String to be checked for double spaces
 * @returns {string} String with html double spaces fixed
 */
const _fixDoubleSpaces = str => str.replace(_doubleSpaceRegex, ' ');

/**
 * Converts some markdown syntaxes into html
 * It's not a full markdown-to-html converter
 * It currently supports two syntaxes: Bold and Italic
 * Bold: Double asterisk (**) or double underscore (__).
 * Bold examples: **Lorem ipsum** __dolor__
 * Italic: Single asterisk (*) or single underscore (_)
 * Italic examples: _Lorem ipsum_ *dolor*
 *
 * @param {string} str String to convert to html
 * @param {object} options Object with options for the conversion
 * @param {boolean} options.italic Defines if should convert italic
 * @param {boolean} options.bold Defines if should convert bold
 * @param {boolean} options.useCarbonClasses If true uses carbon typography classes
 * @returns {string} String converted to html
 * @example
 * import { markdownToHtml } from '@carbon/ibmdotcom-utilities';
 *
 * markdownToHtml('Lorem _ipsum_ __dolor__ *sit* **amet**.')
 * // 'Lorem <em>ipsum</em> <strong>dolor</strong> <em>sit</em> <strong>amet</strong>.'
 */
function markdownToHtml(str, { italic, bold, useCarbonClasses } = {}) {
  const isAllStyles = !italic && !bold;
  let converted = _removeHtmlTags(str);

  if (italic || isAllStyles) {
    converted = converted.replace(_italicRegex, (match, p1) => {
      if (!p1.length) {
        return match;
      }
      return useCarbonClasses
        ? `<em class="${prefix}--type-light">${p1}</em>`
        : `<em>${p1}</em>`;
    });
  }
  if (bold || isAllStyles) {
    converted = converted.replace(_boldRegex, (match, p1) => {
      return useCarbonClasses
        ? `<strong class="${prefix}--type-semibold">${p1}</strong>`
        : `<strong>${p1}</strong>`;
    });
  }

  return _fixDoubleSpaces(converted);
}

export default markdownToHtml;
