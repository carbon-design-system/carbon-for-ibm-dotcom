/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import MastheadSearchInput from './MastheadSearchInput';

/**
 * Test MastHead component
 *
 * @param {string} type Type of masthead
 * @returns {*} Masthead component
 * @class
 */
const Masthead = ({ type }) => {
  if (type === 'branded') {
    return <div className="masthead">Branded</div>;
  } else {
    return <MastheadSearchInput />;
  }
};

Masthead.propTypes = {
  /**
   * Specify Masthead type
   */
  type: PropTypes.string,
};

export default Masthead;
