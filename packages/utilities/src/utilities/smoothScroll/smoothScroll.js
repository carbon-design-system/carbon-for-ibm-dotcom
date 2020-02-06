/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Utility handles smoothScroll to the target element after OnClick
 *
 * @example
 * import { smoothScroll } from '@carbon/ibmdotcom-utilities';
 *
 * <a href="#anchorlinkname" onClick={smoothScroll(e)}>lorem ipsum</a>
 *
 * You can use this for jump to target element by providing event object.
 * it will scroll into view of target by selecting attribute and assigning to id.
 *
 * @param {*} e event object
 */
const smoothScroll = e => {
  e.preventDefault();
  const id = e.currentTarget.getAttribute('href');
  document.querySelector(id).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};
export default smoothScroll;
