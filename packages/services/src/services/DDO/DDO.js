import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import root from 'window-or-global';

/**
 * Returns boolean if the isDataLayerReady flag is true
 *
 * @returns {*} boolean flag if data layer is ready in the digitalData object
 * @private
 */
function _checkFlag() {
  return (
    root.digitalData &&
    root.digitalData.page &&
    root.digitalData.page.isDataLayerReady
  );
}

/**
 * Number of times to retry the datalayer ready loop before failing
 *
 * @type {number}
 * @private
 */
const _timeoutRetries = 50;

/**
 * Tracks the number of attempts for the datalayer ready loop
 *
 * @type {number}
 * @private
 */
let _attempt = 0;

/**
 * Timeout loop to check if the digitalData object is ready.
 * This is the only way to achieve this without jQuery, as the event trigger
 * is fired from jQuery's custom event layer as
 * $(document).trigger('datalayer_ready')
 *
 * @param {Function} resolve Resolve function
 * @param {Function} reject Reject function
 * @private
 */
function _datalayerReady(resolve, reject) {
  if (_checkFlag()) {
    resolve();
  } else {
    _attempt++;

    if (_attempt < _timeoutRetries) {
      setTimeout(() => {
        _datalayerReady(resolve, reject);
      }, 100);
    } else {
      reject();
    }
  }
}

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
    return new Promise((resolve, reject) => {
      _datalayerReady(resolve, reject);
    });
  }

  /**
   * Gets the full digitalData (DDO) object
   *
   * @returns {Promise<*>} Promise object
   */
  static async getAll() {
    return await this.isReady()
      .then(() => {
        return root.digitalData;
      })
      .catch(() => {
        return null;
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
