/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Converts a JSON object to a serialized string
 *
 * @param {object} obj Object to convert
 * @returns {string} Serialized string
 * @example
 * import { serialize } from '@carbon/ibmdotcom-utilities'
 *
 * const obj = {
 *  param1: 'one',
 *  param2: 'two',
 *  param3: 'three',
 * };
 *
 * const result = serialize(obj);
 * console.log(result); // param1=one&param2=two&param3=three
 */
function serialize(obj) {
  return Object.keys(obj)
    .map((key) => {
      let value;
      if (typeof obj[key] === 'string') {
        value = encodeURIComponent(obj[key]);
      } else {
        value = encodeURIComponent(JSON.stringify(obj[key]));
      }
      return `${encodeURIComponent(key)}=${value}`;
    })
    .join('&');
}

export default serialize;
