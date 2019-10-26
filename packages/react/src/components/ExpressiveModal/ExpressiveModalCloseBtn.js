/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { Close20 } from '@carbon/icons-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Expressive Modal
 *
 * @param {object} props react proptypes
 * @returns {object} JSX object
 */
const ExpressiveModalCloseBtn = ({
  btnClassName,
  iconDescription,
  iconClassName,
  ...props
}) => {
  return (
    <button
      data-autoid={`${stablePrefix}--expressive-modal__close`}
      className={classNames(`${prefix}--modal-close`, btnClassName)}
      title={iconDescription}
      type="button"
      {...props}>
      <Close20
        aria-label={iconDescription}
        className={classNames(`${prefix}--modal-close__icon`, iconClassName)}
      />
    </button>
  );
};

ExpressiveModalCloseBtn.propTypes = {
  btnClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  iconDescription: PropTypes.string,
};

ExpressiveModalCloseBtn.defaultProps = {
  iconDescription: 'Close',
};

export default ExpressiveModalCloseBtn;
