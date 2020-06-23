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
export const DDS_MASTHEAD_L1 =
  process.env.DDS_MASTHEAD_L1 === 'true' || DDS_FLAGS_ALL || false;

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
 * This determines if the simple overview will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_SIMPLE_OVERVIEW =
  process.env.DDS_SIMPLE_OVERVIEW === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines if the logo grid will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_LOGO_GRID =
  process.env.DDS_LOGO_GRID === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines if the logo grid will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_CALLOUT_DATA =
process.env.DDS_CALLOUT_DATA === 'true' || DDS_FLAGS_ALL || false;
