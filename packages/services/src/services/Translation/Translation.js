/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axios from 'axios';
import { LocaleAPI } from '../Locale';
import root from 'window-or-global';

/**
 * @constant {string | string} Host for the Translation API call
 * @private
 */
const _host = process?.env.TRANSLATION_HOST || 'https://www.ibm.com';

/**
 * @constant {string | string} CORS proxy for lower environment calls
 * @private
 */
const _proxy =
  root.location?.host === 'www.ibm.com'
    ? ''
    : process?.env.REACT_APP_CORS_PROXY || process?.env.CORS_PROXY || '';

/**
 * Translation API endpoint
 *
 * @type {string}
 * @private
 */
const _endpoint = `${_host}/common/v18/js/data/jsononly`;

/**
 * Session Storage key for translation data
 *
 * @type {string}
 * @private
 */
const _sessionTranslationKey = 'dds-translation';

/**
 * Tracking of the translation fetch
 *
 * @type {{}}
 * @private
 */
const _translationFetch = {};

/**
 * Number of times to retry the fetch before failing
 *
 * @type {number}
 * @private
 */

const _timeoutRetries = 50;

/**
 * Tracks the number of attempts for the fetch
 *
 * @type {number}
 * @private
 */
let _attempt = 0;

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
   *   const response = await TranslationAPI.getTranslation({
   *     lc: 'en',
   *     cc: 'us',
   *   });
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

    return new Promise((resolve, reject) => {
      this.fetchTranslation(lang, country, resolve, reject);
    });
  }

  /**
   * Fetches the translation data from sessionStorage or data fetch
   *
   * @param {string} lang Language code
   * @param {string} country Country code
   * @param {Function} resolve resolves the Promise
   * @param {Function} reject rejects the promise
   */
  static fetchTranslation(lang, country, resolve, reject) {
    const sessionTranslation = JSON.parse(
      sessionStorage.getItem(`${_sessionTranslationKey}-${country}-${lang}`)
    );

    if (sessionTranslation) {
      resolve(sessionTranslation);
    } else if (_translationFetch[`${country}-${lang}`]) {
      _attempt++;

      if (_attempt < _timeoutRetries) {
        setTimeout(() => {
          this.fetchTranslation(lang, country, resolve, reject);
        }, 100);
      } else {
        reject();
      }
    } else {
      let proxy = '';
      if (root.location) {
        const currenthost = `${root.location.protocol}//${root.location.host}`;
        proxy = currenthost !== _host ? _proxy : '';
      }
      const url = `${proxy}${_endpoint}/${country}${lang}.json`;
      _attempt = 0;
      _translationFetch[`${country}-${lang}`] = true;
      axios
        .get(url, {
          headers: {
            'Content-Type': 'text/plain',
            origin: _host,
          },
        })
        .then(response => {
          const data = this.transformData(response.data);

          sessionStorage.setItem(
            `${_sessionTranslationKey}-${country}-${lang}`,
            JSON.stringify(data)
          );
          _translationFetch[`${country}-${lang}`] = false;
          resolve(data);
        })
        .catch(() => {
          _translationFetch[`${country}-${lang}`] = false;
          reject();
        });
    }
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
