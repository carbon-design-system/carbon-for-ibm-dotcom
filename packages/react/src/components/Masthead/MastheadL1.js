/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { HeaderNavigation, HeaderMenuItem } from 'carbon-components-react';
import HeaderMenu from '../carbon-components-react/UIShell/HeaderMenu';
import { ArrowLeft16 } from '@carbon/icons-react';
import cx from 'classnames';

const { prefix } = settings;

/**
 * MastHead L1 component
 *
 * @typedef {object} navigation Object containing navigation elements
 * @returns {*} Masthead component
 */
const MastheadL1 = ({ isShort, title, eyebrowLink }) => {
  const className = cx({
    [`${prefix}--masthead__l1`]: true,
    [`${prefix}--masthead__l1--short`]: isShort,
  });

  return (
    <div className={className}>
      <div className={`${prefix}--masthead__l1-name`}>
        <span className={`${prefix}--masthead__l1-name-eyebrow`}>
          <ArrowLeft16 />
          <a href={eyebrowLink}>Eyebrow</a>
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

/**
 * @property propTypes
 * @description Defined property types for component
 *
 * @type {{isShort: boolean, title: string, eyebrowLink: string}}
 */
MastheadL1.propTypes = {
  isShort: PropTypes.bool,
  title: PropTypes.string,
  eyebrowLink: PropTypes.string,
};

export default MastheadL1;
