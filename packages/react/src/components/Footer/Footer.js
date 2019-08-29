/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import classNames from 'classnames';
import FooterLogo from './FooterLogo';
import FooterNav from './FooterNav';
import LegalNav from './LegalNav';

import footerMenuData from './__stories__/data/footer-menu';
import footerLegalData from './__stories__/data/footer-legal';

const { prefix } = settings;

/**
 * Footer component
 *
 * @param {object} props react proptypes
 * @returns {object} JSX object
 */
const Footer = ({ type }) => {
  return (
    <footer
      data-autoid="footer"
      className={classNames(`${prefix}--footer`, setFooterType(type))}>
      <section className={`${prefix}--footer__main`}>
        <div className={`${prefix}--footer__main-container`}>
          <FooterLogo />
          {optionalFooterNav(type)}
        </div>
      </section>
      <LegalNav links={footerLegalData} />
    </footer>
  );
};

/**
 * renders optional footer nav for tall
 *
 * @param {string} type type of footer in use
 * @returns {object} JSX object
 */
function optionalFooterNav(type) {
  if (type !== 'short') {
    return <FooterNav groups={footerMenuData} />;
  }
}

/**
 * sets the footer type
 *
 * @param {string} type type of footer in use
 * @returns {object} JSX object
 */
function setFooterType(type) {
  let typeClassName;

  if (type === 'short') {
    typeClassName = `${prefix}--footer--short`;
  }

  return typeClassName;
}

Footer.propTypes = {
  type: PropTypes.string,
};

export default Footer;

// api for reference later
// https://www.ibm.com/common/v18/js/data/usen.js
