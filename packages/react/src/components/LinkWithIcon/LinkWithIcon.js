/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import Link from '../../internal/vendor/carbon-components-react/components/Link/Link';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LinkWithIcon component.
 */
const LinkWithIcon = ({
  children,
  className: customClassName,
  href,
  inverse,
  iconInline,
  iconPlacement,
  ...props
}) => {
  return (
    <div
      className={classNames(
        `${prefix}--link-with-icon__container`,
        customClassName,
        {
          [`${prefix}--link-with-icon__container__inverse`]: inverse,
        }
      )}
      data-autoid={`${stablePrefix}--link-with-icon`}>
      <Link
        size="lg"
        href={href}
        className={classNames(`${prefix}--link-with-icon`, {
          [`${prefix}--link-with-icon__icon-left`]: iconPlacement === 'left',
          [`${prefix}--link-with-icon--inline-icon`]:
            iconInline && iconPlacement === 'right',
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
   * Positions the icon inline with text when `true`
   */
  iconInline: PropTypes.bool,

  /**
   * Icon placement.
   */
  iconPlacement: PropTypes.oneOf(['left', 'right']),

  /**
   * Toggles inverse theming
   */
  inverse: PropTypes.bool,

  /**
   * custom classname
   */
  className: PropTypes.string,
};

LinkWithIcon.defaultProps = {
  children: [],
  href: '',
  iconInline: true,
  iconPlacement: 'right',
};

export default LinkWithIcon;
