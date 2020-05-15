/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  globalInit,
  LocaleAPI,
  TranslationAPI,
} from '@carbon/ibmdotcom-services';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { DDS_LANGUAGE_SELECTOR } from '../../internal/FeatureFlags';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import FooterLogo from './FooterLogo';
import FooterNav from './FooterNav';
import LanguageSelector from './LanguageSelector';
import LegalNav from './LegalNav';
import LocaleButton from './LocaleButton';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Footer component
 *
 * @param {object} props react proptypes
 * @param {string=} props.type Determines the type of footer to render
 * @param {object=} props.navigation Navigation object for SSR
 * @param {object=} props.langCode lc/cc object, e.g. { lc: 'en', cc: 'us' }
 * @param {boolean=} props.disableLocaleButton Flag to disable to locale button
 * @param {boolean=} props.languageOnly Switches to the language selector
 * @param {Array=} props.languageItems Array of language items for the dropdown
 * @param {object=} props.languageInitialItem Initial language selected
 * @param {Function=} props.languageCallback Callback function when language is selected
 * @returns {*} Footer JSX
 */
const Footer = ({
  type,
  navigation,
  langCode,
  disableLocaleButton,
  languageOnly,
  languageItems,
  languageInitialItem,
  languageCallback,
}) => {
  let [footerMenuData, setFooterMenuData] = useState([]);
  let [footerLegalData, setFooterLegalData] = useState([]);
  let [displayLang, setDisplayLang] = useState('');
  let [localeButtonAria, setLocaleButtonAria] = useState('');

  useEffect(() => {
    // initialize global execution calls
    globalInit();
  }, []);

  useEffect(() => {
    let stale = false;
    if (!navigation) {
      (async () => {
        const response = await TranslationAPI.getTranslation();
        if (!stale) {
          setFooterMenuData(response.footerMenu);
          setFooterLegalData(response.footerThin);
        }
      })();
    }
    return () => {
      stale = true;
    };
  }, [navigation]);

  useEffect(() => {
    let stale = false;
    (async () => {
      const response = await LocaleAPI.getLangDisplay(langCode);
      if (stale) {
         return;
      }
      setDisplayLang(response);

      const locale = await LocaleAPI.getLocale();
      if (stale) {
        return;
      }
      const list = await LocaleAPI.getList(locale);
      if (stale) {
        return;
      }
      setLocaleButtonAria(list.localeModal.headerTitle);
    })();
    return () => {
      stale = true;
    };
  }, [langCode]);

  if (navigation) {
    footerMenuData = navigation.footerMenu;
    footerLegalData = navigation.footerThin;
  }

  return (
    <footer
      data-autoid={`${stablePrefix}--footer`}
      className={classNames(`${prefix}--footer`, _setFooterType(type))}>
      <section className={`${prefix}--footer__main`}>
        <div className={`${prefix}--footer__main-container`}>
          <FooterLogo />
          {_optionalFooterNav(type, footerMenuData)}
          {_loadLocaleLanguage(
            disableLocaleButton,
            localeButtonAria,
            displayLang,
            languageOnly,
            languageItems,
            languageInitialItem,
            languageCallback
          )}
        </div>
      </section>
      <LegalNav links={footerLegalData} />
    </footer>
  );
};

/**
 * Loads in the locale modal, language selector, or null
 *
 * @param {boolean} disableLocaleButton Flag to disable to locale button
 * @param {string} localeButtonAria String for the aria label
 * @param {string} displayLang display language for locale button
 * @param {boolean} languageOnly Switches to the language selector
 * @param {Array} languageItems Array of language data for the dropdown
 * @param {object} languageInitialItem Initial language selected
 * @param {Function} languageCallback Callback function when language is selected
 * @returns {null|*} JSX or null
 * @private
 */
function _loadLocaleLanguage(
  disableLocaleButton,
  localeButtonAria,
  displayLang,
  languageOnly,
  languageItems,
  languageInitialItem,
  languageCallback
) {
  if (DDS_LANGUAGE_SELECTOR && languageOnly) {
    return (
      <LanguageSelector
        items={languageItems}
        initialSelectedItem={languageInitialItem}
        callback={languageCallback}
      />
    );
  } else if (!disableLocaleButton) {
    return <LocaleButton aria={localeButtonAria} displayLang={displayLang} />;
  } else {
    return null;
  }
}

/**
 * renders optional footer nav for tall
 *
 * @param {string} type type of footer in use
 * @param {string} data footer menu data
 * @returns {object} JSX object
 * @private
 */
function _optionalFooterNav(type, data) {
  if (type !== 'short') {
    return <FooterNav groups={data} />;
  }
}

/**
 * sets the footer type
 *
 * @param {string} type type of footer in use
 * @returns {object} JSX object
 * @private
 */
function _setFooterType(type) {
  let typeClassName;

  if (type === 'short') {
    typeClassName = `${prefix}--footer--short`;
  }

  return typeClassName;
}

Footer.propTypes = {
  navigation: PropTypes.object,
  type: PropTypes.string,
  langCode: PropTypes.object,
  disableLocaleButton: PropTypes.bool,
  languageOnly: PropTypes.bool,
  languageItems: PropTypes.arrayOf(PropTypes.object),
  languageInitialItem: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  }),
  languageCallback: PropTypes.func,
};

/**
 * @property {object} defaultProps default Footer props
 * @type {{navigation: null, langCode: null, disableLocaleButton: boolean,
 * type: string}}
 */
Footer.defaultProps = {
  navigation: null,
  type: 'full',
  langCode: null,
  disableLocaleButton: false,
  languageOnly: false,
  languageItems: [],
  languageCallback: () => {},
};

export default Footer;
