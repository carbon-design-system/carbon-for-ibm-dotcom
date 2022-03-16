/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classnames from 'classnames';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Horizontal Rule component.
 */
const HorizontalRule = ({ type, size, contrast, weight }) => (
  <hr
    data-autoid={`${stablePrefix}--hr`}
    className={classnames(`${prefix}--hr`, {
      [`${prefix}--hr--${type}`]: type,
      [`${prefix}--hr--${contrast}`]: contrast,
      [`${prefix}--hr--${size}`]: size,
      [`${prefix}--hr--${weight}`]: weight,
    })}
  />
);

HorizontalRule.propTypes = {
  /**
   * Type of HR. Choose from:
   *
   * | Name     | Description                                                                    |
   * | -------- | ------------------------------------------------------------------------------ |
   * | `solid`  | Default type variant of the horizontal rule                                   |
   * | `dashed` | Dashed/dotted type variant (type is applied in conjuction with `fluid` size) |
   */
  type: PropTypes.oneOf(['solid', 'dashed']),

  /**
   * Length of the HR. Choose from:
   *
   * | Name     | Description                                                         |
   * | -------- | ------------------------------------------------------------------- |
   * | `fluid`  | Default size variant - horizontal rule takes full width of the grid |
   * | `small`  | Shorter fixed-length variant with a max-width of 32px               |
   * | `medium` | Medium fixed-length variant with a max-width of 48px                |
   * | `large`  | Longer fixed-length variant with a max-width of 64px                |
   */
  size: PropTypes.oneOf(['fluid', 'small', 'medium', 'large']),

  /**
   * Contrast of the HR. Choose from:
   *
   * | Name              | Description                    |
   * | ----------------- | ------------------------------ |
   * | `medium-contrast` | Default contrast color variant |
   * | `low-contrast`    | Lighter contrast color variant |
   * | `high-contrast`   | Darker contrast color variant  |
   */
  contrast: PropTypes.oneOf([
    'medium-contrast',
    'low-contrast',
    'high-contrast',
  ]),

  /**
   * Weight of the HR. Choose from:
   *
   * | Name    | Description                                                                          |
   * | ------- | ------------------------------------------------------------------------------------ |
   * | `thin`  | Default weight variant                                                               |
   * | `thick` | Slightly thicker weight variant (this only applied in conjunction with `fluid` size) |
   */
  weight: PropTypes.oneOf(['thin', 'thick']),
};

export default HorizontalRule;
