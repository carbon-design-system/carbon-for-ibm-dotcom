/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentArrayBlock Component, for use with content arrays
 *
 * @param {object} props props object
 * @param {string} props.heading  Heading objects
 * @param {*} props.children JSX Components
 * @param {*} props.cta JSX Components
 * @returns {*} JSX ContentArrayBlock component
 */
const ContentBlock = ({ heading, children, cta, customClassName }) => {
  const className = cx(`${prefix}--content-block`, customClassName);

  return (
    <div data-autoid={`${stablePrefix}--content-block`} className={className}>
      <h2
        data-autoid={`${stablePrefix}--content-block__title`}
        className={`${prefix}--content-block__title`}>
        {heading}
      </h2>
      <div data-autoid={`${stablePrefix}--content-block__children`}>
        {children}
      </div>
      <div
        data-autoid={`${stablePrefix}--content-block__cta`}
        className={cx(`${prefix}--content-block__cta`)}>
        {cta}
      </div>
    </div>
  );
};

ContentBlock.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.element,
  cta: PropTypes.element,
  customClassName: PropTypes.string,
};

export default ContentBlock;
