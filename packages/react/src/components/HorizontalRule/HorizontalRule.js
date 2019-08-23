/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import settings from 'carbon-components/es/globals/js/settings';

import '@ibmdotcom/styles/scss/components/horizontalrule/_horizontalrule.scss';

const { prefix } = settings;
/**
 * Horizontal Rule component
 *
 * @param {object} props props object
 * @param {string} props.style style of rule (solid or dashed)
 * @param {string} props.contrast color of the rule (low-contrast, medium-contrast, or high-contrast)
 * @param {string} props.weight weight of the rule (thin or thick)
 * @param {string} props.size size of rule (small, medium, large, inset, or overhung)
 * @returns {*} Horizontal Rule component
 */
const HorizontalRule = ({ style, size, contrast, weight }) => (
  <hr
    data-autoid="hr"
    className={classnames(
      `${prefix}--hr`,
      `${prefix}--hr--${style}--${contrast}`,
      { [`${prefix}--hr--dashed`]: style === 'dashed' },
      `${prefix}--hr--${size}`,
      `${prefix}--hr--${weight}`
    )}
  />
);

HorizontalRule.propTypes = {
  style: PropTypes.string,
  size: PropTypes.string,
  contrast: PropTypes.string,
  weight: PropTypes.string,
};

HorizontalRule.defaultProps = {
  style: 'solid',
  size: 'small',
  contrast: 'medium',
  weight: 'thin',
};

export default HorizontalRule;
