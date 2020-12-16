/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { breakpoints } from '@carbon/layout';

/**
 * Amount of columns used for calculation.
 * @private
 */

const _colSpan = 2;

/**
 * The inner viewport calculation for the root margins.
 *
 * @private
 */

function _getViewportMargin() {
  return (
    '-' +
    (
      (document.documentElement.clientHeight * _colSpan) /
      breakpoints.max.columns
    ).toString() +
    'px 0px'
  );
}

/**
 * Intersection Observer options
 *
 * @private
 */

const _options = {
  rootMargin: _getViewportMargin(),
  threshold: 0,
};

/**
 * Iteration boolean for continuous play option.
 *
 * @private
 */

let _iterations;

/**
 * Intersection Observer that watches outer viewport.
 *
 * @private
 */

let _rootObserver;

/**
 * Intersection observer that watches the inner viewport.
 * @private
 */

let _innerObserver;

/**
 * Resize observer to trigger rootMargin recalculations
 * @private
 */
let _resizeObserver;

/**
 * Utility handles fade transition for selected elements.
 *
 * @example
 * import '@carbon/ibmdotcom-styles/scss/internal/scroll-into-view/_scroll-into-view.scss';
 * import { scrollIntoView } from '@carbon/ibmdotcom-utilities';
 *
 * As an example, the function can be called to target '.bx--content-block' as such:
 *
 * For default values of 400ms and 'one and done' play:
 * scrollIntoView('.bx--content-block')
 *
 * With 'continous play' option:
 * scrollIntoView('.bx--content-block', true)
 *
 * For custom delay time, set within targeted class in the application's CSS code as such:
 *
 * .bx--content-block {
 *   --#{$dds-prefix}--scroll-into-view-delay: 250ms;
 * }
 *
 * @param {*} selector menu item selector id
 * @param {boolean} iterations to define whether its continuous or not
 */

const scrollIntoView = (selector, { iterations = false = {}) => {
  _iterations = iterations;
  window.addEventListener(
    'load',
    () => {
      const elements = document.querySelectorAll(selector);
      _rootObserver = new IntersectionObserver(handleExit);
      _innerObserver = new IntersectionObserver(handleEntrance, _options);
      _resizeObserver = new ResizeObserver(handleResize);

      elements.forEach(e => {
        _rootObserver.observe(e);
        _innerObserver.observe(e);
      });
      _resizeObserver.observe(document.documentElement);
    },
    false
  );
};

/**
 * Handler to add recalculated rootMargin to observer.
 * @private
 */
function handleResize() {
  _options.rootMargin = _getViewportMargin();
  _innerObserver = new IntersectionObserver(handleEntrance, _options);
}

/**
 * Handler to add fade animation to element
 * @param {*} entries observed elements
 * @private
 */

function handleEntrance(entries) {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.classList.remove('bx--fade-out');
      entry.target.classList.add('bx--fade-in');
      if (!_iterations) {
        _rootObserver.unobserve(entry.target);
        _innerObserver.unobserve(entry.target);
        _resizeObserver.unobserve(entry.target);
      }
    }
  });
}

/**
 * Handler to remove element from view
 * @param {*} entries observed elements
 * @private
 */

function handleExit(entries) {
  entries.forEach(entry => {
    if (entry.intersectionRatio == 0) {
      entry.target.classList.remove('bx--fade-in');
      entry.target.classList.add('bx--fade-out');
    }
  });
}

export default scrollIntoView;
