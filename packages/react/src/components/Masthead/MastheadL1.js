/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import HeaderNavigation from 'carbon-components-react/es/components/UIShell/HeaderNavigation';
import HeaderMenu from 'carbon-components-react/es/components/UIShell/HeaderMenu';
import HeaderMenuItem from 'carbon-components-react/es/components/UIShell/HeaderMenuItem';
import ArrowLeft16 from '@carbon/icons-react/es/arrow--left/16';
import cx from 'classnames';

const { prefix } = settings;

/**
 * MastHead L1 component
 *
 * @typedef {object} navigation Object containing navigation elements
 * @returns {*} Masthead component
 */
const MastheadL1 = () => {
  const className = cx({
    [`${prefix}--masthead__l1`]: true,
  });

  return (
    <div className={className}>
      <div className={`${prefix}--masthead__l1-name`}>
        <span className={`${prefix}--masthead__l1-name-eyebrow`}>
          <ArrowLeft16 />
          <a href="#">Eyebrow</a>
        </span>
        <span className={`${prefix}--masthead__l1-name-title`}>
          Stock Charts
        </span>
      </div>
      <HeaderNavigation className={`${prefix}--masthead__l1-nav`}>
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

export default MastheadL1;
