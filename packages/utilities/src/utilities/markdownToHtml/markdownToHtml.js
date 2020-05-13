import { settings } from 'carbon-components';
const { prefix } = settings;

const _htmlTagRegex = /<.*?>/g;
const _cleanStringRegex = /\n|\s{2,}|(&nbsp;)/g;
const _italicRegex = /[_*](.*?)[_*]/g;
const _boldRegex = /[_*]{2}(.*?)[_*]{2}/g;
const _paraRegex = /\n\n/g;

/**
 * Removes any html tags from a string and keeps inner text if any
 *
 * @param {string} str String to be checked for html tags
 * @returns {string} String with html tags stripped out
 * @private
 */
const _removeHtmlTags = str => str.replace(_htmlTagRegex, '');

/**
 * Cleans string by replacing multiple spaces with a single space
 * and removing single new lines.
 *
 * @param {string} str String to be checked
 * @returns {string} String with multiple spaces and single new lines removed
 * @private
 */
const _cleanString = str => str.replace(_cleanStringRegex, ' ');

/**
 * Converts some markdown syntaxes into html
 * It's not a full markdown-to-html converter
 * It currently supports three syntaxes: <strong>Bold</strong>, <em>Italic</em>, and <p>Paragraph</p>
 *
 * Bold: Double asterisk (**) or double underscore (__)
 * Bold examples: **Lorem ipsum** __dolor__
 * Italic: Single asterisk (*) or single underscore (_)
 * Italic examples: _Lorem ipsum_ *dolor*
 * Paragraph: Double new line per paragraph
 * Paragraph examples: This is paragraph one.\n\nThis is paragraph two.
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
    cleanString = false,
    textOnly = false,
  } = {}
) {
  let paraList = '';
  let converted = allowHtml ? str : _removeHtmlTags(str);
  converted = cleanString ? _cleanString(converted) : converted;
  const paras = converted.split(_paraRegex);

  paras.map(para => {
    if (italic) {
      para = _cleanString(para).replace(_italicRegex, (match, p1) => {
        if (!p1.length) {
          return match;
        }
        return useCarbonClasses
          ? `<em class="${prefix}--type-light">${p1}</em>`
          : `<em>${p1}</em>`;
      });
    }

    if (bold) {
      para = _cleanString(para).replace(_boldRegex, (match, p1) => {
        if (!p1.length) {
          return match;
        }
        return useCarbonClasses
          ? `<strong class="${prefix}--type-semibold">${p1}</strong>`
          : `<strong>${p1}</strong>`;
      });
    }

    paraList += textOnly ? para : `<p>${para}</p>`;
  });

  return paraList;
}

export default markdownToHtml;
