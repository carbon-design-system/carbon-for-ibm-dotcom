/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classnames from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
const { stablePrefix } = ddsSettings;

const { prefix } = settings;

/**
 * MegaMenu panel
 */
const NavigationGroup = ({ hasHighlights, children, ...rest }) => (
  <section
    className={classnames(`${prefix}--masthead__megamenu`, {
      [`${prefix}--masthead__megamenu__container--hasHighlights`]: hasHighlights,
    })}
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
   * Determines whether to render the Highlight Section (Left Navigation)
   */
  hasHighlights: PropTypes.bool,

  /**
   * children elements
   */
  children: PropTypes.node,
};

export default NavigationGroup;
