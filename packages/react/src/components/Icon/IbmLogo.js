/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import MastheadLogo from '@carbon/ibmdotcom-styles/icons/svg/IBM-8bar-logo--h23.svg';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * IBM Logo 8-bar component.
 */
const IbmLogo = ({ autoid }) => (
  <div className={`${prefix}--header__logo`}>
    <a aria-label="IBM®" data-autoid={autoid} href="https://www.ibm.com/">
      <MastheadLogo />
    </a>
  </div>
);

export default IbmLogo;

IbmLogo.propTypes = {
  /**
   * data-autoid attribute for analytics
   */
  autoid: PropTypes.string,
};
