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
const ContentSection = ({ heading, children }) => {
  return (
    <div
      className={`${prefix}--content-section`}
      data-autoid={`${stablePrefix}--content-section`}>
      <h3
        data-autoid={`${stablePrefix}--content-section__title`}
        className={`${prefix}--content-section__title`}>
        {heading}
      </h3>
      <div
        data-autoid={`${stablePrefix}--content-section__children`}
        className={classNames(
          `${prefix}--content-section__col`,
          `${prefix}--content-section__children`
        )}>
        {children}
      </div>
    </div>
  );
};

ContentSection.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.element,
};

export default ContentSection;
