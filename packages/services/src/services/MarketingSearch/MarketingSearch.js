/**
 * MarketingSearch API
 *
 * @module MarketingSearchAPI
 */

/**
 * @constant {string | string} Host for the API calls
 * @private
 */
const _host = process.env.MARKETING_SEARCH_HOST || 'https://www.ibm.com';

/**
 * @constant {string | string} API version
 * @private
 */
const _version = process.env.MARKETING_SEARCH_VERSION || 'v3';

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
export default class MarketingSearchAPI {
  /**
   * Gets search results for marketing
   *
   * @param {string} query Query string to pass to the service
   * @returns {Promise<any>} Response data from ibm search
   */
  static async getResults(query) {
    const lc = 'en'; // TODO: create utility for fetching lc
    const cc = 'us'; // TODO: create utility for fetching cc

    let response = await fetch(
      `${_endpoint}?locale=${lc}-${cc}&q=${encodeURIComponent(query)}`
    );

    return await response.json();
  }
}
