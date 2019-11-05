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
 * This flag will determine if all feature flags should be enabled
 *
 * @type {boolean}
 */
export const DDS_FLAGS_ALL = process.env.DDS_FLAGS_ALL === 'true' || false;

/**
 * Feature flag to turn on the Masthead L1
 *
 * @type {boolean}
 */
export const MASTHEAD_L1 =
  process.env.MASTHEAD_L1 === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines if the locale selector will be rendered or not
 *
 * @type {string | boolean}
 */
export const FOOTER_LOCALE_BUTTON =
  process.env.FOOTER_LOCALE_BUTTON === 'true' || DDS_FLAGS_ALL || false;

/**
 * This flag turns on/off the ButtonGroup component
 *
 * @type {string | boolean}
 */
export const BUTTON_GROUP =
  process.env.BUTTON_GROUP === 'true' || DDS_FLAGS_ALL || false;

/**
 * Feature flag for CardLink component
 * @type {boolean}
 */
export const CARD_LINK =
  process.env.CARD_LINK === 'true' || DDS_FLAGS_ALL || false;
