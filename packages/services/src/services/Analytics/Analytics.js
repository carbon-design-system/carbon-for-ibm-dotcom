import root from 'window-or-global';

/**
 * @constant {boolean} scrollTracker determines whether scroll tracking analytics is enabled
 * @private
 */
const _scrollTracker =
  (process && process.env.SCROLL_TRACKING === 'true') || false;

/**
 * Current NODE_ENV
 *
 * @type {string | string}
 * @private
 */
const _env = (process && process.env.NODE_ENV) || 'development';

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
   * Initializes all analytics global tracking init functions
   */
  static initAll() {
    this.initScrollTracker();
    this.initDynamicTabs();
    this.initModals();
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
   * function init() {
   *   AnalyticsAPI.initScrollTracker();
   * }
   **/
  static initScrollTracker() {
    if (_scrollTracker) {
      const trackingInterval = 400;
      let trackedMarker = 0;
      let curMarker = 0;
      let didScroll = false;
      const fireEvent = this.registerEvent;

      const scrollAnalytics = root.addEventListener('scroll', () => {
        didScroll = true;
      });

      setInterval(function() {
        if (didScroll) {
          didScroll = false;
          curMarker = Math.floor(root.pageYOffset / trackingInterval);

          if (curMarker > trackedMarker) {
            trackedMarker = curMarker;
            fireEvent({
              type: 'element',
              primaryCategory: 'SCROLL DISTANCE',
              eventName: trackingInterval * trackedMarker,
              executionPath: root.innerWidth,
              execPathReturnCode: root.innerHeight,
            });
          }
        }
      }, 50);

      root.removeEventListener('scroll', () => scrollAnalytics);
    }
  }

  /**
   * This instantiates an event listener to trigger an event if the Carbon
   * Tabs component is being interacted with by the user
   *
   * @example
   * import { AnalyticsAPI } from '@carbon/ibmdotcom-services';
   *
   * function init() {
   *   AnalyticsAPI.initDynamicTabs();
   * }
   */
  static initDynamicTabs() {
    const tabSelected = this.triggerTabSelected;
    root.document.addEventListener('tab-selected', function(evt) {
      tabSelected(evt.target.id, evt.detail.item.innerText);
    });
  }

  /**
   * Triggers to CLICK event for the dynamic tabs
   *
   * @param {string} executionPath Target ID
   * @param {string} targetTitle Target innerText
   */
  static triggerTabSelected(executionPath, targetTitle) {
    try {
      this.registerEvent({
        type: 'element',
        primaryCategory: 'WIDGET',
        eventName: 'CLICK',
        eventCategoryGroup: 'TABS DYNAMIC',
        executionPath: executionPath,
        targetTitle: targetTitle,
      });
    } catch (err) {
      if (_env !== 'production') {
        console.error('Error triggering tab event:', err);
      }
    }
  }

  /**
   * This instantiates an event listener to trigger an event if the Carbon
   * Modal component is being interacted with by the user
   *
   * @example
   * import { AnalyticsAPI } from '@carbon/ibmdotcom-services';
   *
   * function init() {
   *   AnalyticsAPI.initModals();
   * }
   */
  static initModals() {
    const modalHide = this.triggerModalHide;
    root.document.addEventListener('modal-hidden', function(evt) {
      modalHide(evt.target.id, evt.detail.launchingElement.innerText);
    });

    const modalShow = this.triggerModalShow;
    root.document.addEventListener('modal-shown', function(evt) {
      modalShow(evt.target.id, evt.detail.launchingElement.innerText);
    });
  }

  /**
   * Triggers the HIDE event for the modal
   *
   * @param {string} executionPath Target ID
   * @param {string} targetTitle Target innerText
   */
  static triggerModalHide(executionPath, targetTitle) {
    try {
      this.registerEvent({
        type: 'element',
        primaryCategory: 'WIDGET',
        eventName: 'HIDE',
        eventCategoryGroup: 'SHOWHIDE',
        executionPath: executionPath,
        targetTitle: targetTitle,
      });
    } catch (err) {
      if (_env !== 'production') {
        console.error('Error triggering modal hide event:', err);
      }
    }
  }

  /**
   * Triggers the SHOW event for the modal
   *
   * @param {string} executionPath Target ID
   * @param {string} targetTitle Target innerText
   */
  static triggerModalShow(executionPath, targetTitle) {
    try {
      this.registerEvent({
        type: 'element',
        primaryCategory: 'WIDGET',
        eventName: 'SHOW',
        eventCategoryGroup: 'SHOWHIDE',
        executionPath: executionPath,
        targetTitle: targetTitle,
      });
    } catch (err) {
      if (_env !== 'production') {
        console.error('Error triggering modal show event:', err);
      }
    }
  }
}

export default AnalyticsAPI;
