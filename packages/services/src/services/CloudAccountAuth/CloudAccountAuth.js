/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import axios from 'axios';
import Cookies from 'js-cookie';

/**
 * The cookie name for determining user login status for cloud.ibm.com.
 *
 * @type {string}
 * @private
 */
const _cookieName = 'com.ibm.cloud.iam.LoggedIn.prod';

class CloudAccountAuthAPI {
  /**
   * retrieve the cloud login status via cookie
   *
   * @example
   * import { cloudAccountAuthentication } from '@carbon/ibmdotcom-utilities';
   *
   * const status = cloudAccountAuthentication.checkCookie();
   *
   * @returns {string} string determining login status
   */
  static checkCookie() {
    const cloudLogin = Cookies.get(_cookieName);

    return { user: cloudLogin === '1' ? 'authenticated' : 'anonymous' };
  }

  /**
   * retrieve the cloud login status via api
   *
   * @example
   * import { cloudAccountAuthentication } from '@carbon/ibmdotcom-utilities';
   *
   * const status = cloudAccountAuthentication.checkAPI();
   *
   * @returns {string} string determining login status
   */
  static async checkAPI() {
    const cloudLogin = await axios
      .get('/api/v6/selected-account?profile=true', {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        return response.status === 200 ? 'authenticated' : 'anonymous';
      })
      .catch((error) => {
        console.error(error);
        return 'anonymous';
      });

    return { user: cloudLogin };
  }
}

export default CloudAccountAuthAPI;
