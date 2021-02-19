/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ArrowRight16 from '@carbon/icons-react/es/arrow--right/16';
import classnames from 'classnames';
import LinkWithIcon from '../../LinkWithIcon/LinkWithIcon';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * Right/Main Panel Navigation of MegaMenu
 */
const RightNavigation = ({
  children,
  viewAllLinkHref,
  viewAllLinkTitle,
  hasHighlights,
  ...rest
}) => (
  <div className={`${prefix}--masthead__megamenu__categories-section`}>
    <div
      className={classnames(`${prefix}--masthead__megamenu__categories`, {
        [`${prefix}--masthead__megamenu--hasHighlights`]: hasHighlights,
        [`${prefix}--masthead__megamenu--hasViewAllLink`]: viewAllLinkHref,
      })}>
      {children}
    </div>
    {viewAllLinkHref && (
      <LinkWithIcon
        className={`${prefix}--masthead__megamenu__view-all-cta`}
        data-autoid={`${rest.autoid}-view-all`}
        href={viewAllLinkHref}>
        <span>{viewAllLinkTitle}</span>
        <ArrowRight16 />
      </LinkWithIcon>
    )}
  </div>
);

RightNavigation.propTypes = {
  /**
   * Category Groups to be rendered in the Left Navigation Section
   */
  children: PropTypes.node.isRequired,

  /**
   * Determines whether to render the Highlight Section (Left Navigation)
   */
  hasHighlights: PropTypes.bool,

  /**
   * Megamenu view all cta url
   */
  viewAllLinkHref: PropTypes.string,

  /**
   * Megamenu view all cta title
   */
  viewAllLinkTitle: PropTypes.string,
};

export default RightNavigation;
