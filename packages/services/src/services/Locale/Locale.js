/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axios from 'axios';
import DDOAPI from '../DDO/DDO';
import geolocation from '@carbon/ibmdotcom-utilities/es/utilities/geolocation/geolocation';
import ipcinfoCookie from '@carbon/ibmdotcom-utilities/es/utilities/ipcinfoCookie/ipcinfoCookie';
import root from 'window-or-global';

/**
 * @constant {string | string} Host for the Locale API call
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
 * Sets the default location if nothing is returned
 *
 * @type {object}
 * @private
 */
const _localeDefault = {
  lc: 'en',
  cc: 'us',
};

/**
 * Default display name for lang combination
 *
 * @type {string}
 * @private
 */
const _localeNameDefault = 'United States — English';

/**
 * Locale API endpoint
 *
 * @type {string}
 * @private
 */
const _endpoint = `${_proxy}${_host}/common/js/dynamicnav/www/countrylist/jsononly`;

/**
 * Configuration for axios
 *
 * @type {{headers: {'Content-Type': string}}}
 * @private
 */
const _axiosConfig = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
};

/**
 * Session Storage key for country list
 *
 * @type {string}
 * @private
 */
const _sessionListKey = 'dds-countrylist';

/**
 * Use the <html> lang attr to determine a return locale object
 *
 * @type {object}
 * @private
 */
const _getLocaleByLangAttr = () => {
  if (root.document.documentElement.lang) {
    const lang = root.document.documentElement.lang.toLowerCase();
    if (lang.indexOf('-') === -1) {
      return _localeDefault;
    } else {
      const codes = lang.split('-');
      return { cc: codes[1], lc: codes[0] };
    }
  } else {
    return _localeDefault;
  }
};

/**
 * The cache for in-flight or resolved requests for the country list, keyed by the initiating locale.
 *
 * @type {object<string, LocaleList>}
 */
const _requestsList = {};

/**
 * Return a locale object based on the DDO API, or "false"
 * so the consumer can decide what to do next
 *
 * @type {(object | boolean)}
 * @private
 */
async function _getLocaleFromDDO() {
  const ddoLocal = await DDOAPI.getAll();

  if (ddoLocal?.page?.pageInfo?.ibm) {
    let pageInfoIBM = ddoLocal.page.pageInfo.ibm;

    // Set proper LC for us to use.
    if (ddoLocal.page.pageInfo.language) {
      pageInfoIBM.lc = ddoLocal.page.pageInfo.language
        .substring(0, 2)
        .toLowerCase();
    }

    // Set proper CC for us to use.
    if (pageInfoIBM.country) {
      pageInfoIBM.cc = pageInfoIBM.country.toLowerCase().trim();

      // If there are multiple countries use just the first one for the CC value
      if (pageInfoIBM.cc.indexOf(',') > -1)
        pageInfoIBM.cc = pageInfoIBM.cc
          .substring(0, pageInfoIBM.cc.indexOf(','))
          .trim();

      // Gb will be uk elsewhere
      if (pageInfoIBM.cc === 'gb') pageInfoIBM.cc = 'uk';

      // Map worldwide (ZZ) pages to US
      if (pageInfoIBM.cc === 'zz') pageInfoIBM.cc = 'us';
    }

    if (!pageInfoIBM.lc || !pageInfoIBM.cc) return false;

    return {
      cc: pageInfoIBM.cc,
      lc: pageInfoIBM.lc,
    };
  }
  return false;
}

/**
 * Locale API class with method of fetching user's locale for
 * ibm.com
 */
class LocaleAPI {
  /**
   * Clears the cache.
   */
  static clearCache() {
    Object.keys(_requestsList).forEach(key => delete _requestsList[key]);
    for (let i = 0; i < sessionStorage.length; ++i) {
      const key = sessionStorage.key(i);
      if (key.indexOf(_sessionListKey) === 0) {
        sessionStorage.removeItem(key);
      }
    }
  }

  /**
   * Gets the user's locale
   *
   * Grab the locale from the `lang` attribute from html, else
   * check if ipcinfo cookie exists (ipcinfoCookie util)
   * if not, retrieve the user's locale through geolocation util + gets user's
   * browser language preference then set the cookie
   *
   * @returns {object} object with lc and cc
   *
   * @example
   * import { LocaleAPI } from '@carbon/ibmdotcom-services';
   *
   * async function getLocale() {
   *   const locale = await LocaleAPI.getLocale();
   *   return locale;
   * }
   */
  static async getLocale() {
    const cookie = ipcinfoCookie.get();
    const lang = await this.getLang();
    // grab locale from the html lang attribute
    if (lang) {
      await this.getList(lang);
      return lang;
    }
    // grab the locale from the cookie
    else if (cookie && cookie.cc && cookie.lc) {
      await this.getList(cookie);
      return cookie;
    } else {
      const cc = await geolocation();
      /**
       * get language preference from browser
       * can return in either 'en-US' format or 'en' so will need to extract language only
       */
      const lang = root.navigator.language;
      const lc = lang.split('-')[0];

      if (cc && lc) {
        const list = await this.getList({ cc, lc });
        const verifiedCodes = this.verifyLocale(cc, lc, list);

        // set the ipcInfo cookie
        ipcinfoCookie.set(verifiedCodes);

        return verifiedCodes;
      }
    }
  }

  /**
   * Checks for DDO object to return the correct cc and lc
   * Otherwise gets those values from the <html> lang attribute
   *
   * @returns {object} locale object
   *
   * @example
   * import { LocaleAPI } from '@carbon/ibmdotcom-services';
   *
   * function async getLocale() {
   *    const locale = await LocaleAPI.getLang();
   * }
   */
  static async getLang() {
    const getLocaleFromDDO = await _getLocaleFromDDO();

    if (getLocaleFromDDO) {
      return getLocaleFromDDO;
    } else return _getLocaleByLangAttr();
  }

  /**
   * This fetches the language display name based on language/locale combo
   *
   * @param {object} langCode lang code with cc and lc
   *
   * @returns {Promise<string>} Display name of locale/language
   */
  static async getLangDisplay(langCode) {
    const lang = langCode ? langCode : await this.getLang();
    const list = await this.getList(lang);
    // combines the countryList arrays
    let countries = [];
    list.regionList.forEach(region => {
      countries = countries.concat(region.countryList);
    });

    // get match for countries with multiple languages
    const location = countries.filter(country => {
      let htmlLang = country.locale.findIndex(
        loc => loc[0] === `${lang.lc}-${lang.cc}`
      );

      if (htmlLang !== -1) {
        let localeMatch = country.locale.filter(l =>
          l.includes(`${lang.lc}-${lang.cc}`)
        );
        country.locale.splice(0, country.locale.length, ...localeMatch);
        return country;
      }
    });

    if (location.length) {
      return `${location[0].name} — ${location[0].locale[0][1]}`;
    } else {
      return _localeNameDefault;
    }
  }

  /**
   * Get the country list of all supported countries and their languages
   * if not set in session storage
   *
   * @param {object} params params object
   * @param {string} params.cc country code
   * @param {string} params.lc language code
   *
   * @returns {Promise<any>} promise object
   *
   * @example
   * import { LocaleAPI } from '@carbon/ibmdotcom-services';
   *
   * function async getLocale() {
   *    const list = await LocaleAPI.getList({ cc: 'us', lc: 'en' });
   *    return list;
   * }
   */
  static async getList({ cc, lc }) {
    return new Promise((resolve, reject) => {
      this.fetchList(cc, lc, resolve, reject);
    });
  }

  /**
   * Fetches the list data based on cc/lc combination
   *
   * @param {string} cc country code
   * @param {string} lc language code
   * @param {Function} resolve resolves the Promise
   * @param {Function} reject rejects the promise
   */
  static fetchList(cc, lc, resolve, reject) {
    const sessionList = JSON.parse(
      sessionStorage.getItem(`${_sessionListKey}-${cc}-${lc}`)
    );

    if (sessionList) {
      resolve(sessionList);
    } else {
      const key = `${lc}-${cc}`;
      if (!_requestsList[key]) {
        const url = `${_endpoint}/${cc}${lc}-utf8.json`;
        _requestsList[key] = axios.get(url, _axiosConfig).then(response => {
          const { data } = response;
          sessionStorage.setItem(
            `${_sessionListKey}-${cc}-${lc}`,
            JSON.stringify(data)
          );
          return data;
        });
      }

      _requestsList[key].then(resolve, error => {
        if (cc === _localeDefault.cc && lc === _localeDefault.lc) {
          reject(error);
        } else {
          this.fetchList(_localeDefault.cc, _localeDefault.lc, resolve, reject);
        }
      });
    }
  }

  /**
   * Verify that the cc and lc combo is in the list of
   * supported cc-lc combos
   *
   * @param {string} cc country code
   * @param {string} lc language code
   * @param {object} list country list
   *
   * @returns {object} object with lc and cc
   * @example
   * import { LocaleAPI } from '@carbon/ibmdotcom-services';
   *
   * async function getLocale() {
   *   const locale = await LocaleAPI.verifyLocale(cc, lc, data);
   *   return locale;
   * }
   */
  static verifyLocale(cc, lc, list) {
    let priorityLC;
    let locale;

    const language =
      list &&
      list.regionList.forEach(region =>
        region.countryList.forEach(country => {
          const code = country.locale[0][0].split('-');
          const countryCode = code[1];
          const languageCode = code[0];
          if (countryCode === cc && languageCode === lc) {
            locale = { cc, lc };
          }
          // save the priority language associated with the user's country code
          else if (countryCode === cc && !priorityLC) {
            priorityLC = languageCode;
          }
        })
      );
    if (!language && priorityLC) {
      locale = { cc, lc: priorityLC };
    }
    return locale;
  }
}

export default LocaleAPI;
