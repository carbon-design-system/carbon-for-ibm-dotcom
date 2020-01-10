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
 * @private
 */
const _removeHtmlTags = str => str.replace(_htmlTagRegex, '');

/**
 * Checks for double spaces between words in a string and replaces for single spaces
 *
 * @param {string} str String to be checked for double spaces
 * @returns {string} String with html double spaces fixed
 * @private
 */
const _fixDoubleSpaces = str => str.replace(_doubleSpaceRegex, ' ');

/**
 * Converts some markdown syntaxes into html
 * <p>It's not a full markdown-to-html converter</p>
 * <p>It currently supports two syntaxes: <strong>Bold</strong> and <em>Italic</em></p>
 * <ul>
 * <li>Bold: Double asterisk (**) or double underscore (__)</li>
 * <li>Bold examples: **Lorem ipsum** __dolor__</li>
 * <li>Italic: Single asterisk (*) or single underscore (_)</li>
 * <li>Italic examples: _Lorem ipsum_ *dolor*</li>
 * </ul>
 *
 * @param {string} str String to convert to html
 * @param {object} [options={}] Object with options for the conversion
 * @param {boolean} [options.italic=true] Defines if should convert italic
 * @param {boolean} [options.bold=true] Defines if should convert bold
 * @param {boolean} [options.useCarbonClasses=true] Defines if should use carbon typography classes
 * @param {boolean} [options.allowHtml=false] Defines if should allow or remove html tags
 * @returns {string} String converted to html
 * @example
 * import { markdownToHtml } from '@carbon/ibmdotcom-utilities';
 *
 * markdownToHtml('Lorem *ipsum* dolor __sit__.')
 * // 'Lorem <em class="bx--type-light">ipsum</em> dolor <strong class="bx--type-semibold">sit</strong>.'
 */
function markdownToHtml(
  str,
  {
    italic = true,
    bold = true,
    useCarbonClasses = true,
    allowHtml = false,
  } = {}
) {
  let converted = allowHtml ? str : _removeHtmlTags(str);

  if (italic) {
    converted = converted.replace(_italicRegex, (match, p1) => {
      if (!p1.length) {
        return match;
      }
      return useCarbonClasses
        ? `<em class="${prefix}--type-light">${p1}</em>`
        : `<em>${p1}</em>`;
    });
  }

  if (bold) {
    converted = converted.replace(_boldRegex, (match, p1) => {
      return useCarbonClasses
        ? `<strong class="${prefix}--type-semibold">${p1}</strong>`
        : `<strong>${p1}</strong>`;
    });
  }

  return _fixDoubleSpaces(converted);
}

export default markdownToHtml;
