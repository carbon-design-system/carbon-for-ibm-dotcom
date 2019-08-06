/**
 * SearchTypeahead Typeahead API
 *
 * @module SearchTypeaheadAPI
 */

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
 * SearchTypeahead Typeahead endpoint
 *
 * @type {string}
 * @private
 */
const _endpoint = `${_host}/search/typeahead/${_version}`;

/**
 * SearchTypeahead API class with methods of fetching search results for
 * ibm.com
 */
export default class SearchTypeaheadAPI {
  /**
   * Gets search results
   *
   * @param {string} query Query string to pass to the service
   * @returns {Promise<any>} Response data from ibm search
   */
  static async getResults(query) {
    const lc = 'en'; // TODO: create utility for fetching lc
    const cc = 'us'; // TODO: create utility for fetching cc

    let response = await fetch(
      `${_endpoint}&lang=${lc}&cc=${cc}&q=${encodeURIComponent(query)}`
    );
    return await response.json();
  }
}
