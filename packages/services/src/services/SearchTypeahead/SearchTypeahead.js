/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axios from 'axios';
import { LocaleAPI } from '../Locale';

/**
 * @constant {string | string} Host API host
 * @private
 */
const _host =
  (process && process.env.SEARCH_TYPEAHEAD_HOST) || 'https://www-api.ibm.com';

/**
 * @constant {string | string} API API path
 * @private
 */
const _api =
  (process && process.env.SEARCH_TYPEAHEAD_API) || '/search/typeahead/v1/';

/**
 * SearchTypeahead endpoint
 *
 * @type {string}
 * @private
 */
const _endpoint = `${_host}${_api}`;

/**
 * SearchTypeahead API class with methods of fetching search results for
 * ibm.com
 */
class SearchTypeaheadAPI {
  /**
   * Gets search results
   *
   * @param {string} query Query string to pass to the service
   * @returns {Promise<any>} Response data from ibm search
   * @example
   * import { SearchTypeaheadAPI } from '@carbon/ibmdotcom-services';
   *
   * async function getResults(query) {
   *   const response = await SearchTypeaheadAPI.getResults(query);
   *   return response;
   * }
   */
  static async getResults(query) {
    const lang = await LocaleAPI.getLang();
    const urlQuery = [
      `lang=${lang.lc}`,
      `cc=${lang.cc}`,
      `query=${encodeURIComponent(query)}`,
    ].join('&');
    const url = `${_endpoint}?${urlQuery}`;

    return await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      // TODO: KC returns response.data. Look to change to uniform
      // response in the future for all calls, e.g. response.data.response
      .then(response => response.data.response || response.data);
  }
}

export default SearchTypeaheadAPI;
