/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Utility handles smoothScroll on the anchor element after onClick
 *
 * @example
 * import { smoothScroll } from '@carbon/ibmdotcom-utilities';
 *
 * Here e is event param and seletor is param where you want to apply smoothscroll
 * <a href="#anchorlinkname" onClick={smoothScroll({ e, selector })}>lorem ipsum</a>
 *
 * it will scroll into view of target by selecting attribute and assigning to id.
 * Returns null if no scroll is needed
 * @param {*} e event object
 * @param {*} selector menu item selector id
 * @param {number} offset top offset for the scroll
 */
const smoothScroll = (e, selector, offset = 0) => {
  let getSelector;
  if (e !== null) {
    e.preventDefault();
    getSelector = e.currentTarget.getAttribute('href');
  } else if (selector) {
    getSelector = selector;
  } else {
    return null;
  }

  window.scroll({
    top:
      document.querySelector(getSelector).getBoundingClientRect().top -
      offset +
      window.scrollY,
    behavior: 'smooth',
  });
};

export default smoothScroll;
