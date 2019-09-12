import axios from 'axios';
import root from 'window-or-global';

/**
 * @constant {string | string} Host for the Translation API call
 * @private
 */
const _host = process.env.TRANSLATION_HOST || 'https://www.ibm.com';

/**
 * @constant {string | string} CORS proxy for lower environment calls
 * @private
 */
const _proxy = process.env.CORS_PROXY || '';

/**
 * Translation API endpoint
 *
 * @type {string}
 * @private
 */
const _endpoint = `${_host}/common/v18/js/data/jsononly`;

/**
 * Translation API class with methods for fetching i18n data for ibm.com
 */
class TranslationAPI {
  /**
   * Returns translation i18n data
   *
   * @returns {Promise<any>} Translation data
   * @example
   * import { TranslationAPI } from '@carbon/ibmdotcom-services';
   *
   * async function getTranslation() {
   *   const response = await TranslationAPI.getTranslation();
   *   return response;
   * }
   */
  static async getTranslation() {
    const lc = 'en'; // TODO: create utility for fetching lc
    const cc = 'us'; // TODO: create utility for fetching cc
    const currenthost = `${root.location.protocol}//${root.location.host}`;
    const proxy = currenthost !== _host ? _proxy : '';
    const url = `${proxy}${_endpoint}/${cc}${lc}.json`;

    return await axios
      .get(url, {
        headers: {
          'Content-Type': 'text/plain',
        },
      })
      .then(response => this.transformData(response.data));
  }

  /**
   * Transforms translation data
   *
   * @param   {object} data translation data to be transformed
   * @returns {object} Translation data
   */
  static transformData(data) {
    data.footerMenu.push(data.socialFollow);
    return data;
  }
}

export default TranslationAPI;
