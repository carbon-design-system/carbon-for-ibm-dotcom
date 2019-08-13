/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import IbmLogo from './svg/ibm-logo.svg';

/**
 * Icon component for React
 *
 * @param {object} props Icon type and size
 * @returns {*} An svg icon
 * @class
 */
const Icon = ({ type, size }) => {
  switch (type) {
    case 'ibm-logo':
      return <IbmLogo width={size} height={size} />;
    default:
      return <IbmLogo width={size} height={size} />;
  }
};

/**
 * @property propTypes
 * @description Defined property types for component
 * @type {{type: string, size: number}}
 */
Icon.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number,
};
