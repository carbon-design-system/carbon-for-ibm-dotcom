/**
 * Converts a JSON object to a serialized string
 *
 * @param {object} obj Object to convert
 * @returns {string} Serialized string
 * @example
 * import { serialize } from '@ibmdotcom/utilities'
 * // or for tree-shaking:
 * import { serialize } from '@ibmdotcom/utilities/es/utilities/serialize';
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
const serialize = ({ obj }) => {
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
};

export default serialize;
