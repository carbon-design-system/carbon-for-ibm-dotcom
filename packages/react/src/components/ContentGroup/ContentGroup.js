/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DDS_CONTENT_GROUP } from '../../internal/FeatureFlags';
import PropTypes from 'prop-types';
import React from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentArrayGroup Component, for use with content arrays
 *
 * @param {object} props props object
 * @param {*} props.children JSX Components
 * @param {object} props.heading  Heading objects
 * @param {string} props.heading.type Heading style
 * @param {string} props.heading.copy Heading text
 * @returns {*} JSX ContentArrayGroup component
 */
const ContentGroup = ({
  children,
  heading = { type: 'heading-4', ...heading },
}) => {
  return featureFlag(
    DDS_CONTENT_GROUP,
    <div
      className={`${prefix}--content-group`}
      data-autoid={`${stablePrefix}--content-group`}>
      <div className={`${prefix}--content-group__container`}>
        <div className={`${prefix}--content-group__col`}>
          <h3
            data-autoid={`${stablePrefix}--content-group__title`}
            className={`${prefix}--content-group__title ${prefix}--content-group__${heading.type ||
              'heading-4'}`}>
            {heading.copy}
          </h3>
        </div>
        <div
          data-autoid={`${stablePrefix}--content-group__children`}
          className={`${prefix}--content-group__children`}>
          {children}
        </div>
      </div>
    </div>
  );
};

ContentGroup.propTypes = {
  heading: PropTypes.shape({
    type: PropTypes.string.isRequired,
    copy: PropTypes.string.isRequired,
  }),
  children: PropTypes.element,
};

export default ContentGroup;
