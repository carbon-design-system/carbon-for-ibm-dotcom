import Cookies from 'js-cookie';

/**
 *  Name of cookie needed to grab cc and lc
 */
const _cookieName = 'ipcInfo';

/**
 * Utility to set and get the ipcInfo cookie needed to determine country and language code
 *
 */
class ipcinfoCookie {
  /**
   * retreive the ipcInfo cookie that contains the cc and lc
   * decodes and converts to object
   *
   * @example
   * import { ipcinfoCookie } from '@carbon/ibmdotcom-utilities';
   *
   * const info = ipcinfoCookie.get();
   *
   *
   * @returns {object} object containing cc and lc
   */
  static get() {
    const ipcinfo = Cookies.get(_cookieName);
    if (ipcinfo) {
      let cc;
      let lc;
      const info = decodeURIComponent(ipcinfo).split(';');
      info.map(code => {
        const itemParts = code.split('=');
        if (itemParts[0] === 'cc') cc = itemParts[1];
        if (itemParts[0] === 'lc') lc = itemParts[1];
      });

      return { cc, lc };
    }
  }

  /**
   * set the ipcInfo cookie
   * takes care of converting to string and encoding
   *
   * @param {string} cc country coude
   * @param {string} lc language code
   *
   * @example
   * import { ipcinfoCookie } from '@carbon/ibmdotcom-utilities';
   *
   * ipcinfoCookie.set("us", "en");
   *
   */
  static set(cc, lc) {
    const info = `cc=${cc};lc=${lc}`;

    Cookies.set(_cookieName, encodeURIComponent(info));
  }
}

export default ipcinfoCookie;
