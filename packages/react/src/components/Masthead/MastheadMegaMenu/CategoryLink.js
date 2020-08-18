/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * Category sublink
 */
const CategoryLink = ({ href, title, ...rest }) => (
  <a
    href={href}
    className={`${prefix}--masthead__megamenu__category-sublink`}
    data-autoid={`${rest.autoid}-item${rest.index}`}>
    {title}
  </a>
);

CategoryLink.propTypes = {
  /**
   * Category sublink href
   */
  href: PropTypes.string.isRequired,

  /**
   * Category sublink text
   */
  title: PropTypes.string.isRequired,
};

export default CategoryLink;
