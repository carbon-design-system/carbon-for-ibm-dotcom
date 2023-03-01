/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axios from 'axios';

/**
 * @constant {string | string} Host for the API calls
 * @private
 */
const _host =
  (process && process.env.MARKETING_SEARCH_HOST) || 'https://www.ibm.com';

/**
 * @constant {string | string} API version
 * @private
 */
const _version = (process && process.env.MARKETING_SEARCH_VERSION) || 'v3';

/**
 * MarketingSearch endpoint
 *
 * @type {string}
 * @private
 */
const _endpoint = `${_host}/marketplace/api/search/${_version}/combined_suggestions`;

/**
 * MarketingSearch API class with methods of fetching search results for
 * ibm.com
 */
class MarketingSearchAPI {
  /**
   * Gets search results for marketing
   *
   * @param {string} query Query string to pass to the service
   * @returns {Promise<any>} Response data from ibm search
   * @example
   * import { MarketingSearchAPI } from '@carbon/ibmdotcom-services';
   *
   * async function getResults(query) {
   *   const response = await MarketingSearchAPI.getResults(query);
   *   return response;
   * }
   */
  static async getResults(query) {
    const lc = 'en'; // TODO: create utility for fetching lc
    const cc = 'us'; // TODO: create utility for fetching cc
    const url = `${_endpoint}?locale=${lc}-${cc}&q=${encodeURIComponent(
      query
    )}`;

    return await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then((response) => response.data);
  }
}

export default MarketingSearchAPI;
