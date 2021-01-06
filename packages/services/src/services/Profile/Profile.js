/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import axios from 'axios';
import jsonp from 'jsonp';

/**
 * @constant {string | string} Host for the profile status API call
 * @private
 */
const _host = (process && process.env.PROFILE_HOST) || 'https://login.ibm.com';

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
      })
      .then(response => response.data);
  }

  /**
   * Monitors user status (authenticated or unauthenticated)
   *
   * @example
   * import { ProfileAPI } from '@carbon/ibmdotcom-services';
   *
   * function monitorUserStatus() {
   *   ProfileAPI.monitorUserStatus((err, status) => {
   *     console.log('The new login status:', status.user);
   *   });
   * }
   */
  static monitorUserStatus(callback) {
    return jsonp(_endpoint, null, callback);
  }
}

export default ProfileAPI;
