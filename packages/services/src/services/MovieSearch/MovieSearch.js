/**
 * Host for the API calls
 * @type {string | string}
 * @private
 */
const _host = process.env.THEMOVIEDB_HOST || 'https://api.themoviedb.org';

/**
 * API key for the API calls
 * @type {string | string}
 * @private
 */
const _apikey = process.env.THEMOVIEDB_APIKEY || '123abc';

/**
 * Movie search endpoint
 * @type {string}
 * @private
 */
const _endpoint = `${_host}/3/search/movie?api_key=${_apikey}`;

/**
 * Movie Search API
 */
export default class MovieSearchAPI {
  /**
   * Gets movie search results
   * @param {string} query Query string to pass to the service
   * @returns {Promise<any>} Response data from movie search
   */
  static async getMovies(query) {
    let response = await fetch(`${_endpoint}&query=${query}`);
    return await response.json();
  }
}
