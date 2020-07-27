/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @param state A state.
 * @returns A massaged version of the given state, suitable for assertion.
 */
function convertState(state: { [key: string]: any }) {
  const { message, stack, then } = state ?? {};
  if (then) {
    return 'PROMISE';
  }
  if (stack) {
    return message || 'ERROR';
  }
  if (Array.isArray(state)) {
    return state.map(convertState);
  }
  if (Object(state) === state) {
    return Object.keys(state).reduce((acc, key) => {
      const { [key]: value } = state;
      acc[key] = convertState(value);
      return acc;
    }, {});
  }
  return state;
}

export default convertState;
