/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import axios from 'axios';
import { DDOAPI } from '../DDO';
import root from 'window-or-global';

class CloudAccountAuthAPI {
  /**
   * retrieve the cloud login status via window object status
   * gets the full digitalData (DDO) object.
   *
   * @example
   * import { cloudAccountAuthentication } from '@carbon/ibmdotcom-utilities';
   *
   * const status = cloudAccountAuthentication.checkPersonalization();
   *
   * @returns {string} string determining login status
   */
  static async checkPersonalization() {
    return await DDOAPI.isReady().then(() => {
      const status = root.digitalData?.user?.segment?.isCloudLoggedOn;
      return { user: status === true ? 'authenticated' : 'anonymous' };
    });
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

export default CloudAccountAuthAPI;
