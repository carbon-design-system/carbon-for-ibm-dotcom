/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';

import '@ibmdotcom/styles/scss/components/horizontalrule/_horizontalrule.scss';

const { prefix } = settings;
/**
 * Horizontal Rule component
 *
 * @param {object} props props object
 * @param {string} props.type type of rule (solid or dashed)
 * @param {string} props.color color of the rule
 * @param {string} props.width width of the rule
 * @param {string} props.length length of rule
 * @returns {*} Horizontal Rule component
 * @class
 */
const HorizontalRule = ({ type, length, color, width }) => (
  <hr
    noshade
    className={classnames(
      `${prefix}--hr`,
      `${prefix}--hr__${type}`,
      `${prefix}--hr__${length}`,
      `${prefix}--hr__${color}`,
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
