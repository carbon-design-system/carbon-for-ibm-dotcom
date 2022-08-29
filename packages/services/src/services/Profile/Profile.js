/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import axios from 'axios';
import Cookies from 'js-cookie';

/**
 * @constant {string | string} Host for the profile status API call
 * @private
 */
const _host =
  (process &&
    (process.env.REACT_APP_PROFILE_HOST || process.env.PROFILE_HOST)) ||
  'https://login.ibm.com';

/**
 * @constant {string | string} API version
 * @private
 */
const _version = (process && process.env.PROFILE_VERSION) || 'v1';

/**
 * Profile status endpoint
 *
 * @type {string}
 * @private
 */
const _endpoint = `${_host}/${_version}/mgmt/idaas/user/status/`;

/**
 * The cookie name for determining user login status for cloud.ibm.com.
 *
 * @type {string}
 * @private
 */
const _cookieName = 'com.ibm.cloud.iam.LoggedIn.prod';

/**
 * Profile API class with methods for checking user authentication for ibm.com
 */
class ProfileAPI {
  /**
   * Returns user status (authenticated or unauthenticated)
   *
   * @returns {Promise<any>} User status
   * @example
   * import { ProfileAPI } from '@carbon/ibmdotcom-services';
   *
   * async function getUserStatus() {
   *   const response = await ProfileAPI.getUserStatus();
   *   return response;
   * }
   */
  static async getUserStatus() {
    return await axios
      .get(_endpoint, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        withCredentials: true,
      })
      .then(response => response.data)
      .catch(error => {
        console.log('Failed Profile Network Call', error);
        return { user: 'Unauthenticated' };
      });
  }

  /**
   * retrieve the cloud login status via cookie
   *
   *
   * @returns {string} string determining login status
   */
  static checkCloudCookie() {
    const cloudLogin = Cookies.get(_cookieName);

    //console.log('Cloud Cookie', cloudLogin);

    return { user: cloudLogin === '1' ? 'authenticated' : 'anonymous' };
  }

  /**
   * retrieve the cloud login status via api
   *
   *
   * @returns {string} string determining login status
   */
  static async checkCloudDocsAPI() {
    const cloudLogin = await axios
      .get('/api/v6/selected-account?profile=true', {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(response => {
        return response.status === 200 ? 'authenticated' : 'anonymous';
      })
      .catch(error => {
        console.error(error);
        return 'anonymous';
      });

    return { user: cloudLogin };
  }
}

export default ProfileAPI;
