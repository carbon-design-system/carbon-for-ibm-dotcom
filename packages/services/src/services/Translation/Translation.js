import axios from 'axios';
import { LocaleAPI } from '../Locale';
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
   * @param {object} codes object containing lc and cc
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
  static async getTranslation(codes) {
    let lang = 'en';
    let country = 'us';

    if (codes && codes.lc && codes.cc) {
      lang = codes.lc;
      country = codes.cc;
    } else {
      const locale = await LocaleAPI.getLocale();
      lang = locale.lc;
      country = locale.cc;
    }

    let proxy = '';
    if (root.location) {
      const currenthost = `${root.location.protocol}//${root.location.host}`;
      proxy = currenthost !== _host ? _proxy : '';
    }
    const url = `${proxy}${_endpoint}/${country}${lang}.json`;

    return await axios
      .get(url, {
        headers: {
          'Content-Type': 'text/plain',
          origin: _host,
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
