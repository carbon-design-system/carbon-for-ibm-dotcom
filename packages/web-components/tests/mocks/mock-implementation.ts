/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Implementation of global mocks, with no actual implementation.
 */
function mockImplementation() {
  // eslint-disable-next-line no-console
  console.warn(
    'This is a global mock with no actual implementation. ' +
      "It's encouraged that test cases define mocks with actual implementation."
  );
}

export default mockImplementation;
