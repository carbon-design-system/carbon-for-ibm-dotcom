/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Utility that sets an array of elements to the same height.
 *
 * @example
 * import {sameheight} from '@carbon/ibmdotcom-utilities';
 *
 * sameheight(ElementArray, 'md');
 *
 * if you want the utility to refresh the sizes as you resize the screen, consider using a listener:
 * window.addEventListener('resize', sameheight(ElementArray, 'md'));
 *
 * @param {Array} elemCollection Html objects array
 * @param {string} minSize Minimum size for the utility to be activated, empty for small,
 *  md for medium, lg for large, xlg for xlarge, max for maximum
 */
function sameheight(elemCollection, minSize) {
  const elemArr = Array.prototype.slice.call(elemCollection);
  let targetWidth;
  if (minSize) {
    switch (minSize) {
      case 'md':
        targetWidth = 671;
        break;
      case 'lg':
        targetWidth = 1055;
        break;
      case 'xlg':
        targetWidth = 1311;
        break;
      case 'max':
        targetWidth = 1583;
        break;
      default:
        targetWidth = 0;
        break;
    }
  }

  if (window.innerWidth > targetWidth) {
    let targetHeight = 0;
    elemArr.forEach(elem => {
      elem.offsetHeight > targetHeight
        ? (targetHeight = elem.offsetHeight)
        : false;
    });

    elemArr.forEach(elem => {
      elem.offsetHeight == targetHeight
        ? (elem.style.height = 'auto')
        : (elem.style.height = targetHeight + 'px');
    });
  }
}

export default sameheight;
