/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { motion } from '@carbon/motion';

/**
 * Utility handles fade transition for selected elements.
 *
 * @example
 * import { scrollIntoView } from '@carbon/ibmdotcom-utilities';
 *
 * @param {*} selector menu item selector id
 * @param {string} delay in either seconds or ms for animation to play
 * @param {boolean} iterations se
 */

const viewportMargin =
  '-' +
  (
    Math.round(document.documentElement.clientHeight / (100 / 12.5)) + 32
  ).toString() +
  'px 0px';

const scrollIntoView = (selector, delay = '400ms', iterations = true) => {
  window.addEventListener(
    'load',
    () => {
      const elements = document.querySelectorAll(selector);

      console.log(elements);

      const options = {
        rootMargin: viewportMargin,
        threshold: 0,
      };

      const observer = new IntersectionObserver(function handleIntersect(
        entries
      ) {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            entry.target.style.transitionTimingFunction = motion(
              'entrance',
              'expressive'
            );
            entry.target.style.transitionDuration = delay;
            entry.target.style.opacity = 1;
            if (!iterations) {
              observer.unobserve(entry.target);
            }
          } else {
            entry.target.style.transitionTimingFunction = motion(
              'exit',
              'expressive'
            );
            entry.target.style.transitionDuration = delay;
            entry.target.style.opacity = 0;
          }
        });
      },
      options);

      elements.forEach(e => {
        observer.observe(e);
      });
    },
    false
  );
};

export default scrollIntoView;
