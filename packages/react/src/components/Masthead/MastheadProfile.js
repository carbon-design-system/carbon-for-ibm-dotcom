/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';

/**
 * MastHead Profile component
 *
 * @param {object} props Incoming props
 * @returns {*} Masthead Profile component
 */
const MastheadProfile = ({ overflowMenuProps, overflowMenuItemProps }) => {
  return (
    <OverflowMenu {...overflowMenuProps}>
      <OverflowMenuItem {...overflowMenuItemProps} itemText="My IBM" />
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText="Log in"
        hasDivider
      />
    </OverflowMenu>
  );
};

MastheadProfile.propTypes = {
  overflowMenuProps: PropTypes.object,
  overflowMenuItemProps: PropTypes.object,
};

export default MastheadProfile;
