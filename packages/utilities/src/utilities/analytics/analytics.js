/**
 * Helper function to fire a stats/metrics event for an action
 *
 * @param {object} eventData Object with standard IBM metric event properties and values to send to Coremetrics
 * @returns {object} JSX object
 *
 */
function analytics(eventData) {
  if (window.ibmStats) {
    console.log('sending info');
    return window.ibmStats.event(eventData);
  }
}

export default analytics;
