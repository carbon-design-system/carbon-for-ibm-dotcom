/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The viewport calculation for 12.5vh + 32px of the root margins.
 *
 * @private
 */
const _viewportMargin =
  '-' +
  (
    Math.round(document.documentElement.clientHeight / (100 / 12.5)) + 32
  ).toString() +
  'px 0px';

/**
 * Intersection Observer options
 *
 * @private
 */
const _options = {
  rootMargin: _viewportMargin,
  threshold: 0,
};

/**
 * Utility handles fade transition for selected elements.
 *
 * @example
 * import '@carbon/ibmdotcom-styles/scss/internal/scroll-into-view/_scroll-into-view.scss';
 * import { scrollIntoView } from '@carbon/ibmdotcom-utilities';
 *
 * As an example, the function can be called to target '.bx--content-block' as such:
 *
 * For default values of 400ms and continuous play:
 * scrollIntoView('.bx--content-block')
 *
 * With 'one and done' option:
 * scrollIntoView('.bx--content-block', false)
 *
 * For custom delay time, set within targeted class in the application's CSS code as such:
 *
 * .bx--content-block {
 *   --#{$dds-prefix}--scroll-into-view-delay: 3s;
 * }
 *
 * @param {*} selector menu item selector id
 * @param {boolean} iterations to define whether its continuous or not
 */

const scrollIntoView = (selector, iterations = true) => {
  window.addEventListener(
    'load',
    () => {
      const elements = document.querySelectorAll(selector);
      const observer = new IntersectionObserver(function handleIntersect(
        entries
      ) {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            entry.target.classList.remove('bx--fade-out');
            entry.target.classList.add('bx--fade-in');
            if (!iterations) {
              observer.unobserve(entry.target);
            }
          } else {
            entry.target.classList.remove('bx--fade-in');
            entry.target.classList.add('bx--fade-out');
          }
        });
      },
      _options);

      elements.forEach(e => {
        observer.observe(e);
      });
    },
    false
  );
};

export default scrollIntoView;
