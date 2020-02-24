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
 * This determines if the LightboxMediaViewer component will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_LIGHTBOX_MEDIA_VIEWER =
  process.env.DDS_LIGHTBOX_MEDIA_VIEWER === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines the image component will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_IMAGE_COMPONENT =
  process.env.DDS_IMAGE_COMPONENT === 'true' || DDS_FLAGS_ALL || false;

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
 * This determines if the simplebenefits will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_SIMPLEBENEFITS =
  process.env.DDS_SIMPLEBENEFITS === 'true' || DDS_FLAGS_ALL || false;

/**
 * This determines if the simplelongform will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_SIMPLELONGFORM =
  process.env.DDS_SIMPLELONGFORM === 'true' || DDS_FLAGS_ALL || false;

/** This determines if the contentarraywithpictograms will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_PICTOGRAM_ARRAY =
  process.env.DDS_PICTOGRAM_ARRAY === 'true' || DDS_FLAGS_ALL || false;

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

/**
 * This determines if the featuredlink will be rendered or not
 *
 * @type {string | boolean}
 */
export const DDS_FEATURED_LINK =
  process.env.DDS_FEATURED_LINK === 'true' || DDS_FLAGS_ALL || false;

/**
 * This flag turns on/off the ButtonGroup component
 *
 * @type {string | boolean}
 */
export const DDS_BUTTON_GROUP =
  process.env.DDS_BUTTON_GROUP === 'true' || DDS_FLAGS_ALL || false;
