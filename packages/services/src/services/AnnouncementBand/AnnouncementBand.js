/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axios from 'axios';
import { LocaleAPI } from '../Locale';

/**
 * @constant {string | string} Host for the Translation API call
 * @private
 */
const _host =
  (process &&
    (process.env.REACT_APP_TRANSLATION_HOST || process.env.TRANSLATION_HOST)) ||
  'https://www.ibm.com';

/**
 * Translation API default endpoint
 *
 * @type {string}
 * @private
 */
const _ddsEndpointDefault = '/common/v18/mastheadbanner/masthead-banner.json';

/**
 * Translation API endpoint
 *
 * @type {string}
 * @private
 */
const _ddsEndpoint =
  (process &&
    (process.env.REACT_APP_DDS_TRANSLATION_ENDPOINT ||
      process.env.DDS_TRANSLATION_ENDPOINT)) ||
  _ddsEndpointDefault;

/**
 * Session Storage key for translation data
 *
 * @type {string}
 * @private
 */
const _sessionBannerKey = 'dds-masthead-banner';

/**
 * The cache for in-flight or resolved requests for the i18n data, keyed by the initiating locale.
 *
 * @type {object}
 */
const _requestsTranslation = {};

/**
 * Two hours in milliseconds to compare session timestamp.
 *
 * @type {number}
 * @private
 */
const _twoHours = 60 * 60 * 2000;

/**
 * Translation API class with methods for fetching i18n data for ibm.com
 * Announcement Band API class with methods for fetching announcement data for ibm.com
 */
class AnnouncementBandAPI {
  /**
   * Clears the cache.
   *
   * @param {string} endpoint specified API non-default endpoint (optional)
   */
  static clearCache(endpoint) {
    const sessionKey = this.getSessionKey(endpoint);
    if (typeof sessionStorage !== 'undefined') {
      Object.keys(_requestsTranslation).forEach(
        key => delete _requestsTranslation[key]
      );
      for (let i = 0; i < sessionStorage.length; ++i) {
        const key = sessionStorage.key(i);
        if (key.indexOf(sessionKey) === 0) {
          sessionStorage.removeItem(key);
        }
      }
    }
  }

  /**
   * Returns translation i18n data
   *
   * @param {object} codes object containing lc and cc
   * @param {string} endpoint endpoint to fetch data from (optional)
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
  static async getTranslation(codes, endpoint) {
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
      this.fetchTranslation(lang, country, endpoint, resolve, reject);
    });
  }

  /**
   * Fetches the translation data from sessionStorage or data fetch
   *
   * @param {string} lang Language code
   * @param {string} country Country code
   * @param {string} endpoint endpoint to fetch data (optional)
   * @param {Function} resolve resolves the Promise
   * @param {Function} reject rejects the promise
   * @private
   */
  static fetchTranslation(lang, country, endpoint, resolve, reject) {
    const sessionKey = this.getSessionKey(endpoint);
    const itemKey = `${sessionKey}`;

    const sessionTranslation = this.getSessionCache(itemKey);

    if (sessionTranslation) {
      resolve(sessionTranslation);
    } else {
      const key = `${lang}-${country}`;
      if (!_requestsTranslation[key]) {
        const url = `${_host}${endpoint || _ddsEndpoint}`;

        _requestsTranslation[key] = axios
          .get(url, {
            headers: {
              'Content-Type': 'text/plain',
              origin: _host,
            },
          })
          .then(data => {
            data.data['timestamp'] = Date.now();
            if (typeof sessionStorage !== 'undefined') {
              sessionStorage.setItem(
                `${sessionKey}`,
                JSON.stringify(data.data)
              );
            }
            return data;
          });
      }

      _requestsTranslation[key].then(resolve, reject);
    }
  }

  /**
   * sets the Session key depending on API endpoint
   *
   * @param {string} endpoint specified endpoint passed as arg in getTranslation()
   * @returns {string} session key
   * @private
   */
  static getSessionKey(endpoint) {
    let sessionKey = _sessionBannerKey;
    // form session key from specified endpoint
    if (_ddsEndpointDefault !== _ddsEndpoint || endpoint) {
      const endpointSrc = endpoint || _ddsEndpoint;
      sessionKey = endpointSrc.replace(
        /[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi,
        ''
      );
    }

    return sessionKey;
  }

  /**
   * Retrieves session cache and checks if cache needs to be refreshed
   *
   * @param   {string} key session storage key
   * @returns {object} session storage object
   * @private
   */
  static getSessionCache(key) {
    const session =
      typeof sessionStorage === 'undefined'
        ? undefined
        : JSON.parse(sessionStorage.getItem(key));

    if (!session || !session.timestamp) {
      return;
    }

    const currentTime = Date.now(),
      timeDiff = currentTime - session.timestamp;

    if (timeDiff > _twoHours) {
      sessionStorage.removeItem(key);
      return;
    }
    return session;
  }
}

export default AnnouncementBandAPI;
