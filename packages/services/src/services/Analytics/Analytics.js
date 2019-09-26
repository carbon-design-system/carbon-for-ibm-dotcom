import root from 'window-or-global';
/**
 * Analytics API class with methods for firing analytics events on
 * ibm.com
 */
class AnalyticsAPI {
  /**
   * service to fire a stats/metrics event for an action
   *
   * @param {object} eventData Object with standard IBM metric event properties and values to send to Coremetrics
   *
   * @example
   * {type: 'element', primaryCategory: 'MASTHEAD', eventName: 'CLICK', executionPath: 'masthead__profile', execPathReturnCode: 'none', targetTitle: 'profile'}
   *
   *
   */
  static registerEvent(eventData) {
    if (root.ibmStats) {
      root.ibmStats.event(eventData);
    }
  }

  /**
   *
   * method scroll tracking
   *
   **/
  static initScrollTracker() {
    let maxScrollDepth = 0;
    const scrollAnalytics = root.addEventListener('scroll', () => {
      let scrollDepth = root.pageYOffset;

      // Only fire the event at 400px intervals and at the deepest scroll depth
      if (scrollDepth % 400 === 0 && scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        this.registerEvent({
          type: 'element',
          primaryCategory: 'SCROLL DISTANCE',
          eventName: scrollDepth,
          executionPath: root.innerWidth,
          execPathReturnCode: root.innerHeight,
        });
      }
    });
    root.removeEventListener('scroll', () => scrollAnalytics);
  }
}

export default AnalyticsAPI;
