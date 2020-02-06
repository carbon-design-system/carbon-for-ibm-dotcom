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
 * ContentArrayBlock Component, for use with content arrays
 *
 * @param {object} props props object
 * @param {*} props.children JSX Components
 * @param {string} props.heading  Heading objects
 * @returns {*} JSX ContentArrayBlock component
 */
const ContentBlock = ({ heading, children, cta }) => {
  return (
    <div
      data-autoid={`${stablePrefix}--content-block`}
      className={`${prefix}--content-block`}></div>
  );
};

ContentBlock.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.element,
  cta: PropTypes.element,
};

export default ContentBlock;
