/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classnames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * creates modifier classnames
 *
 * @param {string} mod modifier
 * @returns {*} Horizontal Rule component
 */
function hrMod(mod) {
  return mod && `${prefix}--hr--${mod}`;
}

/**
 * Horizontal Rule component
 *
 * @param {object} props props object
 * @param {string} props.style style of rule (dashed)
 * @param {string} props.contrast color of the rule (low-contrast, or high-contrast)
 * @param {string} props.weight weight of the rule (thick)
 * @param {string} props.size size of rule (small, medium, large)
 * @returns {*} Horizontal Rule component
 */
const HorizontalRule = ({ style, size, contrast, weight }) => (
  <hr
    data-autoid={`${stablePrefix}--hr`}
    className={classnames(
      `${prefix}--hr`,
      hrMod(style),
      hrMod(contrast),
      hrMod(size),
      hrMod(weight)
    )}
  />
);

HorizontalRule.propTypes = {
  style: PropTypes.string,
  size: PropTypes.string,
  contrast: PropTypes.string,
  weight: PropTypes.string,
};

export default HorizontalRule;
