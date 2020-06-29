/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
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
const LinkWithIcon = ({ children, href, inverse, iconOnLeft, ...props }) => {
  return (
    <div
      className={classNames(`${prefix}--link-with-icon__container`, {
        [`${prefix}--link-with-icon__container__inverse`]: inverse,
      })}
      data-autoid={`${stablePrefix}--link-with-icon`}>
      <Link
        href={href}
        className={classNames(`${prefix}--link-with-icon`, {
          [`${prefix}--link-with-icon__icon-left`]: iconOnLeft,
        })}
        {...props}>
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

  /**
   * Display icon to left of link.
   */
  iconOnLeft: PropTypes.bool,

  /**
   * Toggles inverse theming
   */
  inverse: PropTypes.bool,
};

LinkWithIcon.defaultProps = {
  children: [],
  href: '',
};

export default LinkWithIcon;
