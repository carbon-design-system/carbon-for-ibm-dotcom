/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import ComposedModal from '../../internal/vendor/carbon-components-react/components/ComposedModal/ComposedModal';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import ExpressiveModalCloseBtn from './ExpressiveModalCloseBtn';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Expressive Modal.
 */
const ExpressiveModal = ({
  open,
  className,
  children,
  fullwidth,
  onClose,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(manageOpenState, [open]);

  return (
    <ComposedModal
      onClose={onClose}
      open={isOpen}
      data-autoid={`${stablePrefix}--expressive-modal`}
      className={classNames(`${prefix}--modal--expressive`, className, {
        [`${prefix}--modal--expressive--fullwidth`]: fullwidth,
      })}
      selectorPrimaryFocus={`.${prefix}--modal-close`}
      {...props}>
      <ExpressiveModalCloseBtn onClick={closeModal} />
      {children}
    </ComposedModal>
  );

  /**
   * Close modal
   */
  function closeModal() {
    if (onClose?.() !== false) {
      setIsOpen(false);
    }
  }

  /**
   * Manage open prop and isOpen state
   */
  function manageOpenState() {
    setIsOpen(open);
  }
};

ExpressiveModal.propTypes = {
  /**
   * Sets whether the Modal is fullwidth or not.
   */
  fullwidth: PropTypes.bool,

  /**
   * Sets whether the Modal is open/close.
   */
  open: PropTypes.bool,

  /**
   * Custom classname(s) for the Modal.
   */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

  /**
   * Components/Elements to be rendered within the Modal.
   */
  children: PropTypes.node,

  /**
   * Function to be triggered on close of Modal.
   */
  onClose: PropTypes.func,
};

ExpressiveModal.defaultProps = {
  open: false,
};

export default ExpressiveModal;
