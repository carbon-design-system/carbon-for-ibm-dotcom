/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Cookies from 'js-cookie';

const _cookieName = 'activeCartId';

class SAPCommerceAPI {
  /**
   * Check if the user has an active cart by looking for the non-empty cookie.
   *
   * @returns {boolean}
   */
  static hasActiveCart() {
    const activeCartId = SAPCommerceAPI.getActiveCartId();
    // Return true if the activeCartId cookie is non-empty.
    return activeCartId !== '';
  }

  /**
   * Returns the active cart id.
   *
   * @returns {string}
   *   The active cart id if there is one, otherwise empty string.
   */
  static getActiveCartId() {
    const activeCartId = Cookies.get(_cookieName);
    return activeCartId && typeof activeCartId === 'string'
      ? activeCartId.trim()
      : '';
  }

  /**
   * Set the active cart id.
   *
   * @param {string} activeCartId
   *   The active cart id.
   */
  static setActiveCartId(activeCartId) {
    Cookies.set(_cookieName, activeCartId.trim());
  }

  /**
   * Remove the active cart id.
   */
  static removeActiveCartId() {
    Cookies.remove(_cookieName);
  }
}

export default SAPCommerceAPI;
