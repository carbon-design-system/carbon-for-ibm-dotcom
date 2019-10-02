import root from 'window-or-global';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';

/**
 * DDO API class with methods of fetching search results for
 * ibm.com
 */
class DDOAPI {
  /**
   * Promise function that determines when the digital data object is ready
   *
   * @returns {Promise} Resolved data layer ready signal
   */
  static isReady() {
    return new Promise(resolve => {
      if (
        root.digitalData &&
        root.digitalData.page &&
        root.digitalData.page.isDataLayerReady
      ) {
        resolve();
      } else {
        root.document.addEventListener('datalayer_ready', () => resolve);
      }
    });
  }

  /**
   * Gets the full digitalData (DDO) object
   *
   * @returns {Promise<*>} Promise object
   */
  static async getAll() {
    return await this.isReady().then(() => {
      return root.digitalData;
    });
  }

  /**
   * Sets the version of the library to the DDO
   *
   * @returns {Promise<any>} Promise object
   */
  static async setVersion() {
    return await this.isReady().then(() => {
      root.digitalData.page.version = ddsSettings.version;
    });
  }

  /**
   * Gets the locale for the current page based on the language set as metadata
   *
   * @returns {Promise<*>} Promise object
   */
  static async getLanguage() {
    return await this.isReady().then(() => {
      return root.digitalData.page.pageInfo.language;
    });
  }
}

export default DDOAPI;
