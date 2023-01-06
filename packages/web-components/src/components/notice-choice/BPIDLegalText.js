/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types';
import React from 'react';
const BPIDLegalText = ({ bpidLegalText }) => {
  return <p>{bpidLegalText}</p>;
};
BPIDLegalText.propTypes = {
  /**
   * @description Legal text based on the ibmid query params
   */
  bpidLegalText: PropTypes.string.isRequired,
};
export default BPIDLegalText;
