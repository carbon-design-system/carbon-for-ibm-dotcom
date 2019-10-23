import { AnalyticsAPI } from '@carbon/ibmdotcom-services';
import { DDOAPI } from '@carbon/ibmdotcom-services';

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
export function init() {
  if (_initialized) {
    return;
  } else {
    _initialized = true;
  }

  // Sets the version of the library in the DDO
  DDOAPI.setVersion();

  // analytics tracking
  AnalyticsAPI.initScrollTracker();
  AnalyticsAPI.initDynamicTabs();
}
