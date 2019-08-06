/**
 * @module Utilities/escaperegexp
 */

/**
 * Utiltity function for escaping regex expressions
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
 *
 * @param {string} str String to escape regex
 * @returns {*} Final string with escaped regex
 */
export function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
