/**
 * @module Utilities/serialize
 */

/**
 * Converts a JSON object to a serialized string
 * @param {object} obj Object to convert
 * @returns {string} Serialized string
 */
export function serialize(obj) {
  return Object.keys(obj)
    .map(key => {
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
