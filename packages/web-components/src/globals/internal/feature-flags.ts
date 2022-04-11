/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file contains the list of the default values of compile-time feature flags.
 */

/* eslint-disable import/prefer-default-export */

/**
 * This flag will determine if all feature flags should be enabled
 *
 * @type {boolean}
 */
export const DDS_FLAGS_ALL: boolean = process!.env.DDS_FLAGS_ALL === 'true' || false;

/**
 * Enables Content Block - Headline
 *
 * @type {boolean}
 */
export const DDS_CONTENT_BLOCK_HEADLINES: boolean = process!.env.DDS_CONTENT_BLOCK_HEADLINES === 'true' || DDS_FLAGS_ALL || false;

/**
 * Enables Content Block - Card static
 *
 * @type {boolean}
 */
export const DDS_CONTENT_BLOCK_CARD_STATIC: boolean =
  process!.env.DDS_CONTENT_BLOCK_CARD_STATIC === 'true' || DDS_FLAGS_ALL || false;

/**
 * Enables scoped search in the Masthead search
 *
 * @type {boolean}
 */
export const DDS_SCOPED_SEARCH: boolean = process!.env.DDS_SCOPED_SEARCH === 'true' || DDS_FLAGS_ALL || false;

/**
 * Enables Cloud Masthead Components
 *
 * @type {boolean}
 */
export const DDS_CLOUD_MASTHEAD: boolean = process!.env.DDS_CLOUD_MASTHEAD === 'true' || DDS_FLAGS_ALL || false;

/**
 * Enables custom profile login url in Masthead
 *
 * @type {boolean}
 */
export const DDS_CUSTOM_PROFILE_LOGIN: boolean = process!.env.DDS_CUSTOM_PROFILE_LOGIN === 'true' || DDS_FLAGS_ALL || false;

/**
 * Enables Pricing Table
 *
 * @type {boolean}
 */
export const DDS_PRICING_TABLE: boolean = process!.env.DDS_PRICING_TABLE === 'true' || DDS_FLAGS_ALL || false;
