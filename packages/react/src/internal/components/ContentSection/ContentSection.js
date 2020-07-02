/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
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
  theme,
  children,
  customClassName,
  ...otherProps
}) => (
  <section
    className={classNames(`${prefix}--content-section`, customClassName, {
      [`${prefix}--content-section--${theme}`]: theme,
    })}
    data-autoid={
      otherProps.autoid ? otherProps.autoid : `${stablePrefix}--content-section`
    }>
    <div className={`${prefix}--content-section__grid`}>
      <div className={`${prefix}--content-section__row`}>
        <div className={`${prefix}--content-section__left`}>
          <h2 className={`${prefix}--content-section__heading`}>{heading}</h2>
        </div>
        <div className={`${prefix}--content-section__children`}>{children}</div>
      </div>
    </div>
  </section>
);

ContentSection.propTypes = {
  /**
   * Heading text.
   */
  heading: PropTypes.string.isRequired,

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
   * Optional class to be applied to the containing node.
   */
  customClassName: PropTypes.string,
};

export default ContentSection;
