/**
 * service to fire a stats/metrics event for an action
 *
 * @param {object} eventData Object with standard IBM metric event properties and values to send to Coremetrics
 * @returns {object} JSX object
 * 
 * example of eventData object expected:
 * {
    type: 'element',
    primaryCategory: 'MASTHEAD',
    eventName: 'CLICK',
    executionPath: 'masthead__profile',
    execPathReturnCode: 'none',
    targetTitle: 'profile',
  }
 *
 */
function RegisterAnalyticsEvent(eventData) {
  if (window.ibmStats) {
    return window.ibmStats.event(eventData);
  }
}

export default RegisterAnalyticsEvent;
