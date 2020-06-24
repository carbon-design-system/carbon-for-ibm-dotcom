/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import Close20 from '@carbon/icons-react/es/close/20';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Close button for Expressive Modal.
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
  /**
   * A custom class name to the button.
   */
  btnClassName: PropTypes.string,

  /**
   * A custom class name to the icon.
   */
  iconClassName: PropTypes.string,

  /**
   * Accessible description that describes icon action.
   */
  iconDescription: PropTypes.string,
};

ExpressiveModalCloseBtn.defaultProps = {
  iconDescription: 'Close',
};

export default ExpressiveModalCloseBtn;
