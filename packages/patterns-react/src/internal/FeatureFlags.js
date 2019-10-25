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
 * This determines if the leadspace will be rendered or not
 *
 * @type {string | boolean}
 */
export const LEADSPACE = process.env.LEADSPACE === 'true' || false;

/**
 * This determines if the listsection will be rendered or not
 *
 * @type {string | boolean}
 */
export const LISTSECTION = process.env.LISTSECTION === 'true' || false;
