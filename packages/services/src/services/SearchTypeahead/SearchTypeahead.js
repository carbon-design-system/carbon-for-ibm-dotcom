import axios from 'axios';

/**
 * @constant {string | string} Host for the API calls
 * @private
 */
const _host = process.env.SEARCH_TYPEAHEAD_HOST || 'https://www-api.ibm.com';

/**
 * @constant {string | string} API version
 * @private
 */
const _version = process.env.SEARCH_TYPEAHEAD_VERSION || 'v1';

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
   * import { SearchTypeaheadAPI } from '@ibmdotcom/services';
   * // or for tree-shaking:
   * import { SearchTypeaheadAPI } from '@ibmdotcom/services/es/services/SearchTypeahead';
   *
   * async function getResults(query) {
   *   const response = await SearchTypeaheadAPI.getResults(query);
   *   return response;
   * }
   */
  static async getResults(query) {
    const lc = 'en'; // TODO: create utility for fetching lc
    const cc = 'us'; // TODO: create utility for fetching cc
    const url = `${_endpoint}?lang=${lc}&cc=${cc}&query=${encodeURIComponent(
      query
    )}`;

    return await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then(response => response.data.response);
  }
}

export default SearchTypeaheadAPI;
