/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axios from 'axios';
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
  'https://1.www.s81c.com';

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
const _endpoint = `${_host}/common/js/dynamicnav/www/countrylist/jsononly`;

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
 * Two hours in milliseconds to compare session timestamp.
 *
 * @type {number}
 * @private
 */
const _twoHours = 60 * 60 * 2000;

/**
 * Use the <html> lang attr to determine a return locale object
 *
 * @type {object}
 * @private
 */
const _getLocaleByLangAttr = () => {
  if (root.document?.documentElement?.lang) {
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
function _getLocaleFromDDO() {
  const ddoLocal = Object.assign({}, root.digitalData || {});

  if (
    ddoLocal.page?.pageInfo?.language &&
    ddoLocal.page?.pageInfo?.ibm?.country
  ) {
    const lang = {};

    // Set proper LC for us to use.
    lang.lc = ddoLocal.page.pageInfo.language.substring(0, 2).toLowerCase();

    lang.cc = ddoLocal.page.pageInfo.ibm.country.toLowerCase().trim();

    // If there are multiple countries use just the first one for the CC value
    if (lang.cc.indexOf(',') > -1)
      lang.cc = lang.cc.substring(0, lang.cc.indexOf(',')).trim();

    // Gb will be uk elsewhere
    if (lang.cc === 'gb') {
      lang.cc = 'uk';
    }

    // Map worldwide (ZZ) pages to US
    if (lang.cc === 'zz') {
      lang.cc = 'us';
    }

    return lang;
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
    if (typeof sessionStorage !== 'undefined') {
      Object.keys(_requestsList).forEach(key => delete _requestsList[key]);
      for (let i = 0; i < sessionStorage.length; ++i) {
        const key = sessionStorage.key(i);
        if (key.indexOf(_sessionListKey) === 0) {
          sessionStorage.removeItem(key);
        }
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
  static getLang() {
    return new Promise(resolve => {
      const getLocaleFromDDO = _getLocaleFromDDO();

      if (getLocaleFromDDO) {
        resolve(getLocaleFromDDO);
      } else {
        resolve(_getLocaleByLangAttr());
      }
    });
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
    const itemKey = `${_sessionListKey}-${cc}-${lc}`;

    const sessionList = this.getSessionCache(itemKey);

    if (sessionList) {
      resolve(sessionList);
    } else {
      const key = `${lc}-${cc}`;
      if (!_requestsList[key]) {
        const url = `${_endpoint}/${cc}${lc}-utf8.json`;
        _requestsList[key] = axios.get(url, _axiosConfig).then(response => {
          const { data } = response;
          data['timestamp'] = Date.now();
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

  /**
   * Retrieves session cache and checks if cache needs to be refreshed
   *
   * @param   {string} key session storage key
   * @returns {object} session storage object
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

export default LocaleAPI;
