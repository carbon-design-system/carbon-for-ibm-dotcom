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
 * This determines if the leadspace will be rendered or not
 *
 * @type {string | boolean}
 */
export const LEADSPACE =
  process.env.LEADSPACE === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines if the listsection will be rendered or not
 *
 * @type {string | boolean}
 */
export const LISTSECTION =
  process.env.LISTSECTION === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines if the leadspace will be rendered or not
 *
 * @type {string | boolean}
 */
export const SIMPLELONGFORM =
  process.env.SIMPLELONGFORM === 'true' || DDS_FLAGS_ALL || false;
