/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Utility function to parse and decode text content.
 * Strings can become encoded for various reasons.
 * This utility decodes those strings.
 *
 * @param {string} str String to decode
 * @returns {string} Final string with decoded characters
 * @example
 * import { decodeString } from '@carbon/ibmdotcom-utilities'
 *
 * const str = decodeString('https://www.ibm.com/search?lang=en&amp;cc=us&amp;q=cloud');
 * console.log(str); // https://www.ibm.com/search?lang=en&cc=us&q=cloud
 */
function decodeString(str) {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.textContent;
}

export default decodeString;
