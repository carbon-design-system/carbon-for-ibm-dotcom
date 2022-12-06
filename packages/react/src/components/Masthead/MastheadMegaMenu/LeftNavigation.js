/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * Left Navigation Section of MegaMenu
 */
const LeftNavigation = ({ children, ...props }) => (
  <div
    className={`${prefix}--masthead__megamenu__highlight-section`}
    {...props}>
    {children}
  </div>
);

LeftNavigation.propTypes = {
  /**
   * Category Groups to be rendered in the Left Navigation Section
   */
  children: PropTypes.node.isRequired,
};

export default LeftNavigation;
