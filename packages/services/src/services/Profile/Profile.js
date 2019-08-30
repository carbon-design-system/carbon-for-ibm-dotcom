import jsonp from 'jsonp';

/**
 * @constant {string | string} Host for the profile status API call
 * @private
 */
const _host = process.env.PROFILE_HOST || 'https://idaas.iam.ibm.com';

/**
 * @constant {string | string} API version
 * @private
 */
const _version = process.env.PROFILE_VERSION || 'v1';

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
   * import { ProfileAPI } from '@ibmdotcom/services';
   * // or for tree-shaking:
   * import { ProfileAPI } from '@ibmdotcom/services/es/services/Profile';
   *
   * async function getUserStatus() {
   *   const response = await ProfileAPI.getUserStatus();
   *   return response;
   * }
   */
  static async getUserStatus() {
    const url = _endpoint;

    return await jsonp(url, null, function(err, data) {
      if (err) {
        console.error(err.message);
      } else {
        return data;
      }
    });
  }
}

export default ProfileAPI;
