/**
 * Stores the latast id to increment
 * @type {number} Number stored for the next ID
 * @private
 */
let _lastId = 0;

/**
 * Creates a unique ID to use
 *
 * @param {string=} prefix Prefix to set for the id
 * @returns {string} Unique ID
 */
function uniqueid(prefix = 'id') {
  _lastId++;
  return `${prefix}${_lastId}`;
}

export default uniqueid;
