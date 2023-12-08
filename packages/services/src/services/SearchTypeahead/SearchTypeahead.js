/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import axios from 'axios';
import { LocaleAPI } from '../Locale';
/**
 * @constant {string | string} Host for the API calls
 * @private
 */
const _host =
  (process && process.env.SEARCH_TYPEAHEAD_API) || 'https://www-api.ibm.com';
/**
 * @constant {string | string} API version
 * @private
 */
const _version = (process && process.env.SEARCH_TYPEAHEAD_VERSION) || 'v1';
/**
 * SearchTypeahead endpoint
 *
 * @type {string}
 * @private
 */
const _endpoint = `${_host}/search/typeahead/${_version}`;
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
  static async getResults(query, appid = '') {
    const lang = await LocaleAPI.getLang();
    const urlQuery = [
      `lang=${lang.lc}${lang.cc ? `&cc=${lang.cc}` : ''}`,
      `query=${encodeURIComponent(query)}`,
      `${appid ? `appid=${appid}` : ''}`,
    ]
      .filter((item) => item)
      .join('&');
    const url = `${_endpoint}?${urlQuery}`;
    return await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then((response) => response.data.response);
  }
}
export default SearchTypeaheadAPI;
