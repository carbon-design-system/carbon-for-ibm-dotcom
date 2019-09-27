import { AnalyticsAPI } from '@carbon/ibmdotcom-services';

/**
 * Global methods to be used in various components
 */
const globalMethods = () => {
  // analytics scroll tracking
  AnalyticsAPI.initScrollTracker();
};

export default globalMethods;
