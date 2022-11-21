/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import settings from 'carbon-components/es/globals/js/settings';
import striptags from 'striptags';

const { prefix } = settings;
const _cleanStringRegex = /\n|\s{2,}|&;/g;

/**
 * Cleans string by replacing multiple spaces with a single space
 * and removing single new lines.
 *
 * @param {string} str String to be checked
 * @returns {string} String with multiple spaces and single new lines removed
 * @private
 */
const _cleanString = (str) => str.replace(_cleanStringRegex, ' ');

/**
 * Converts markdown syntaxes into html
 *
 * @param {string} str String to convert to html
 * @param {object} [options={}] Object with options for the conversion
 * @param {boolean} [options.allowHtml=false] Defines if should allow or remove html tags
 * @param {object} [options.renderer] Custom renderers
 * @param {Set<string>} [options.customTags] List of custom element tags the `renderer` uses.
 * @returns {string} String converted to html
 * @example
 * import { markdownToHtml } from '@carbon/ibmdotcom-utilities';
 *
 * markdownToHtml('Lorem *ipsum* dolor __sit__.')
 * // 'Lorem <em class="bx--type-light">ipsum</em> dolor <strong class="bx--type-semibold">sit</strong>.'
 */
function markdownToHtml(
  str,
  { allowHtml = false, renderer = {}, customTags } = {}
) {
  let converted = allowHtml ? str : striptags(str);

  /**
   * Custom rendering options to add Carbon styles
   *
   */
  const defaultRenderer = {
    link(href, title, text) {
      const linkTitle = title ? `title="${title}"` : null;
      return `<a class="${prefix}--link ${prefix}--link--lg" href="${href}" ${linkTitle}>${text}</a>`;
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

  marked.use({
    smartypants: true,
    renderer: Object.assign(defaultRenderer, renderer),
  });

  if (customTags) {
    DOMPurify.addHook(
      'uponSanitizeElement',
      function (node, { allowedTags, tagName }) {
        if (customTags.has(tagName) && !allowedTags[tagName]) {
          allowedTags[tagName] = true;
        }
      }
    );
  }

  const convertedMarkdown = DOMPurify.sanitize(marked(converted));

  if (customTags) {
    DOMPurify.removeHook('uponSanitizeElement');
  }

  return _cleanString(convertedMarkdown);
}

export default markdownToHtml;
