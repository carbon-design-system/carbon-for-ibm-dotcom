/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
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
export const C4D_FLAGS_ALL: boolean =
  process!.env.C4D_FLAGS_ALL === 'true' || false;

/**
 * Enables Content Block - Headline
 *
 * @type {boolean}
 */
export const C4D_CONTENT_BLOCK_HEADLINES: boolean =
  process!.env.C4D_CONTENT_BLOCK_HEADLINES === 'true' || C4D_FLAGS_ALL || false;

/**
 * Enables Content Block - Card static
 *
 * @type {boolean}
 */
export const C4D_CONTENT_BLOCK_CARD_STATIC: boolean =
  process!.env.C4D_CONTENT_BLOCK_CARD_STATIC === 'true' ||
  C4D_FLAGS_ALL ||
  false;

/**
 * Enables scoped search in the Masthead search
 *
 * @type {boolean}
 */
export const C4D_SCOPED_SEARCH: boolean =
  process!.env.C4D_SCOPED_SEARCH === 'true' || C4D_FLAGS_ALL || false;

/**
 * Enables custom profile login url in Masthead
 *
 * @type {boolean}
 */
export const C4D_CUSTOM_PROFILE_LOGIN: boolean =
  process!.env.C4D_CUSTOM_PROFILE_LOGIN === 'true' || C4D_FLAGS_ALL || false;

/**
 * Enables Pricing Table
 *
 * @type {boolean}
 */
export const C4D_PRICING_TABLE: boolean =
  process!.env.C4D_PRICING_TABLE === 'true' || C4D_FLAGS_ALL || false;
