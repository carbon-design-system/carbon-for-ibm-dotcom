/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { ComposedModal } from 'carbon-components-react';
import ExpressiveModalCloseBtn from './ExpressiveModalCloseBtn';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Expressive Modal
 *
 * @param {object} props react proptypes
 * @returns {object} JSX object
 */
const ExpressiveModal = ({ open, className, children, onClose, ...props }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [prevOpen, setPrevOpen] = useState(open);

  useEffect(manageOpenState);

  return (
    <ComposedModal
      onClose={onClose}
      open={isOpen}
      data-autoid={`${stablePrefix}--expressive-modal`}
      className={classNames(`${prefix}--modal--expressive`, className)}
      {...props}>
      <ExpressiveModalCloseBtn onClick={closeModal} />
      {children}
    </ComposedModal>
  );

  /**
   * Close modal
   */
  function closeModal() {
    if (!onClose || onClose() !== false) {
      setIsOpen(false);
    }
  }

  /**
   * Manage open prop and isOpen state
   */
  function manageOpenState() {
    if (prevOpen !== open) {
      setIsOpen(open);
      setPrevOpen(open);
    }
  }
};

ExpressiveModal.propTypes = {
  open: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

ExpressiveModal.defaultProps = {
  open: false,
};

export default ExpressiveModal;
