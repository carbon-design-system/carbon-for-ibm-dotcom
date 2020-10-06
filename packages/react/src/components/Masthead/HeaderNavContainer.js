/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import calculateTotalWidth from '@carbon/ibmdotcom-utilities/es/utilities/calculateTotalWidth/calculateTotalWidth';
import CaretLeft20 from '@carbon/icons-react/es/caret--left/20';
import CaretRight20 from '@carbon/icons-react/es/caret--right/20';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * Header nav container component.
 */
const HeaderNavContainer = ({ children }) => {
  const headerNavContainerRef = useRef(null);
  const [resizeObserver, setResizeObserver] = useState(null);
  const [showLeftCaret, setShowLeftCaret] = useState(false);
  const [showRightCaret, setShowRightCaret] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [totalNavWidth, setTotalNavWidth] = useState(0);

  const paginateLeft = useCallback(() => {
    headerNavContainerRef.current.scrollLeft -= containerWidth;
    setShowRightCaret(true);
    // 40 accounts for caret size
    if (headerNavContainerRef.current.scrollLeft <= 40) {
      setShowLeftCaret(false);
      headerNavContainerRef.current.scrollLeft = 0;
    }
  }, [containerWidth]);

  const paginateRight = useCallback(() => {
    headerNavContainerRef.current.scrollLeft += containerWidth;
    setShowLeftCaret(true);
    // 80 accounts for caret sizes
    if (
      headerNavContainerRef.current.scrollLeft + containerWidth >=
      totalNavWidth - 80
    ) {
      setShowRightCaret(false);
      headerNavContainerRef.current.scrollLeft += 80;
    }
  }, [containerWidth, totalNavWidth]);

  useEffect(() => {
    if (window.ResizeObserver) {
      setResizeObserver(
        new ResizeObserver(() => {
          setContainerWidth(calculateTotalWidth(['bx--header__nav-container']));
          setTotalNavWidth(calculateTotalWidth(['bx--header__nav']));
        })
      );
    }
  }, []);

  useEffect(() => {
    if (totalNavWidth > containerWidth) {
      // 80 accounts for caret sizes
      if (
        headerNavContainerRef.current.scrollLeft === 0 ||
        headerNavContainerRef.current.scrollLeft + containerWidth <
          totalNavWidth - 80
      ) {
        setShowRightCaret(true);
      }
      if (headerNavContainerRef.current.scrollLeft > 0) {
        setShowLeftCaret(true);
      }
    } else {
      setShowLeftCaret(false);
      setShowRightCaret(false);
    }
  }, [containerWidth, totalNavWidth]);

  useEffect(() => {
    const { current: headerNavContainerNode } = headerNavContainerRef;
    if (resizeObserver) {
      resizeObserver.observe(headerNavContainerNode);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [resizeObserver]);

  return (
    <>
      <button
        className={`${prefix}--header__nav-caret-left`}
        aria-label="Masthead left caret"
        hidden={!showLeftCaret}
        onClick={paginateLeft}>
        <CaretLeft20 />
      </button>
      <div
        className={`${prefix}--header__nav-container`}
        ref={headerNavContainerRef}>
        {children}
      </div>
      <button
        className={`${prefix}--header__nav-caret-right`}
        aria-label="Masthead right caret"
        hidden={!showRightCaret}
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
