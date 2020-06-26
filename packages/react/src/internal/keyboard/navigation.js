/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArrowLeft, ArrowRight } from './keys';
import { match } from './match';

// DEPRECATED. Use `packages/react/src/internal/vendor/carbon-components-react/internal/keyboard/navigation.js` instead

/**
 * Various utilities to help with a11y work
 */

/**
 * A "ring buffer" function that takes an array and depending on an ArrowRight
 * or ArrowLeft key input loops from last index to first or first index to last.
 *
 * @param {string} key - the left or right arrow keys
 * @param {number} index - the current index in a given array
 * @param {number} arrayLength - the total length of the array
 *
 * @example
 * 	getNextIndex(keyCodes.RIGHT, 0, 4)
 */

const getNextIndex = (key, index, arrayLength) => {
  if (match(key, ArrowRight)) {
    return (index + 1) % arrayLength;
  }
  if (match(key, ArrowLeft)) {
    return (index + arrayLength - 1) % arrayLength;
  }
};

export { getNextIndex };
