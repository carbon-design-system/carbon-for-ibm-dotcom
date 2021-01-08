/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, useEffect, useRef } from 'react';
import { breakpoints } from '@carbon/layout';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
const { prefix } = settings;
/**
 * Utility handles fade transition for selected elements.
 *
 * @example
 * import { FadeInOut } from '@carbon/ibmdotcom-react';
 * import '@carbon/ibmdotcom-styles/scss/internal/scroll-into-view/_scroll-into-view.scss';
 *
 * As an example, the function can be called to target all instances of the
 * elements in a list:
 *
 * const list = ['.bx--content-block', 'bx--content-group'];
 *
 * For default values of 400ms and 'one and done' play:
 * <FadeInOut elementList={elementList} />
 *
 * With 'continuous play' option:
 * <FadeInOut elementList={elementList} iterations={true} />
 *
 * For custom delay time, set within targeted class in the application's CSS code as such:
 *
 * .bx--content-block {
 *   --#{$dds-prefix}--scroll-into-view-delay: 250ms;
 * }
 *
 */
const FadeInOut = ({ elementList, iterations }) => {
  /**
   * Amount of columns used for calculation.
   *
   * @private
   */

  const _colSpan = 3;

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
   * Intersection Observer that watches outer viewport.
   *
   * @private
   */

  const _rootObserver = useRef(null);

  /**
   * Intersection observer that watches the inner viewport.
   *
   * @private
   */

  const _innerObserver = useRef(null);

  /**
   * Resize observer to trigger rootMargin recalculations
   *
   * @private
   */
  const _resizeObserver = useRef(null);

  /**
   * Create observers upon render and update.
   */
  useEffect(() => {
    _rootObserver.current = new IntersectionObserver(handleExit);
    _innerObserver.current = new IntersectionObserver(handleEntrance, _options);
    _resizeObserver.current = new ResizeObserver(handleResize);

    elementList.forEach(selector => {
      let elements = document.querySelectorAll(selector);
      elements.forEach(e => {
        _rootObserver.current.observe(e);
        _innerObserver.current.observe(e);
      });
    });
    _resizeObserver.current.observe(document.documentElement);

    return () => {
      _rootObserver.current.disconnect();
      _innerObserver.current.disconnect();
      _resizeObserver.current.disconnect();
      _rootObserver.current = null;
      _innerObserver.current = null;
      _resizeObserver.current = null;
    };
  }, [elementList, _options, handleEntrance, handleResize]);

  /**
   * Handler to add recalculated rootMargin to observer.
   *
   * @private
   *
   */

  const handleResize = useCallback(() => {
    _options.rootMargin = _getViewportMargin();
    _innerObserver.current = new IntersectionObserver(handleEntrance, _options);
  }, [_options, _innerObserver, handleEntrance]);

  /**
   * Handler to add fade animation to element
   *
   * @param {*} entries observed elements
   * @private
   *
   */

  const handleEntrance = useCallback(
    entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.remove(`${prefix}--fade-out`);
          entry.target.classList.add(`${prefix}--fade-in`);
          if (!iterations) {
            _rootObserver.current.unobserve(entry.target);
            _innerObserver.current.unobserve(entry.target);
          }
        }
      });
    },
    [iterations, _rootObserver, _innerObserver]
  );

  /**
   * Handler to remove element from view
   *
   * @param {*} entries observed elements
   * @private
   *
   */

  function handleExit(entries) {
    entries.forEach(entry => {
      if (entry.intersectionRatio == 0) {
        entry.target.classList.remove(`${prefix}--fade-in`);
        entry.target.classList.add(`${prefix}--fade-out`);
      }
    });
  }
  return null;
};

FadeInOut.propTypes = {
  /**
   * List of elements to be targeted
   */
  elementList: PropTypes.arrayOf(PropTypes.string),

  /**
   * Boolean to define if animation is continuous
   */
  iterations: PropTypes.bool,
};

export default FadeInOut;
