/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
 *
 * @param {string} str html string passed in to remove html tags and entities
 * @param {object} [options={}] Object with options for the conversion
 * @param {boolean} [options.removeEntities=true] Defines if should remove html entities
 * @returns {string} String removed of html tags
 * @example
 * import { removeHtmlTagEntities } from '@carbon/ibmdotcom-utilities';
 *
 * markdownToHtml('<p>example string</p>&nbsp;<p>here</>')
 * // 'example string here'
 */
function removeHtmlTagEntities(str, { removeEntities = true } = {}) {
  let removedTags = _removeHtmlTags(str);
  removedTags = removeEntities ? _cleanString(removedTags) : removedTags;

  return removedTags;
}

export default removeHtmlTagEntities;
