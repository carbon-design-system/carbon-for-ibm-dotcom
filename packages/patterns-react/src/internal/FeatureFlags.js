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
 * This determines if the leadspace (left-aligned) will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_LEADSPACE =
  process.env.DDS_LEADSPACE === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines if the leadspace (centered) will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_LEADSPACE_CENTERED =
  process.env.DDS_LEADSPACE_CENTERED === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines if the listsection will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_LISTSECTION =
  process.env.DDS_LISTSECTION === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines if the simplelongform will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_SIMPLELONGFORM =
  process.env.DDS_SIMPLELONGFORM === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines if the simplelongform will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_CARD_ARRAY =
  process.env.DDS_CARD_ARRAY === 'true' || DDS_FLAGS_ALL || false;

/** This determines if the contentarraywithpictograms will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_PICTOGRAM_ARRAY =
  process.env.DDS_PICTOGRAM_ARRAY === 'true' || DDS_FLAGS_ALL || false;

/** This determines if the cardSection will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_CARD_SECTION =
  process.env.DDS_CARD_SECTION === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines if the usecases will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_USECASES =
  process.env.DDS_USECASES === 'true' || DDS_FLAGS_ALL || false;

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
