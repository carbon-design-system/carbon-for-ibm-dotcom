/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ArrowRight16 from '@carbon/icons-react/es/arrow--right/16';
import { LinkWithIcon } from '../../LinkWithIcon';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * Category sublink
 */
const CategoryLink = ({ href, title, highlighted, ...rest }) => {
  return (
    <>
      {highlighted ? (
        <LinkWithIcon
          className={`${prefix}--masthead__megamenu__category-sublink--highlighted`}
          href={href}>
          <span>{title}</span>
          <ArrowRight16 />
        </LinkWithIcon>
      ) : (
        <a
          tabIndex={0}
          href={href}
          className={`${prefix}--masthead__megamenu__category-sublink`}
          data-autoid={`${rest.autoid}-item${rest.index}`}>
          {title}
        </a>
      )}
    </>
  );
};

CategoryLink.propTypes = {
  /**
   * Category sublink href
   */
  href: PropTypes.string.isRequired,

  /**
   * Category sublink text
   */
  title: PropTypes.string.isRequired,

  /**
   * Determines whether to render regular link style or link with icon
   */
  highlighted: PropTypes.bool,
};

export default CategoryLink;
