import { AnalyticsAPI } from '@carbon/ibmdotcom-services';

/**
 * Global methods to be used in various components
 * including analytics scroll tracking
 */
const global = () => {
  AnalyticsAPI.initScrollTracker();
};

export default global;
