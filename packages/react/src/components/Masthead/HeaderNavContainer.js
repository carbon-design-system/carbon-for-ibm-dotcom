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
  const contentLeftRef = useRef(null);
  const contentRightRef = useRef(null);
  const caretLeftRef = useRef(null);
  const caretRightRef = useRef(null);
  const [io, setIO] = useState(null);
  const [position, setPosition] = useState(0);
  const buttonSize = 48; // 40px(width) + 8px(gradient)

  const paginateLeft = useCallback(() => {
    let menuItems = contentRef.current.querySelectorAll(
      '.bx--header__menu-bar li'
    );
    for (let i = 0; i < menuItems.length; i++) {
      // checks if first visible item is partially hidden
      if (
        menuItems[i].offsetLeft + menuItems[i].offsetWidth + position >=
        buttonSize
      ) {
        // checks if there is space for remaining menuItems
        if (
          menuItems[i].offsetLeft + menuItems[i].offsetWidth >
          containerRef.current.offsetWidth - buttonSize
        ) {
          setPosition(
            containerRef.current.offsetWidth -
              menuItems[i].offsetLeft -
              menuItems[i].offsetWidth -
              buttonSize
          );
          contentRef.current.style.left =
            String(
              containerRef.current.offsetWidth -
                menuItems[i].offsetLeft -
                menuItems[i].offsetWidth -
                buttonSize
            ) + 'px';
        } else {
          setPosition(0);
          contentRef.current.style.left = '0px';
        }
        break;
      }
    }
  }, [position]);

  const paginateRight = useCallback(() => {
    let menuItems = contentRef.current.querySelectorAll(
      '.bx--header__menu-bar li'
    );
    for (let i = 0; i < menuItems.length; i++) {
      // checks if the right most visible element is partially hidden
      if (
        menuItems[i].offsetLeft + menuItems[i].offsetWidth + position >
        containerRef.current.offsetWidth - buttonSize
      ) {
        // checks if there is space for remaining menuItems
        if (
          contentRef.current.offsetWidth - menuItems[i].offsetLeft <
          containerRef.current.offsetWidth - buttonSize
        ) {
          setPosition(
            containerRef.current.offsetWidth - contentRef.current.offsetWidth
          );
          contentRef.current.style.left =
            String(
              containerRef.current.offsetWidth - contentRef.current.offsetWidth
            ) + 'px';
        } else {
          setPosition(buttonSize - menuItems[i].offsetLeft);
          contentRef.current.style.left =
            String(buttonSize - menuItems[i].offsetLeft) + 'px';
        }
        break;
      }
    }
  }, [position]);

  useEffect(() => {
    if (window.IntersectionObserver) {
      setIO(
        new IntersectionObserver(
          records => {
            records.forEach(record => {
              if (
                record.target.classList.contains(
                  contentLeftRef.current.className
                )
              ) {
                caretLeftRef.current.hidden = record.isIntersecting;
              }
              if (
                record.target.classList.contains(
                  contentRightRef.current.className
                )
              ) {
                caretRightRef.current.hidden = record.isIntersecting;
              }
            });
          },
          {
            root: containerRef.current,
            threshold: 1,
          }
        )
      );
    }
  }, [setIO]);

  useEffect(() => {
    if (io) {
      io.observe(contentLeftRef.current);
      io.observe(contentRightRef.current);
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
      <div className={`${prefix}--header__nav-container`} ref={containerRef}>
        <div className={`${prefix}--header__nav-content`} ref={contentRef}>
          <div className={`${prefix}--sub-content-left`} ref={contentLeftRef} />
          <div
            className={`${prefix}--sub-content-right`}
            ref={contentRightRef}
          />
          {children}
        </div>
        <button
          className={`${prefix}--header__nav-caret-left`}
          aria-label="Masthead left caret"
          onClick={paginateLeft}
          ref={caretLeftRef}
          hidden="true">
          <CaretLeft20 />
        </button>
        <button
          className={`${prefix}--header__nav-caret-right`}
          aria-label="Masthead right caret"
          onClick={paginateRight}
          ref={caretRightRef}
          hidden="true">
          <CaretRight20 />
        </button>
      </div>
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
