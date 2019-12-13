/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Utility that sets elements under a same parent to the sameheight.
 *
 * It uses the selector passed to the `sameheight` attribute, to identify
 * which items should be aligned
 *
 * @example
 * `HTML`
 *    <div sameheight=".adjustme">
 *      <elemA class="adjustme">
 *      <elemB class="adjustme">
 *    </div>
 *
 * `JS`
 * import {sameheight} from '@carbon/ibmdotcom-utilities';
 *
 * sameheight();
 */
function sameheight() {
  /**
   * Internal function made for avoiding adding more eventlisteners
   */
  function setHeight() {
    if (window.innerWidth > 671) {
      const sameheightContainers = Array.prototype.slice.call(
        document.querySelectorAll('[sameheight]')
      );
      sameheightContainers.forEach(container => {
        const selectedElements = Array.prototype.slice.call(
          container.querySelectorAll(container.attributes['sameheight'].value)
        );
        let targetHeight = 0;
        selectedElements.forEach(elem => {
          elem.offsetHeight > targetHeight
            ? (targetHeight = elem.offsetHeight)
            : false;
        });

        selectedElements.forEach(elem => {
          elem.offsetHeight == targetHeight
            ? (elem.style.height = 'auto')
            : (elem.style.height = targetHeight + 'px');
        });
      });
    }
  }
  setHeight();
  window.addEventListener('resize', setHeight);
}

export default sameheight;
