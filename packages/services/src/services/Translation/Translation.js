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
const _host =
  (process &&
    (process.env.REACT_APP_TRANSLATION_HOST || process.env.TRANSLATION_HOST)) ||
  'https://www.ibm.com';

/**
 * @constant {string | string} CORS proxy for lower environment calls
 * @private
 */
const _proxy =
  root.location?.host === 'www.ibm.com'
    ? ''
    : // Optional chaining operator in `process.env.ENVVAR` does not work in some build systems, notably Parcel
      (process &&
        (process.env.REACT_APP_CORS_PROXY || process.env.CORS_PROXY)) ||
      '';

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
 * The cache for in-flight or resolved requests for the i18n data, keyed by the initiating locale.
 *
 * @type {object<string, Translation>}
 */
const _requestsTranslation = {};

/**
 * Translation API class with methods for fetching i18n data for ibm.com
 */
class TranslationAPI {
  /**
   * Clears the cache.
   */
  static clearCache() {
    Object.keys(_requestsTranslation).forEach(
      key => delete _requestsTranslation[key]
    );
    for (let i = 0; i < sessionStorage.length; ++i) {
      const key = sessionStorage.key(i);
      if (key.indexOf(_sessionTranslationKey) === 0) {
        sessionStorage.removeItem(key);
      }
    }
  }

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
    } else {
      const key = `${lang}-${country}`;
      if (!_requestsTranslation[key]) {
        let proxy = '';
        if (root.location) {
          const currenthost = `${root.location.protocol}//${root.location.host}`;
          proxy = currenthost !== _host ? _proxy : '';
        }
        const url = `${proxy}${_endpoint}/${country}${lang}.json`;

        _requestsTranslation[key] = axios
          .get(url, {
            headers: {
              'Content-Type': 'text/plain',
              origin: _host,
            },
          })
          .then(response => this.transformData(response.data))
          .then(data => {
            sessionStorage.setItem(
              `${_sessionTranslationKey}-${country}-${lang}`,
              JSON.stringify(data)
            );
            return data;
          });
      }

      _requestsTranslation[key].then(resolve, reject);
    }
  }

  /**
   * Transforms translation data
   *
   * @param   {object} data translation data to be transformed
   * @returns {object} Translation data
   */
  static transformData(data) {
    const signedout = data.profileMenu?.signedout;
    const strReplace = 'state=https%3A%2F%2Fwww.ibm.com';
    const loginIdx = signedout.findIndex(
      elem => elem.url?.indexOf(strReplace) !== -1
    );
    if (loginIdx !== -1 && root.location) {
      const location = encodeURIComponent(root.location.href);
      data.profileMenu.signedout[loginIdx].url = signedout[
        loginIdx
      ].url.replace(strReplace, `state=${location}`);
    }

    data.footerMenu.push(data.socialFollow);
    return data;
  }
}

export default TranslationAPI;
