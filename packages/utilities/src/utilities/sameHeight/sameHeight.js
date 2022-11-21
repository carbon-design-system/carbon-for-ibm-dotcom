/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { baseFontSize, breakpoints } from '@carbon/layout';

/**
 * Utility that sets an array of elements to the same height.
 *
 * @example
 * import {sameHeight} from '@carbon/ibmdotcom-utilities';
 *
 * sameHeight(ElementArray, 'md');
 *
 * if you want the utility to refresh the sizes as you resize the screen, consider using a listener:
 *
 * window.addEventListener('resize', function() {
 *   window.requestAnimationFrame(function() {
 *     sameHeight(ElementArray, 'md');
 *   });
 * }, true);
 *
 * @param {Array} elemCollection Html objects array
 * @param {string} minSize Minimum size for the utility to be activated, empty for small,
 *  md for medium, lg for large, xlg for xlarge, max for maximum
 */
function sameHeight(elemCollection, minSize = false) {
  const elemArr = Array.prototype.slice.call(elemCollection);
  let targetWidth = minSize
    ? parseFloat(breakpoints[minSize].width) * baseFontSize
    : 0;
  if (window.innerWidth > targetWidth) {
    let targetHeight = 0;
    elemArr.forEach((elem) => {
      elem.style.height = 'auto';
      elem.offsetHeight > targetHeight
        ? (targetHeight = elem.clientHeight)
        : false;
    });

    elemArr.forEach((elem) => {
      elem.style.height = targetHeight + 'px';
    });
  } else {
    elemArr.forEach((elem) => {
      elem.style.height = 'auto';
    });
  }
}

export default sameHeight;
