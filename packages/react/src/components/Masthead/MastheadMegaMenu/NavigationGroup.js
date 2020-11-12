/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
const { stablePrefix } = ddsSettings;

const { prefix } = settings;

/**
 * MegaMenu panel
 */
const NavigationGroup = ({ children, ...rest }) => (
  <section
    className={`${prefix}--masthead__megamenu`}
    data-autoid={`${stablePrefix}--masthead__megamenu`}
    {...rest}>
    <div className={`${prefix}--masthead__megamenu__container`}>
      <div className={`${prefix}--masthead__megamenu__container--row`}>
        {children}
      </div>
    </div>
  </section>
);

NavigationGroup.propTypes = {
  /**
   * children elements
   */
  children: PropTypes.node,
};

export default NavigationGroup;
