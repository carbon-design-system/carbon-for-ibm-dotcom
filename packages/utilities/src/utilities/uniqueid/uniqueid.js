/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Stores the latast id to increment
 *
 * @type {number} Number stored for the next ID
 * @private
 */
let _lastId = 0;

/**
 * Creates a unique ID to use
 *
 * @param {string=} prefix Prefix to set for the id
 * @returns {string} Unique ID
 * @example
 * import { uniqueid } from '@carbon/ibmdotcom-utilities';
 *
 * const id1 = uniqueid(); // id1
 * const id2 = uniqueid(); // id2
 * const id3 = uniqueid('prefix'); // prefix3
 * const id4 = uniqueid('prefix-'); // prefix-4
 */
function uniqueid(prefix = 'id') {
  _lastId++;
  return `${prefix}${_lastId}`;
}

export default uniqueid;
