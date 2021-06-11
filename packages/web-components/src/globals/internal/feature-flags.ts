/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
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
 * Enables the Callout Data feature
 *
 * @type {boolean}
 */
export const DDS_CALLOUT_DATA: boolean = process!.env.DDS_CALLOUT_DATA === 'true' || DDS_FLAGS_ALL || false;

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
 * Enables Cloud Masthead Components
 *
 * @type {boolean}
 */
export const DDS_CLOUD_MASTHEAD: boolean = process!.env.DDS_CLOUD_MASTHEAD === 'true' || DDS_FLAGS_ALL || false;
