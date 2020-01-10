/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import MastheadLogo from '@carbon/ibmdotcom-styles/icons/svg/IBM-8bar-logo--h23.svg';
import React from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * IBM 8-bar Logo
 *
 * @type {string}
 * @returns {*} IBM Logo 8-bar component
 */
const IbmLogo = () => (
  <div
    data-autoid={`${stablePrefix}--masthead-logo`}
    className={`${prefix}--header__logo`}>
    <a
      data-autoid={`${stablePrefix}--masthead-logo__link`}
      href="https://www.ibm.com/">
      <MastheadLogo />
    </a>
  </div>
);

export default IbmLogo;
