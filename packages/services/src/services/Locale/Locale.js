import root from 'window-or-global';
import axios from 'axios';
import { ipcinfoCookie, geolocation } from '@carbon/ibmdotcom-utilities';

/**
 * @constant {string | string} Host for the Locale API call
 * @private
 */
const _host = process.env.TRANSLATION_HOST || 'https://www.ibm.com';

/**
 * @constant {string | string} CORS proxy for lower environment calls
 * @private
 */
const _proxy = process.env.CORS_PROXY || '';

/**
 * Locale API endpoint
 *
 * @type {string}
 * @private
 */
const _endpoint = `${_proxy}${_host}/common/v18/js/data/countrylist`;

/**
 * Session Storage key for country list
 * @type {string}
 * @private
 */
const _sessionList = 'countryList';

/**
 * Locale API class with method of fetching user's locale for
 * ibm.com
 */
class LocaleAPI {
  /**
   * Gets the user's locale
   *
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
    if (cookie && cookie.cc && cookie.lc) {
      await this.getList(cookie);
      return cookie;
    } else if (root.document.documentElement.lang) {
      // grab locale from the html lang attribute
      const lang = root.document.documentElement.lang.toLowerCase();
      const codes = lang.split('-');
      const locale = { cc: codes[1], lc: codes[0] };
      await this.getList(locale);
      return locale;
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
    const url = `${_endpoint}/${cc}${lc}-utf8.json`;
    const sessionList = JSON.parse(sessionStorage.getItem(_sessionList));

    if (sessionList && sessionList.locale === `${lc}-${cc}`) {
      return sessionList;
    } else {
      /**
       * if the json file for the cc-lc combo does not exist,
       * browser will automatically redirect to the us-en country list
       */
      const list = await axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        })
        .then(response => response.data);

      // add locale key to the country list object
      const countryList = {
        ...list,
        locale: `${lc}-${cc}`,
      };

      sessionStorage.setItem(_sessionList, JSON.stringify(countryList));

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
