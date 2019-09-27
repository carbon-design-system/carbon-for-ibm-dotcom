import root from 'window-or-global';

/**
 * @constant {boolean} scrollTracker determines whether scroll tracking analytics is enabled
 * @private
 */
const scrollTracker = process.env.SCROLL_TRACKING === 'true' || false;

/**
 * Analytics API class with methods for firing analytics events on
 * ibm.com
 */
class AnalyticsAPI {
  /**
   * This method checks that the analytics script has been loaded
   * and fires an event to Coremetrics
   *
   * @param {object} eventData Object with standard IBM metric event properties and values to send to Coremetrics
   *
   * @example
   * import { AnalyticsAPI } from '@carbon/ibmdotcom-services';
   *
   * function fireEvent() {
   *    const eventData = {
   *        type: 'element',
   *        primaryCategory: 'MASTHEAD',
   *        eventName: 'CLICK',
   *        executionPath: 'masthead__profile',
   *        execPathReturnCode: 'none',
   *        targetTitle: 'profile'
   *    }
   *    AnalyticsAPI.registerEvent(eventData);
   * }
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
   * If scroll tracking is enabled, this method will fire an event for every 400px
   * user scrolls down the page. Only the deepest depth will fire the event (e.g if
   * user scrolls back up the page, the event will not be triggered)
   *
   * @example
   * import { AnalyticsAPI } from '@carbon/ibmdotcom-services';
   *
   * useEffect(() => {
   *    AnalyticsAPI.initScrollTracker();
   * },[]);
   **/
  static initScrollTracker() {
    if (scrollTracker) {
      let maxScrollDepth = 0;
      const scrollAnalytics = root.addEventListener('scroll', () => {
        let scrollDepth = root.pageYOffset;

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
}

export default AnalyticsAPI;
