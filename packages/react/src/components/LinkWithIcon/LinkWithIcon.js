/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import Link from '../../internal/vendor/carbon-components-react/components/Link/Link';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LinkWithIcon component.
 */
const LinkWithIcon = ({ children, href, ...props }) => {
  return (
    <div
      className={`${prefix}--link-with-icon__container`}
      data-autoid={`${stablePrefix}--link-with-icon`}>
      <Link href={href} className={`${prefix}--link-with-icon`} {...props}>
        {children}
      </Link>
    </div>
  );
};

LinkWithIcon.propTypes = {
  /**
   * Array containing Link text and icon elements.
   */
  children: PropTypes.arrayOf(PropTypes.node),

  /**
   * Url of link.
   */
  href: PropTypes.string,
};

LinkWithIcon.defaultProps = {
  children: [],
  href: '',
};

export default LinkWithIcon;
