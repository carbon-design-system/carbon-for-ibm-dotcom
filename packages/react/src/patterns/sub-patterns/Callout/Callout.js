/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 *
 * @param {object} children jsx component
 * @returns {*} jsx component
 * @class callout
 */
const Callout = ({ children }) => (
  <section
    className={`${prefix}--callout__container`}
    data-autoid={`${stablePrefix}--callout__container`}>
    <div className={`${prefix}--callout__grid`}>
      <div className={`${prefix}--callout__column`}>{children}</div>
    </div>
  </section>
);

Callout.propTypes = {
  children: PropTypes.object,
};

export default Callout;
