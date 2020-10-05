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
import HeaderGlobalAction from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderGlobalAction';
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
    if (headerNavContainerRef.current.scrollLeft <= 40) {
      setShowLeftCaret(false);
      headerNavContainerRef.current.scrollLeft = 0;
    }
  }, [containerWidth]);

  const paginateRight = useCallback(() => {
    headerNavContainerRef.current.scrollLeft += containerWidth;
    setShowLeftCaret(true);
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
      if (
        headerNavContainerRef.current.scrollLeft === 0 ||
        headerNavContainerRef.current.scrollLeft + containerWidth <
          totalNavWidth
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
      <HeaderGlobalAction
        className={`${prefix}--header__action-left-caret`}
        aria-label="Masthead left caret"
        hidden={!showLeftCaret}
        onClick={paginateLeft}>
        <CaretLeft20 />
      </HeaderGlobalAction>
      <div
        className={`${prefix}--header__nav-container`}
        ref={headerNavContainerRef}>
        {children}
      </div>
      <HeaderGlobalAction
        className={`${prefix}--header__action-right-caret`}
        aria-label="Masthead right caret"
        hidden={!showRightCaret}
        onClick={paginateRight}>
        <CaretRight20 />
      </HeaderGlobalAction>
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
