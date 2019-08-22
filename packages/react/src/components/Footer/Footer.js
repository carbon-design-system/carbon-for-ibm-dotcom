/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { localeSelector } from '../../internal/FeatureFlags';
// import LocaleSelector from './LocaleSelector';
import { settings } from 'carbon-components';
import classNames from 'classnames';
import FooterTitle from './FooterTitle';
import FooterNav from './FooterNav';
import LegalNav from './LegalNav';

import footerMenuData from './__stories__/data/footer-menu';
import footerLegalData from './__stories__/data/footer-legal';

const { prefix } = settings;

/** Footer component */
class Footer extends React.Component {
  /**
   * Renders the footer component
   *
   * @returns {object} JSX object
   */
  render() {
    const { type } = this.props;

    return (
      <footer
        className={classNames(`${prefix}--footer`, this.setFooterType(type))}>
        <section className={`${prefix}--footer__main`}>
          <div class={`${prefix}--footer__main-container`}>
            <FooterTitle />
            {this.optionalFooterNav(type)}
          </div>
        </section>
        <LegalNav links={footerLegalData} />
      </footer>
    );
  }

  /**
   * renders optional footer nav for tall
   *
   * @param {string} type type of footer in use
   * @returns {object} JSX object
   */
  optionalFooterNav(type) {
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
  setFooterType(type) {
    let typeClassName;

    if (type === 'short') {
      typeClassName = `${prefix}--footer--short`;
    }

    return typeClassName;
  }
}

Footer.propTypes = {
  type: PropTypes.string,
};

export default Footer;

// api for reference later
// https://www.ibm.com/common/v18/js/data/usen.js
