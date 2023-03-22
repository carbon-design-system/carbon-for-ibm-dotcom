/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import { CTA } from '../CTA';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import markdownToHtml from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/markdownToHtml/markdownToHtml';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

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
  return (
    <section
      className={classNames(`${prefix}--content-section`, customClassName, {
        [`${prefix}--content-section--${theme}`]: theme,
      })}
      data-autoid={
        otherProps.autoid
          ? otherProps.autoid
          : `${stablePrefix}--content-section`
      }>
      <div className={`${prefix}--content-section__grid`}>
        <div className={`${prefix}--content-section__row`}>
          <div className={`${prefix}--content-section__left`}>
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
            )}>
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
