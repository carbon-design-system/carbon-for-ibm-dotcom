/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ddsSettings from '../../vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Callout with child object.
 */
const Callout = ({ children }) => (
  <section
    className={`${prefix}--callout__container`}
    data-autoid={`${stablePrefix}--callout__container`}
  >
    <div
      className={`${prefix}--callout__column`}
      data-autoid={`${stablePrefix}--callout__column`}
    >
      <div
        className={`${prefix}--callout__content`}
        data-autoid={`${stablePrefix}--callout__content`}
      >
        {children}
      </div>
    </div>
  </section>
);

Callout.propTypes = {
  /**
   * The component being imported into the callout container.
   */
  children: PropTypes.node,
};

export default Callout;
