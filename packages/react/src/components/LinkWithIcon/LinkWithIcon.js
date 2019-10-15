/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { Link } from 'carbon-components-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LinkWithIcon component
 *
 * @param {Array} children User content
 * @param {string} href destination url
 * @returns {*} LinkWithIcon component
 */
const LinkWithIcon = ({ children, href, ...props }) => {
  return (
    <div data-autoid={`${stablePrefix}--link-with-icon`}>
      <Link href={href} className={`${prefix}--link-with-icon`} {...props}>
        {children}
      </Link>
    </div>
  );
};
/**
 * @property propTypes
 * @description Defined property types for component
 *
 * @type {{children: object, href: string}}
 */
LinkWithIcon.propTypes = {
  children: PropTypes.array,
  href: PropTypes.string,
};

/**
 * @property defaultProps
 * @type {{children: {}, href: string}}
 */
LinkWithIcon.defaultProps = {
  children: [],
  href: '',
};

export default LinkWithIcon;
