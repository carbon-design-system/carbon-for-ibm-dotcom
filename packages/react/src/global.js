import { AnalyticsAPI } from '@carbon/ibmdotcom-services';
import { DDOAPI } from '@carbon/ibmdotcom-services';

/**
 * Initializes various global functions
 */
export function init() {
  // Sets the version of the library in the DDO
  DDOAPI.setVersion();

  // analytics scroll tracking
  AnalyticsAPI.initScrollTracker();
}
