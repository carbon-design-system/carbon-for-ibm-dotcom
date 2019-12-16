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
 * sameheight(ElementArray);
 *
 * @param {Array} elemCollection Html objects array
 */
function sameheight(elemCollection) {
  /**
   * Internal function made for avoiding adding more eventlisteners
   *
   * @param {Array} elemArr array of elements to be alligned
   */
  function setHeight(elemArr) {
    if (window.innerWidth > 671) {
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

  const elemArr = Array.prototype.slice.call(elemCollection);
  setHeight(elemArr);
  window.addEventListener('resize', function() {
    setHeight(elemArr);
  });
}

export default sameheight;
