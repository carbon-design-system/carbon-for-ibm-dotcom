/**
 * Copyright IBM Corp. 2016, 2020
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
 * Feature flag to turn on the Card with Pictogram
 *
 * @type {boolean}
 */
export const DDS_CARD_WITH_PICTOGRAM =
  process.env.DDS_CARD_WITH_PICTOGRAM === 'true' || DDS_FLAGS_ALL || false;

/**
 * Feature flag to enable custom login url in masthead profile menu
 *
 * @type {boolean}
 */
export const DDS_CUSTOM_PROFILE_LOGIN =
  process.env.DDS_CUSTOM_PROFILE_LOGIN === 'true' || DDS_FLAGS_ALL || false;

/**
 * Feature flag for the optional language selector in the footer
 *
 * @type {boolean}
 */
export const DDS_LANGUAGE_SELECTOR =
  process.env.DDS_LANGUAGE_SELECTOR === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines if the simplebenefits will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_SIMPLEBENEFITS =
  process.env.DDS_SIMPLEBENEFITS === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines if the logo grid will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_CALLOUT_DATA =
  process.env.DDS_CALLOUT_DATA === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines if content block - headlines will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_CONTENTBLOCK_HEADLINES =
  process.env.DDS_CONTENTBLOCK_HEADLINES === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines if Promo Banner will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_PROMO_BANNER =
  process.env.DDS_PROMO_BANNER === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines if Leadspace with search will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_LEADSPACE_WITH_SEARCH =
  process.env.DDS_LEADSPACE_WITH_SEARCH === 'true' || DDS_FLAGS_ALL || false;
