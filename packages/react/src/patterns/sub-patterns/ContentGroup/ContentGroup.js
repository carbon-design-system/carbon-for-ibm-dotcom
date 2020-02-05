/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;
/**
 * ContentArrayGroup Component, for use with content arrays
 *
 * @param {object} props props object
 * @param {*} props.children JSX Components
 * @param {string} props.heading  Heading objects
 * @returns {*} JSX ContentArrayGroup component
 */
const ContentGroup = ({ children, heading }) => {
  return (
    <div
      className={`${prefix}--content-group`}
      data-autoid={`${stablePrefix}--content-group`}>
      <div className={`${prefix}--content-group__container`}>
        <div className={`${prefix}--content-group__row`}>
          <div className={`${prefix}--content-group__col`}>
            <h3
              data-autoid={`${stablePrefix}--content-group__title`}
              className={`${prefix}--content-group__title`}>
              {heading}
            </h3>
          </div>
        </div>
        <div className={`${prefix}--content-group__row`}>
          <div
            data-autoid={`${stablePrefix}--content-group__children`}
            className={classNames(
              `${prefix}--content-group__col`,
              `${prefix}--content-group__children`
            )}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

ContentGroup.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.element,
};

export default ContentGroup;
