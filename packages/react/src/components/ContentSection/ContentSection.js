/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { baseFontSize, breakpoints } from '@carbon/layout';
import React, { useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { CTA } from '../CTA';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import markdownToHtml from '@carbon/ibmdotcom-utilities/es/utilities/markdownToHtml/markdownToHtml';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

const breakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;

/**
 * ContentSection Component, for use with cardSection.
 */
const ContentSection = ({
  heading,
  copy,
  theme,
  children,
  cta,
  customClassName,
  childrenCustomClassName,
  ...otherProps
}) => {
  const containerRef = useRef();
  const leftSectionRef = useRef();
  const childrenRef = useRef();

  /**
   * Resize observer to trigger same height function.
   *
   * @private
   */
  const resizeObserver = useRef(null);

  useEffect(() => {
    resizeObserver.current = new ResizeObserver(resizeHandler);
    resizeObserver.current.observe(document.documentElement);
    return () => (resizeObserver.current = null);
  }, [children, resizeHandler]);

  /**
   * Function that activates the sameHeight utility
   */
  const resizeHandler = useCallback(() => {
    window.requestAnimationFrame(() => {
      const { current: childrenNode } = childrenRef;
      const { current: leftSectionNode } = leftSectionRef;
      const { current: containerNode } = containerRef;

      // gets first child element
      const firstElem = childrenNode?.children[0];
      const topPadding = firstElem
        ? parseInt(
            window
              .getComputedStyle(firstElem.children[0], null)
              .getPropertyValue('padding-top')
          )
        : 0;
      const topMargin = firstElem
        ? parseInt(
            window
              .getComputedStyle(firstElem.children[0], null)
              .getPropertyValue('margin-top')
          )
        : 0;

      // keeps styles for card-section-images and card-section-simple
      if (firstElem && topPadding === 0 && topMargin === 0) {
        containerNode.style.paddingTop = '3rem';
        containerNode.style.paddingBottom = '4rem';
        leftSectionNode.style.marginTop = '';
        leftSectionNode.style.marginBottom = '';
      } else if (window.innerWidth > breakpoint) {
        if (!firstElem) {
          containerNode.style.paddingTop = '1rem';
          leftSectionNode.style.marginTop = '';
          leftSectionNode.style.marginBottom = '';
        } else {
          leftSectionNode.style.marginTop = `${topPadding || topMargin}px`;
          leftSectionNode.style.marginBottom = '';
          containerNode.style.paddingTop = '';
        }
      } else if (!firstElem) {
        containerNode.style.paddingTop = '1rem';
        leftSectionNode.style.marginBottom = '';
        leftSectionNode.style.marginTop = '';
      } else {
        leftSectionNode.style.marginBottom = `-${topPadding || topMargin}px`;
        leftSectionNode.style.marginTop = '1rem';
        containerNode.style.marginTop = '';
      }
    });
  }, []);

  return (
    <section
      className={classNames(`${prefix}--content-section`, customClassName, {
        [`${prefix}--content-section--${theme}`]: theme,
      })}
      data-autoid={
        otherProps.autoid
          ? otherProps.autoid
          : `${stablePrefix}--content-section`
      }
      ref={containerRef}>
      <div className={`${prefix}--content-section__grid`}>
        <div className={`${prefix}--content-section__row`}>
          <div
            className={`${prefix}--content-section__left`}
            ref={leftSectionRef}>
            {heading && (
              <h2 className={`${prefix}--content-section__heading`}>
                {heading}
              </h2>
            )}
            {copy && (
              <div
                data-autoid={`${stablePrefix}--content-section__copy`}
                className={`${prefix}--content-section__copy`}
                dangerouslySetInnerHTML={{
                  __html: markdownToHtml(copy, { bold: false }),
                }}></div>
            )}
            {cta && (
              <CTA
                style="text"
                type={cta.type}
                copy={cta.copy}
                href={cta.href}
                customClassName={`${prefix}--content-section__cta`}
              />
            )}
          </div>
          <div
            className={classNames(
              `${prefix}--content-section__children`,
              childrenCustomClassName
            )}
            ref={childrenRef}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

ContentSection.propTypes = {
  /**
   * Heading text.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Copy text.
   */
  copy: PropTypes.string,

  /**
   * Theme name.
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100']),

  /**
   * Container for other components.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),

  /**
   * CTA object.
   * See the [`<CTA>`'s README](http://www.ibm.com/standards/carbon/react/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    type: PropTypes.oneOfType([
      PropTypes.oneOf(['local', 'external', 'download', 'video']),
      PropTypes.arrayOf(
        PropTypes.oneOf(['local', 'external', 'download', 'video'])
      ),
    ]),
    copy: PropTypes.string,
    href: PropTypes.string,
    customClassName: PropTypes.string,
  }),

  /**
   * Optional class to be applied to the containing node.
   */
  customClassName: PropTypes.string,

  /**
   * Optional class to be applied to the child node.
   */
  childrenCustomClassName: PropTypes.string,
};

export default ContentSection;
