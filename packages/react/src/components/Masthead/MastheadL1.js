/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HeaderMenuItem, HeaderNavigation } from 'carbon-components-react';
import { ArrowLeft16 } from '@carbon/icons-react';
import cx from 'classnames';
import HeaderMenu from '../carbon-components-react/UIShell/HeaderMenu';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

/**
 * MastHead L1 component
 *
 * @param {object} props React props
 * @param {boolean} props.isShort Flag on whether L1 is short or tall
 * @param {string} props.title Title for the L1
 * @param {string} props.eyebrowText Eyebrow text
 * @param {string} props.eyebrowLink URL for the Eyebrow
 * @returns {*} MastheadL1 JSX component
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

/**
 * @property {object} propTypes MastheadL1 propTypes
 * @description Defined property types for component
 *
 * @type {{isShort: boolean, title: string, eyebrowText: string, eyebrowLink: string}}
 */
MastheadL1.propTypes = {
  isShort: PropTypes.bool,
  title: PropTypes.string,
  eyebrowText: PropTypes.string,
  eyebrowLink: PropTypes.string,
};

export default MastheadL1;
