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
 * This determines if the locale selector will be rendered or not
 *
 * @type {string | boolean}
 */
export const FOOTER_LOCALE_BUTTON =
  process.env.FOOTER_LOCALE_BUTTON === 'true' || false;

/**
 * This flag turns on/off the ButtonGroup component
 *
 * @type {string | boolean}
 */
export const BUTTON_GROUP = process.env.BUTTON_GROUP === 'true' || false;

/*
 * Feature flag for CardLink component
 *
 * @type {string | boolean}
 */
export const CARD_LINK = process.env.CARD_LINK === 'true' || false;
