/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @param {string} url A URL.
 * @returns {object<string, string>} The key-value pair of the search params of the given URL.
 */
function getSearchParams(url) {
  const index = url.indexOf('?');
  const params = new URLSearchParams(url.substr(index < 0 ? 0 : index));
  const result = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
}

export default getSearchParams;
