/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import CaretLeft20 from '@carbon/icons-react/es/caret--left/20';
import CaretRight20 from '@carbon/icons-react/es/caret--right/20';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * Header nav container component.
 */
const HeaderNavContainer = ({ children }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [io, setIO] = useState(null);
  const [position, setPosition] = useState(0);

  const paginateLeft = useCallback(() => {
    const moveLeft = Math.min(position + containerRef.current.offsetWidth, 0);
    contentRef.current.style.left = String(moveLeft) + 'px';
    setPosition(moveLeft);
  }, [position]);

  const paginateRight = useCallback(() => {
    const moveRight = -Math.min(
      -position + containerRef.current.offsetWidth,
      contentRef.current.offsetWidth - containerRef.current.offsetWidth
    );
    contentRef.current.style.left = String(moveRight) + 'px';
    setPosition(moveRight);
  }, [position]);

  useEffect(() => {
    setIO(
      new IntersectionObserver(
        records => {
          records.forEach(record => {
            if (record.target.classList.contains('sub-content-left')) {
              document.querySelector('.bx--header__nav-caret-left').hidden =
                record.isIntersecting;
            }
            if (record.target.classList.contains('sub-content-right')) {
              document.querySelector('.bx--header__nav-caret-right').hidden =
                record.isIntersecting;
            }
          });
        },
        {
          root: containerRef.current,
          threshold: 1,
        }
      )
    );
  }, [setIO]);

  useEffect(() => {
    if (io) {
      io.observe(document.querySelector('.sub-content-left'));
      io.observe(document.querySelector('.sub-content-right'));
    } else {
      return () => {
        if (io) {
          io.disconnect();
        }
      };
    }
  }, [io]);

  return (
    <>
      <button
        className={`${prefix}--header__nav-caret-left`}
        aria-label="Masthead left caret"
        onClick={paginateLeft}>
        <CaretLeft20 />
      </button>
      <div className={`${prefix}--header__nav-container`} ref={containerRef}>
        <div className={`${prefix}--header__nav-content`} ref={contentRef}>
          <div className="sub-content-left"></div>
          <div className="sub-content-right"></div>
          {children}
        </div>
      </div>
      <button
        className={`${prefix}--header__nav-caret-right`}
        aria-label="Masthead right caret"
        onClick={paginateRight}>
        <CaretRight20 />
      </button>
    </>
  );
};

HeaderNavContainer.propTypes = {
  /**
   * Container for other components.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default HeaderNavContainer;
