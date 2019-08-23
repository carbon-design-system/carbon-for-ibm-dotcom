/**
 * Utiltity function for escaping regex expressions
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
 *
 * @param {string} str String to escape regex
 * @returns {string} Final string with escaped regex
 * @example
 * import { escapeRegExp } from '@ibmdotcom/utilities'
 * // or for tree-shaking:
 * import { escapeRegExp } from '@ibmdotcom/utilities/es/utilities/escaperegexp';
 *
 * const result = escapeRegExp('Hello?!*`~World()[]');
 * console.log(result); // Hello\?!\*`~World\(\)\[\]
 *
 */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default escapeRegExp;
