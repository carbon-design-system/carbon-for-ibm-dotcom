/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowLeft16 from '@carbon/icons-react/es/arrow--left/16';
import cx from 'classnames';
import HeaderMenu from '../carbon-components-react/UIShell/HeaderMenu';
import HeaderMenuItem from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderMenuItem';
import HeaderNavigation from '../../internal/vendor/carbon-components-react/components/UIShell/HeaderNavigation';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * MastHead L1 component.
 */
const MastheadL1 = ({ isShort, title, eyebrowText, eyebrowLink }) => {
  const className = cx({
    [`${prefix}--masthead__l1`]: true,
    [`${prefix}--masthead__l1--short`]: isShort,
  });
  return (
    <div className={className}>
      <div className={`${prefix}--masthead__l1-name`}>
        <span className={`${prefix}--masthead__l1-name-eyebrow`}>
          <ArrowLeft16 />
          <a href={eyebrowLink}>{eyebrowText}</a>
        </span>
        <span className={`${prefix}--masthead__l1-name-title`}>{title}</span>
      </div>
      <HeaderNavigation className={`${prefix}--masthead__l1-nav`} aria-label="">
        <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
        <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
        <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
        <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
          <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
          <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
          <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
        </HeaderMenu>
      </HeaderNavigation>
    </div>
  );
};

MastheadL1.propTypes = {
  /**
   * `true` to make this L1 short.
   */
  isShort: PropTypes.bool,

  /**
   * The title (experimental).
   */
  title: PropTypes.string,

  /**
   * Text for the eyebrow link (experimental).
   */
  eyebrowText: PropTypes.string,

  /**
   * URL for the eyebrow link (experimental).
   */
  eyebrowLink: PropTypes.string,
};

export default MastheadL1;
