/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Utility to calculate the total width of elements
 *
 * @example
 * import {calculateTotalWidth} from '@carbon/ibmdotcom-utilities';
 *
 * const elements = ['bx--classname1', 'bx--classname2','bx--classname3','bx--classname4'];
 *
 * calculateTotalWidth(elements);
 * @param {Array} elements array of classnames
 * @returns {number} total width of the elements
 */
function calculateTotalWidth(elements) {
  let totalWidth = 0;
  elements.forEach((ele) => {
    const item = document.getElementsByClassName(ele);
    if (item[0]) totalWidth += item[0].offsetWidth;
  });
  return totalWidth;
}

export default calculateTotalWidth;
