/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file contains the list of the default values of compile-time feature flags.
 */

/**
 * Helper function for rendering feature flag
 *
 * @param {string} flag identifies which flag is used
 * @param {string} jsx pass in the jsx to render conditionally
 * @private
 * @returns {object} JSX object
 */
export const featureFlag = (flag, jsx) => {
  return flag ? jsx : null;
};

/**
 * This determines if the locale selector will be rendered or not
 *
 * @type {string | boolean}
 */
export const footerLocaleButton =
  process.env.FOOTER_LOCALE_BTN === 'true' || false;
