import { geolocation, ipcinfoCookie } from '@carbon/ibmdotcom-utilities';
import axios from 'axios';
import root from 'window-or-global';

/**
 * @constant {string | string} Host for the Locale API call
 * @private
 */
const _host =
  (process && process.env.TRANSLATION_HOST) || 'https://1.www.s81c.com';

/**
 * @constant {string | string} CORS proxy for lower environment calls
 * @private
 */
const _proxy = (process && process.env.CORS_PROXY) || '';

/**
 * Sets the default location if nothing is returned
 *
 * @type {string}
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
const _localeNameDefault = 'United States - English';

/**
 * Locale API endpoint
 *
 * @type {string}
 * @private
 */
const _endpoint = `${_proxy}${_host}/common/js/dynamicnav/www/countrylist/jsononly`;

/**
 * Session Storage key for country list
 *
 * @type {string}
 * @private
 */
const _sessionListKey = 'countrylist';

/**
 * Locale API class with method of fetching user's locale for
 * ibm.com
 */
class LocaleAPI {
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
    const lang = this.getLang();
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
   * Gets the `lang` html attribute containing the cc and lc
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
  }

  /**
   * This fetches the language display name based on language/locale combo
   *
   * @param {object} langCode lang code with cc and lc
   *
   * @returns {Promise<string>} Display name of locale/language
   */
  static async getLangDisplay(langCode) {
    const lang = langCode ? langCode : this.getLang();
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
      return `${location[0].name} - ${location[0].locale[0][1]}`;
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
   *    const list = await LocaleAPI.getList();
   * }
   */
  static async getList({ cc, lc }) {
    const sessionList = JSON.parse(
      sessionStorage.getItem(`${_sessionListKey}-${cc}-${lc}`)
    );

    if (sessionList) {
      return sessionList;
    } else {
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };

      const defaultUrl = `${_endpoint}/${_localeDefault.cc}${_localeDefault.lc}-utf8.json`;
      const url = `${_endpoint}/${cc}${lc}-utf8.json`;

      /**
       * if the json file for the cc-lc combo does not exist,
       * browser will automatically use the us-en country list
       */
      const [defaultList, translatedList] = await Promise.all([
        axios.get(defaultUrl, axiosConfig).catch(() => null),
        axios.get(url, axiosConfig).catch(() => null),
      ]);

      const list =
        translatedList !== null && translatedList.data
          ? translatedList.data
          : defaultList.data;

      sessionStorage.setItem(
        `${_sessionListKey}-${cc}-${lc}`,
        JSON.stringify(list)
      );

      return list;
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
