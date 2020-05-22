/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import ComposedModal from '../../internal/vendor/carbon-components-react/components/ComposedModal/ComposedModal';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import ExpressiveModalCloseBtn from './ExpressiveModalCloseBtn';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Expressive Modal
 *
 * @param {object} props react proptypes
 * @param {boolean} props.fullwidth sets whether the modal is fulldiwth or not
 * @param {boolean} props.open sets whether the modal is open/close
 * @param {Function} props.onClose do something on close in addition, return false to completely replace
 * @param {string|string[]} props.className allows custom classes to be added in addition
 * @param {*} props.children any type of content to be rendered inside modal
 * @returns {object} JSX object
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
      className={classNames(
        `${prefix}--modal--expressive`,
        className,
        setVariant(fullwidth)
      )}
      {...props}>
      <ExpressiveModalCloseBtn onClick={closeModal} />
      {children}
    </ComposedModal>
  );

  /**
   * sets the class name based if model type is fullwidth
   *
   * @param {boolean} isFullwidth includes variant class name or not ( true | false )
   * @returns {string} fullwidth variant css class name
   */
  function setVariant(isFullwidth) {
    let fullwidth;
    fullwidth =
      isFullwidth === true ? `${prefix}--modal--expressive--fullwidth` : '';
    return fullwidth;
  }

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
  fullwidth: PropTypes.bool,
  open: PropTypes.bool,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  children: PropTypes.node,
  onClose: PropTypes.func,
};

ExpressiveModal.defaultProps = {
  open: false,
};

export default ExpressiveModal;
