/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import DOMPurify from 'isomorphic-dompurify';
import marked from 'marked';
import settings from 'carbon-components/es/globals/js/settings';
const { prefix } = settings;

const _htmlTagRegex = /<.*?>/g;
const _cleanStringRegex = /\n|\s{2,}|&([a-zA-Z]+);/g;

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
 * Converts markdown syntaxes into html
 *
 * @param {string} str String to convert to html
 * @param {object} [options={}] Object with options for the conversion
 * @param {boolean} [options.allowHtml=false] Defines if should allow or remove html tags
 * @returns {string} String converted to html
 * @example
 * import { markdownToHtml } from '@carbon/ibmdotcom-utilities';
 *
 * markdownToHtml('Lorem *ipsum* dolor __sit__.')
 * // 'Lorem <em class="bx--type-light">ipsum</em> dolor <strong class="bx--type-semibold">sit</strong>.'
 */
function markdownToHtml(str, { allowHtml = false } = {}) {
  let converted = allowHtml ? str : _removeHtmlTags(str);

  /**
   * Custom rendering options to add Carbon styles
   *
   */
  const renderer = {
    link(href, title, text) {
      const linkTitle = title ? `title="${title}"` : null;
      return `<a class="${prefix}--link" href="${href}" ${linkTitle}>${text}</a>`;
    },
    list(body, ordered) {
      const listType = ordered ? 'ol' : 'ul';
      const listClass = ordered
        ? `${prefix}--list--ordered`
        : `${prefix}--list--unordered`;

      return `<${listType} class="${listClass}">${body}</${listType}>`;
    },
    listitem(text) {
      return `<li class="${prefix}--list__item">${text}</li>`;
    },
  };

  marked.use({ renderer });
  const convertedMarkdown = DOMPurify.sanitize(marked(converted));

  return _cleanString(convertedMarkdown);
}

export default markdownToHtml;
