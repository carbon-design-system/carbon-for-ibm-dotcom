/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AnalyticsAPI } from '../Analytics';
import { DDOAPI } from '../DDO';

/**
 * Flag to determine if the global init has been fired
 *
 * @type {boolean}
 * @private
 */
let _initialized = false;

/**
 * Initializes various global functions
 */
export function globalInit() {
  if (_initialized) {
    return;
  } else {
    _initialized = true;
  }

  // Sets the version of the library in the DDO
  DDOAPI.setVersion();

  // analytics tracking
  AnalyticsAPI.initAll();
}
