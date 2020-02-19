/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

/**
 * MastHead Profile component
 *
 * @param {object} props Incoming props
 * @returns {*} Masthead Profile component
 */
const MastheadProfile = ({
  overflowMenuProps,
  overflowMenuItemProps,
  profileMenu,
}) => {
  /**
   * Masthead profile menu
   *
   * @returns {*} Masthead profile menu
   */
  const profileNav = profileMenu.map((item, i) => {
    return (
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText={item.title}
        href={item.url}
        hasDivider={i > 0}
        key={i}
        primaryFocus
      />
    );
  });

  return (
    <OverflowMenu
      className={`${prefix}--header__action`}
      {...overflowMenuProps}>
      {profileNav}
    </OverflowMenu>
  );
};

MastheadProfile.propTypes = {
  overflowMenuProps: PropTypes.object,
  overflowMenuItemProps: PropTypes.object,
  profileMenu: PropTypes.array,
};

export default MastheadProfile;
