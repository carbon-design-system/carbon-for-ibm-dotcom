/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  settings as ddsSettings,
  ipcinfoCookie,
} from '@carbon/ibmdotcom-utilities';
import { globalInit } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { TranslationAPI } from '@carbon/ibmdotcom-services';
import classNames from 'classnames';
import FooterLogo from './FooterLogo';
import FooterNav from './FooterNav';
import LegalNav from './LegalNav';
import LocaleButton from './LocaleButton';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Footer component
 *
 * @param {object} props react proptypes
 * @param {object} props.navigation footer navigation object
 * @returns {object} JSX object
 */
const Footer = ({ type, navigation }) => {
  let [footerMenuData, setFooterMenuData] = useState([]);
  let [footerLegalData, setFooterLegalData] = useState([]);

  useEffect(() => {
    // initialize global execution calls
    globalInit();
  }, []);

  useEffect(() => {
    if (!navigation) {
      (async () => {
        const response = await TranslationAPI.getTranslation();
        setFooterMenuData(response.footerMenu);
        setFooterLegalData(response.footerThin);
      })();
    }
  }, [navigation]);

  if (navigation) {
    footerMenuData = navigation.footerMenu;
    footerLegalData = navigation.footerThin;
  }

  /**
   * method to handle when country/region has been selected
   * sets the ipcInfo cookie with selected locale
   *
   * @param {object} item selected country/region
   */
  const selectItem = item => {
    const stringLocale = item.selectedItem.locale[0][0];
    const locale = stringLocale.split('-');
    const localeObj = {
      cc: locale[1],
      lc: locale[0],
    };
    ipcinfoCookie.set(localeObj);
  };

  return (
    <footer
      data-autoid={`${stablePrefix}--footer`}
      className={classNames(`${prefix}--footer`, setFooterType(type))}>
      <section className={`${prefix}--footer__main`}>
        <div className={`${prefix}--footer__main-container`}>
          <FooterLogo />
          {optionalFooterNav(type, footerMenuData)}
          <LocaleButton selectItem={selectItem} />
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
 * @param {string} data footer menu data
 * @returns {object} JSX object
 */
function optionalFooterNav(type, data) {
  if (type !== 'short') {
    return <FooterNav groups={data} />;
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
  navigation: PropTypes.object,
  type: PropTypes.string,
};

export default Footer;
