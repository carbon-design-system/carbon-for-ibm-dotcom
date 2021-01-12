/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useRef } from 'react';
import { breakpoints } from '@carbon/layout';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
const { prefix } = settings;

/**
 * Amount of columns used for calculation.
 *
 * @private
 */
const _colSpan = 3;

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
 * const list = '.bx--content-block, .bx--content-group';
 *
 * For default values of 400ms and 'one and done' play:
 * <FadeInOut selectorTargets={selectorTargets}>
 *   // some content
 * </FadeInOut>
 *
 * With 'continuous play' option:
 * <FadeInOut selectorTargets={selectorTargets} keepAnimations={true}>
 *   // some content
 * </FadeInOut>
 *
 * For custom delay time, set within targeted class in the application's CSS code as such:
 *
 * .bx--content-block {
 *   --#{$dds-prefix}--fade-in-out-delay: 250ms;
 * }
 *
 */
const FadeInOut = ({ children, selectorTargets, keepAnimations }) => {
  /**
   * Outer div component ref for using with query selector.
   *
   * @private
   */
  const _componentRef = useRef(null);

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
    _resizeObserver.current = new ResizeObserver(handleResize);

    if (selectorTargets) {
      _componentRef.current?.querySelectorAll(selectorTargets).forEach(item => {
        _rootObserver?.current.observe(item);
      });
    }
    _resizeObserver.current.observe(document.documentElement);

    return () => {
      _rootObserver.current.disconnect();
      _innerObserver.current.disconnect();
      _resizeObserver.current.disconnect();
      _rootObserver.current = null;
      _innerObserver.current = null;
      _resizeObserver.current = null;
    };
  }, [_componentRef, selectorTargets, handleEntrance, handleResize]);

  /**
   * Handler to add recalculated rootMargin to a new instance of
   * inner observer after clearing old one first.
   *
   * The calculation is done to retrieve the best fitting top and bottom
   * margin for the fade animation to trigger/remove from elements in a
   * user's screen.
   *
   * The resulting value is the optimal point where a user's attention will be
   * grabbed by the animation without restricting their view and perception of
   * the adopting website. The displayed elements will keep the user's attention
   * for a longer time as they scroll down the website.
   *
   * @private
   */
  const handleResize = useCallback(() => {
    if (_innerObserver.current) {
      _innerObserver.current.disconnect();
      _innerObserver.current = null;
    }

    _innerObserver.current = new IntersectionObserver(handleEntrance, {
      rootMargin: `-${(
        (document.documentElement.clientHeight * _colSpan) /
        breakpoints.max.columns
      ).toString()}px 0px`,
    });

    if (selectorTargets) {
      _componentRef.current?.querySelectorAll(selectorTargets).forEach(item => {
        _innerObserver?.current.observe(item);
      });
    }
  }, [_componentRef, _innerObserver, selectorTargets, handleEntrance]);

  /**
   * Handler to add fade animation to element
   *
   * @param {*} records observed elements
   * @private
   *
   */
  const handleEntrance = useCallback(
    records => {
      records.forEach(({ intersectionRatio, target }) => {
        if (intersectionRatio > 0) {
          target.classList.remove(`${prefix}--fade-out`);
          target.classList.add(`${prefix}--fade-in`);
          if (!keepAnimations) {
            _rootObserver.current.unobserve(target);
            _innerObserver.current.unobserve(target);
          }
        }
      });
    },
    [keepAnimations, _rootObserver, _innerObserver]
  );

  /**
   * Handler to remove element from view
   *
   * @param {*} records observed elements
   * @private
   *
   */
  function handleExit(records) {
    records.forEach(({ intersectionRatio, target }) => {
      if (intersectionRatio == 0) {
        target.classList.remove(`${prefix}--fade-in`);
        target.classList.add(`${prefix}--fade-out`);
      }
    });
  }

  return <div ref={_componentRef}>{children}</div>;
};

FadeInOut.propTypes = {
  /**
   * Component(s) to render within the component
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

  /**
   * List of elements to be targeted
   */
  selectorTargets: PropTypes.string,

  /**
   * Boolean to define if animation is continuous
   */
  keepAnimations: PropTypes.bool,
};

export default FadeInOut;
