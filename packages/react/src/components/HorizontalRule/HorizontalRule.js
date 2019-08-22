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
 * @param {string} props.type type of rule (solid or dashed)
 * @param {string} props.color color of the rule (low-contrast, medium-contrast, or high-contrast)
 * @param {string} props.width width of the rule (thin or thick)
 * @param {string} props.length length of rule (small, medium, large, inset, or overhung)
 * @returns {*} Horizontal Rule component
 */
const HorizontalRule = ({ type, length, color, width }) => (
  <hr
    data-autoid="hr"
    className={classnames(
      `${prefix}--hr`,
      `${prefix}--hr__${type}__${color}`,
      { [`${prefix}--hr__dashed`]: type === 'dashed' },
      `${prefix}--hr__${length}`,
      `${prefix}--hr__${width}`
    )}
  />
);

HorizontalRule.propTypes = {
  type: PropTypes.string,
  length: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
};

HorizontalRule.defaultProps = {
  type: 'solid',
  length: 'small',
  color: 'medium-contrast',
  width: 'thin',
};

export default HorizontalRule;
