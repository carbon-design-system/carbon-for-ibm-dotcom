/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Utiltity function for escaping regex expressions
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
 *
 * @param {string} str String to escape regex
 * @returns {string} Final string with escaped regex
 * @example
 * import { escapeRegExp } from '@carbon/ibmdotcom-utilities'
 *
 * const result = escapeRegExp('Hello?!*`~World()[]');
 * console.log(result); // Hello\?!\*`~World\(\)\[\]
 *
 */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default escapeRegExp;
