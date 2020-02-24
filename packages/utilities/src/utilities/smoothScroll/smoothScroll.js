/**
 * Copyright IBM Corp. 2016, 2018
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
 * You can use this for jump to target element by providing event object.
 * it will scroll into view of target by selecting attribute and assigning to id.
 *
 * @param {*} e event object and seletor
 */
const smoothScroll = ({ e, selector }) => {
  if (e != null) {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  } else if (selector != null) {
    document.querySelector(selector).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};
export default smoothScroll;
