/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Cookies from 'js-cookie';

/**
 * The cookie name for determining user login status for cloud.ibm.com.
 *
 * @type {string}
 * @private
 */
const _cookieName = 'com.ibm.cloud.iam.LoggedIn.manual';

/**
 * Utility to get the cloud login status cookie needed to determine user login status
 */
class cloudLoginStatusCookie {
  /**
   * retreive the cloud login status cookie and return value
   *
   * @example
   * import { cloudLoginStatusCookie } from '@carbon/ibmdotcom-utilities';
   *
   * const status = cloudLoginStatusCookie.get();
   *
   *
   * @returns {string} string determining login status
   */
  static get() {
    const cloudLogin = Cookies.get(_cookieName);

    return cloudLogin === '1' ? 'authenticated' : 'anonymous';
  }
}

export default cloudLoginStatusCookie;
