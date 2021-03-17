/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import FooterLogo from './FooterLogo';
import FooterNav from './FooterNav';
import { globalInit } from '@carbon/ibmdotcom-services/es/services/global/global';
import LanguageSelector from './LanguageSelector';
import LegalNav from './LegalNav';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale';
import LocaleButton from './LocaleButton';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import TranslationAPI from '@carbon/ibmdotcom-services/es/services/Translation/Translation';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Footer component.
 */
const Footer = ({
  type,
  navigation,
  langCode,
  disableLocaleButton,
  languageOnly,
  labelText,
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
        try {
          const response = await TranslationAPI.getTranslation();
          if (!stale) {
            setFooterMenuData(response.footerMenu);
            setFooterLegalData(response.footerThin);
          }
        } catch (error) {
          console.error('Error populating footer data:', error);
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
      className={classNames(`${prefix}--footer`, {
        [`${prefix}--footer--short`]: type === 'short',
        [`${prefix}--footer--micro`]: type === 'micro',
      })}>
      <section className={`${prefix}--footer__main`}>
        <div className={`${prefix}--footer__main-container`}>
          {type !== 'micro' && <FooterLogo />}
          {(type === 'default' || type === undefined) && (
            <FooterNav groups={footerMenuData} />
          )}
          {type !== 'micro' &&
            _loadLocaleLanguage(
              disableLocaleButton,
              localeButtonAria,
              displayLang,
              languageOnly,
              labelText,
              languageItems,
              languageInitialItem,
              languageCallback
            )}
        </div>
      </section>
      <LegalNav
        links={footerLegalData}
        type={type}
        button={
          type === 'micro'
            ? _loadLocaleLanguage(
                disableLocaleButton,
                localeButtonAria,
                displayLang,
                languageOnly,
                labelText,
                languageItems,
                languageInitialItem,
                languageCallback
              )
            : null
        }
      />
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
 * @param {string} labelText Label text for locale/language selector
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
  labelText,
  languageItems,
  languageInitialItem,
  languageCallback
) {
  if (languageOnly) {
    return (
      <LanguageSelector
        items={languageItems}
        initialSelectedItem={languageInitialItem}
        callback={languageCallback}
        labelText={labelText}
      />
    );
  } else if (!disableLocaleButton) {
    return <LocaleButton aria={localeButtonAria} displayLang={displayLang} />;
  } else {
    return null;
  }
}

Footer.propTypes = {
  /**
   * Navigation data object for Footer, used for server-side rendering.
   */
  navigation: PropTypes.shape({
    footerMenu: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        links: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            url: PropTypes.string,
          })
        ),
      })
    ),
    footerThin: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      })
    ),
  }),

  /**
   * Type of Footer. Choose from:
   *
   * | Name    | Description                                                                 |
   * | ------- | --------------------------------------------------------------------------- |
   * | `default`  | Default footer variant includes additional navigation taking up more space. |
   * | `short` | Short footer variant reduces space by removing any additional navigation.   |
   * | `micro` | Micro footer variant includes legal navigation and locale button only.      |
   */
  type: PropTypes.oneOf(['default', 'short', 'micro']),

  /**
   * Language code for fetching the display name.
   */
  langCode: PropTypes.shape({
    cc: PropTypes.string,
    lc: PropTypes.string,
  }),

  /**
   * `true` to disable the Locale button.
   */
  disableLocaleButton: PropTypes.bool,

  /**
   * `true` to switch the locale button with a language selector.
   */
  languageOnly: PropTypes.bool,

  /**
   * Label text for combobox/select
   */
  labelText: PropTypes.string,

  /**
   * Array of items for the language selector,
   * uses [Carbon ComboBox](https://react.carbondesignsystem.com/?path=/story/combobox--combobox) for desktop,
   * and [Carbon Select](https://react.carbondesignsystem.com/?path=/story/select--default) for tablet/mobile.
   */
  languageItems: PropTypes.arrayOf(PropTypes.object),

  /**
   * Sets the initial language selector value when the component is loaded.
   * The default is the first item.
   */
  languageInitialItem: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  }),

  /**
   * Callback function onChange of the language selector.
   */
  languageCallback: PropTypes.func,
};

/**
 * @property {object} defaultProps default Footer props
 * @type {{navigation: null, langCode: null, disableLocaleButton: boolean,
 * type: string}}
 */
Footer.defaultProps = {
  navigation: null,
  type: 'default',
  langCode: null,
  disableLocaleButton: false,
  languageOnly: false,
  languageItems: [],
  languageCallback: () => {},
};

export default Footer;
