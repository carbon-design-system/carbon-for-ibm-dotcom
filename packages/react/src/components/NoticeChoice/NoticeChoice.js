/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
// eslint-disable-next-line sort-imports
import { checkPreferencesv3, loadContent } from './services';

import BPIDLegalText from './BPIDLegalText';
import Checkbox from '../../internal/vendor/carbon-components-react/components/Checkbox';
import { DDS_NOTICE_CHOICE } from '../../internal/FeatureFlags.js';
import PropTypes from 'prop-types';
import SkeletonText from '../../internal/vendor/carbon-components-react/components/SkeletonText';
// eslint-disable-next-line sort-imports
import countrySettings from './country-settings';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import featureFlag from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/featureflag/featureflag';
import { getMappedValue } from './utils';
import settings from 'carbon-components/es/globals/js/settings';
import worldWideContent from './world-wide-content';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;
const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function NoticeChoice({
  locale,
  country,
  questionChoices,
  email,
  onChange,
  termsConditionLink,
  classNames,
  defaultValues,
  enableAllOptIn,
  bpidLegalText,
}) {
  const [loaded, setLoaded] = useState(false);
  const [changed, setChanged] = useState(false);
  const [preText, setPreText] = useState('');
  const [postText, setPostText] = useState('');
  const [checkboxes, setCheckboxes] = useState();
  const [ncData, setNcData] = useState();
  const [optInContent, setOptInContent] = useState({
    ...worldWideContent.OptInContent,
    cclc: `${worldWideContent.cc_name}-${worldWideContent.cc_lang}`,
  });
  const [prefChange, setPrefChange] = useState(false);
  const [fetchedPref, setFetchedPref] = useState('');
  const [values, setValues] = useState({
    EMAIL: false,
    PHONE: false,
    POSTAL: false,
    NC_HIDDEN_EMAIL: worldWideContent.cc_default_status,
    NC_HIDDEN_PHONE: worldWideContent.cc_default_status,
    NC_HIDDEN_POSTAL: worldWideContent.cc_default_status,
  });
  let defaultPreText = useRef('');

  const getOptionByQuestion = useCallback(
    (question, OptInContentValue) => {
      let OptInContent = OptInContentValue;
      if (!OptInContent) {
        OptInContent = ncData.OptInContent;
      }
      let option;
      switch (question) {
        case 'EMAIL': {
          option = OptInContent.fourQuestionApp[0];
          break;
        }
        case 'PHONE': {
          option = OptInContent.fourQuestionApp[1];
          break;
        }
        case 'POSTAL': {
          option = OptInContent.fourQuestionApp[2];
          break;
        }
        default: {
          option = OptInContent.fourQuestionApp[0];
          break;
        }
      }
      return option;
    },
    [ncData]
  );

  /**
   * If the `enableAllOptIn` variable is false, then for each key in the `checkboxes` object, set the
   * value of the `newValues` object to the value defined in the notice choice content, or if the
   * `defaultValues` object has a property with the same name as the key, then set the value of the
   * `newValues` object to the value of the `defaultValues` object's property
   */
  const setDefaultSelections = useCallback(() => {
    if (!enableAllOptIn && checkboxes) {
      const newValues = { ...values };
      Object.keys(checkboxes).forEach((key) => {
        const option = getOptionByQuestion(key, optInContent);
        newValues[key] = !!(
          option.checked === 'true' || option.checked === true
        );
        if (Object.prototype.hasOwnProperty.call(defaultValues, key)) {
          newValues[key] = defaultValues[key];
        }
        const fieldName = `NC_CHECK_${key}`;
        const hiddenFieldName = `NC_HIDDEN_${key}`;
        onChange(fieldName, newValues[key]);
        onChange(hiddenFieldName, newValues[key] ? 'OPT_IN' : null);
      });
      if (JSON.stringify(values) !== JSON.stringify(newValues)) {
        setValues(newValues);
      }
    }
  }, [
    values,
    checkboxes,
    enableAllOptIn,
    defaultValues,
    onChange,
    getOptionByQuestion,
    optInContent,
  ]);
  /**
   * The function is called when the user changes the country. It checks if the country is English,
   * and if so, it sets the pre-text to the default pre-text
   */
  const countryChangeAction = useCallback(() => {
    const splitValue = locale.split('-', 2);
    const ncData = getNcContentFromWindow();
    if (splitValue[1] === 'en') {
      let preText = defaultPreText.current;
      if (ncData.OtherPreferences.englishNoticeText !== '') {
        preText = ncData.OtherPreferences.englishNoticeText;
      }
      setPreText(preText);
    }
    /**
     * @description if the user already interacted with the checkboxes,
     * skip country default selection.
     */
    if (!changed && !fetchedPref) {
      /**
       * @description
       * change checkbox checked option based on new country.
       */
      setDefaultSelections();
    }
  }, [locale, setDefaultSelections, changed, fetchedPref]);

  useEffect(() => {
    if (optInContent.cclc) {
      countryChangeAction();
    }
  }, [optInContent.cclc, countryChangeAction]);

  const loadECMData = useCallback(() => {
    let cc = 'zz';
    let lc = 'en';
    const ccLcObject = getMappedValue(locale);
    cc = ccLcObject.cc;
    lc = ccLcObject.lc;

    resetToWorldWideContent();
    loadContent(cc, lc, (data) => {
      // Sent content language
      setNcData(data);
    }),
      (e) => {
        console.error('Unable to load ncContent', e);
      };
  }, [locale]);
  useEffect(() => {
    loadECMData();
  }, [locale, loadECMData]);

  useEffect(() => {
    let cc = 'zz';
    let lc = 'en';
    if (country && countrySettings[country.toLocaleLowerCase()]) {
      cc = country.toLocaleLowerCase();
      lc = countrySettings[country.toLocaleLowerCase()].lang;
    }
    resetToWorldWideContent();
    loadContent(cc, lc, (data) => {
      /**
       * @description Do not change content language.
       * Change the checkbox according to the country rule.
       */
      setOptInContent({
        ...data.OptInContent,
        cclc: `${worldWideContent.cc_name}-${worldWideContent.cc_lang}`,
      });
    }),
      (e) => {
        console.error('Unable to load ncContent', e);
      };
  }, [country]);

  /**
   * It checks if the email address is Opt-in (Supressed) the preferences, and if it is, it sets
   * the checkbox to false
   */
  const emailChanged = useCallback(
    (email) => {
      if (prefChange === false) {
        checkPreferencesv3(email).then((response) => {
          if (
            response === 'S' &&
            JSON.stringify(values) !==
              JSON.stringify({
                ...values,
                EMAIL: false,
              })
          ) {
            setFetchedPref(email);
            setValues({
              ...values,
              EMAIL: false,
            });
            onChange('NC_CHECK_EMAIL', false);
            onChange('NC_HIDDEN_EMAIL', null);
          }
        });
      }
    },
    [values, prefChange, onChange]
  );
  const getPostText = useCallback(() => {
    const OptInContent = ncData.OptInContent;
    const OtherPreferences = ncData.OtherPreferences;
    let postText = OptInContent.postText;
    if (termsConditionLink) {
      let originalValue = OtherPreferences.trailPrivacyText;
      const matchedValue = originalValue.match(/<tc>.*<\/tc>/g);
      if (matchedValue) {
        const anrTagHtml = matchedValue[0].replace(/<tc>|<\/tc>/g, '');
        const link = `<a href='${termsConditionLink}' target='_blank' class='ibm-tooltip' >${anrTagHtml}</a>`;
        const reg = new RegExp('<tc>' + anrTagHtml + '</tc>', 'g');
        postText = originalValue.replace(reg, link);
      }
    }
    // replace default privacy link
    try {
      const { cc, lc } = getMappedValue(locale);
      postText = postText.replaceAll(
        'www.ibm.com/privacy/zz/en/',
        `www.ibm.com/${cc}-${lc}/privacy`
      );
    } catch (e) {
      console.log('unable to replace privacy link locale code.');
    }
    const ccLcObject = getMappedValue(locale);
    const cc = ccLcObject.cc;
    const lc = ccLcObject.lc;
    if (country === 'CN' && lc === 'en') {
      return `<p class="nc-gdpr-info">I agree and acknowledge that IBM may share my personal information with IBM affiliates and third parties globally.
         I understand that I can withdraw my marketing consent at any time by submitting an <a href="https://www.ibm.com/account/reg/${cc}-${lc}/signup?formid=urx-42537" target="_blank">opt-out request</a>,
         and also may unsubscribe from receiving marketing emails by clicking the unsubscribe link in each email. More information in IBM’s use and processing of personal information can be found in the <a href="https://www.ibm.com/privacy" target="_blank">IBM Privacy Statement</a>.
         <p class="nc-gdpr-ack">By ticking the above boxes and submitting this form, I have read and understand the above notice and  IBM Privacy Statement.</p>`;
    }
    return postText;
  }, [ncData, country, termsConditionLink, locale]);

  // Email changed
  useEffect(() => {
    if (email) {
      if (email !== fetchedPref) {
        // Handle throttle using debounce approach.
        if (emailRegExp.test(email)) {
          setTimeout(() => {
            emailChanged(email);
          }, 1000);
        }
      }
    } else {
      if (fetchedPref) {
        setFetchedPref('');
      }
    }
  }, [email, emailChanged, fetchedPref]);

  useEffect(() => {
    if (values && !loaded) {
      setLoaded(true);
    }
  }, [values, loaded]);
  useEffect(() => {
    if (ncData) {
      const buildCheckboxes = (OptInContent) => {
        const fieldElements = {};
        const fieldCollections = {
          EMAIL: {
            id: 'EMAIL',
            labelText: getOptionByQuestion('EMAIL', OptInContent)
              .optionTextPost,
          },
          PHONE: {
            id: 'PHONE',
            labelText: getOptionByQuestion('PHONE', OptInContent)
              .optionTextPost,
          },
          POSTAL: {
            id: 'POSTAL',
            labelText: getOptionByQuestion('POSTAL', OptInContent)
              .optionTextPost,
          },
        };
        // by email
        if (questionChoices.indexOf(1) > -1) {
          fieldElements.EMAIL = fieldCollections.EMAIL;
        }
        // by Phone
        if (questionChoices.indexOf(2) > -1) {
          fieldElements.PHONE = fieldCollections.PHONE;
        }
        // by Postal mail
        if (questionChoices.indexOf(3) > -1) {
          fieldElements.POSTAL = fieldCollections.POSTAL;
        }
        return fieldElements;
      };
      try {
        const OptInContent = ncData.OptInContent;
        const newCheckboxes = buildCheckboxes(OptInContent);
        setPreText(OptInContent.preText);
        setPostText(getPostText());
        defaultPreText.current = OptInContent.preText;
        setCheckboxes(newCheckboxes);
      } catch (e) {
        console.log('Unable to build checkboxes', e);
      }
    }
  }, [
    ncData,
    termsConditionLink,
    questionChoices,
    getOptionByQuestion,
    getPostText,
  ]);

  // end of useEffect
  const resetToWorldWideContent = () => {
    try {
      window.NoticeChoice = window.NoticeChoice || {};
      window.NoticeChoice.Content = worldWideContent;
    } catch (e) {
      console.log('unable to set worldWideContent', e);
    }
  };
  const getNcContentFromWindow = () => {
    let Content;
    try {
      Content = window.NoticeChoice.Content;
    } catch (e) {
      Content = worldWideContent;
    }
    return Content;
  };

  const checkBoxChange = (checked, id) => {
    const newValues = {
      ...values,
    };
    newValues[id] = !!checked;
    setValues(newValues);
    setChanged(true);
    setPrefChange(true);
    const fieldName = `NC_CHECK_${id}`;
    const hiddenFieldName = `NC_HIDDEN_${id}`;
    onChange(fieldName, checked);
    onChange(hiddenFieldName, checked ? 'PERMISSION' : 'SUPPRESSION');
  };
  let customPostText = postText;
  const ncHeading = useCallback(() => {
    return (
      <p
        id="ncHeading"
        className={`${prefix}--nc__pre-text`}
        dangerouslySetInnerHTML={{ __html: preText }}
      />
    );
  }, [preText]);
  return featureFlag(
    DDS_NOTICE_CHOICE,
    <section
      data-autoid={`${stablePrefix}--nc`}
      className={`${prefix}--nc ${classNames}`}
    >
      {loaded ? (
        <div>
          {ncHeading()}
          <div className={`${prefix}--checkbox-group`}>
            {checkboxes &&
              Object.keys(checkboxes).length > 0 &&
              Object.keys(checkboxes).map((key) => {
                const checked = values[key];
                return (
                  <span key={key}>
                    <Checkbox
                      {...checkboxes[key]}
                      checked={checked}
                      onChange={checkBoxChange}
                      key={key}
                      className={`${prefix}--nc__checkbox-${key}`}
                    />
                  </span>
                );
              })}
          </div>
          <div
            className={`${prefix}--nc__post-text`}
            dangerouslySetInnerHTML={{ __html: customPostText }}
          />
        </div>
      ) : (
        <>
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
        </>
      )}
      {bpidLegalText && <BPIDLegalText bpidLegalText={bpidLegalText} />}
    </section>
  );
}

NoticeChoice.propTypes = {
  /**
   * locale in a format of counrycode-languagecode example: us-en.
   */
  locale: PropTypes.string.isRequired,
  /**
   * Country value.
   */
  country: PropTypes.string.isRequired,
  /**
   * questionChoices of the widget. Choose from:
   *
   * | Name    | Description                                                                 |
   * | ------- | --------------------------------------------------------------------------- |
   * | `[1]`          | Only email field exist on your form.  |
   * | `[1, 2]`       | form has email and phone number.      |
   * | `[1, 2, 3]`    | email phone and postal code.          |
   */
  questionChoices: PropTypes.array,
  /**
   * Email value.
   * Important! Only change email value prop when the user ends typing the email.
   */
  email: PropTypes.string,
  /**
   * callback function when a value changes
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Custom terms & condition link if applicable. Otherwise default value is https://www.ibm.com/legal
   */
  termsConditionLink: PropTypes.string,
  /**
   * custom class name of the main
   */
  classNames: PropTypes.string,
  /**
   * default values of the chekboxes:
   */
  defaultValues: PropTypes.shape({
    EMAIL: PropTypes.bool,
    PHONE: PropTypes.bool,
    POSTAL: PropTypes.bool,
  }),
  /**
   * enableAllOptIn, only true in some specific cases.
   * if true, then by default all checkexes will be unchecked inrespective of country law.
   */
  enableAllOptIn: PropTypes.bool,
  /**
   * bpidLegalText, applicable when the form data may shared with business partner.
   * bpid should preset in the host page query string.
   * Sample english copy:
   * If you register with IBM for an IBM offering promoted by a business partner site,
   * we may inform them that you registered with us.
   */
  bpidLegalText: PropTypes.string,
};
NoticeChoice.defaultProps = {
  email: '',
  locale: 'en-us',
  onChange: () => {},
  questionChoices: [1],
  classNames: '',
  defaultValues: {},
  enableAllOptIn: false,
  country: 'us',
};
export default NoticeChoice;
