/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @param order The array of story IDs that should go to the top.
 * @returns The story sorter reflecting the given story order.
 */
function getSimpleStorySort(order: string[]) {
  return function simpleStorySort(lhs: string[], rhs: string[]) {
    const [lhsId] = lhs;
    const [rhsId] = rhs;
    const lhsSortOrder = order.indexOf(lhsId);
    const rhsSortOrder = order.indexOf(rhsId);
    if (lhsSortOrder >= 0 && rhsSortOrder >= 0) {
      return lhsSortOrder - rhsSortOrder;
    }
    return 0;
  };
}

export default getSimpleStorySort;
