/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { checkPreferencesv3, loadContent } from './services';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import BPIDLegalText from './BPIDLegalText';
import Checkbox from '../../internal/vendor/carbon-components-react/components/Checkbox';
import countrySettings from './country-settings';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { getMappedValue } from './utils';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import SkeletonText from '../../internal/vendor/carbon-components-react/components/SkeletonText';
import worldWideContent from './world-wide-content';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;
const FORM_PATH = 'https://www.ibm.com/account/apis/v2.0/forms';
const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
  // const [termsText, setTermsText] = useState('');
  const [checkboxes, setCheckboxes] = useState();
  const [ncData, setNcData] = useState();
  const [optInContent, setOptInContent] = useState();
  const [prefChange, setPrefChange] = useState(false);
  const [values, setValues] = useState({
    EMAIL: false,
    PHONE: false,
    POSTAL: false,
    NC_HIDDEN_EMAIL: worldWideContent.cc_default_status,
    NC_HIDDEN_PHONE: worldWideContent.cc_default_status,
    NC_HIDDEN_POSTAL: worldWideContent.cc_default_status,
  });
  let defaultPreText = useRef('');

  useEffect(() => {
    if (optInContent) {
      // console.log('*********optInContent', optInContent);
      countryChangeAction();
    }
  }, [optInContent, countryChangeAction]);

  const loadECMData = useCallback(() => {
    let cc = 'zz';
    let lc = 'en';
    const ccLcObject = getMappedValue(locale);
    cc = ccLcObject.cc;
    lc = ccLcObject.lc;

    resetToWorldWideContent();
    loadContent(cc, lc, data => {
      // Sent content language
      setNcData(data);
    }),
      e => {
        console.error('Unable to load ncContent', e);
      };
  }, [locale]);
  useEffect(() => {
    // console.log('*********locale', locale);
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
    loadContent(cc, lc, data => {
      /**
       * @description Do not change content language.
       * Change the checkbox according to the country rule.
       */
      setOptInContent(data.OptInContent);
    }),
      e => {
        console.error('Unable to load ncContent', e);
      };
  }, [country]);

  /**
   * It checks if the email address is Opt-in (Supressed) the preferences, and if it is, it sets
   * the checkbox to false
   */
  const emailChanged = useCallback(
    email => {
      if (prefChange === false) {
        checkPreferencesv3(email).then(response => {
          if (response === 'S') {
            setValues({
              ...values,
              EMAIL: false,
            });
            onChange('NC_CHECK_EMAIL', false);
            onChange('NC_HIDDEN_EMAIL', null);
          } else if (response === 'N') {
            console.log('Calling setDefaultSelections from emailChanged');
            setDefaultSelections();
          }
        });
      }
    },
    [values, prefChange, onChange, setDefaultSelections]
  );
  // Email changed
  useEffect(() => {
    if (email) {
      // Handle throttle using debounce approach.
      if (emailRegExp.test(email)) {
        setTimeout(() => {
          console.log('*********email', email);
          emailChanged(email);
        }, 1000);
      }
    }
  }, [email, emailChanged]);

  //TODO need to fund why required. Following useEffect required to make default selection.
  // useEffect(() => {
  //   // const previousKeys = previousCheckboxes && Object.keys(previousCheckboxes);
  //   // const currentKeys = checkboxes && Object.keys(checkboxes);
  //     // if (!isEqual(previousKeys, currentKeys)) {
  //     if(checkboxes){
  //       console.log('Calling setDefaultSelections from checkboxesUseEffect');
  //       console.log('*********checkboxes', checkboxes);
  //       setDefaultSelections();
  //     }
  // }, [checkboxes, setDefaultSelections]);

  useEffect(() => {
    if (values && !loaded) {
      // console.log('*********values', values);
      setLoaded(true);
    }
  }, [values, loaded]);
  useEffect(() => {
    // if (!isEqual(previousNcData, ncData)) {
    // createElements();
    if (ncData) {
      // console.log('*********ncData', ncData);
      const buildCheckboxes = OptInContent => {
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
        // console.error('OptInContent....', OptInContent);
        const newCheckboxes = buildCheckboxes(OptInContent);
        setPreText(OptInContent.preText);
        setPostText(getPostText());
        defaultPreText.current = OptInContent.preText;
        setCheckboxes(newCheckboxes);
        //TODO check if possible to call it from here
        // setDefaultSelections();
      } catch (e) {
        console.log('Unable to build checkboxes', e);
      }
    }
    // }
  }, [
    ncData,
    termsConditionLink,
    questionChoices,
    getOptionByQuestion,
    getPostText,
  ]);

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
    return postText;
  }, [ncData, termsConditionLink, locale]);

  // end of useEffect
  const resetToWorldWideContent = () => {
    try {
      // console.log('worldWideContent', worldWideContent)
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
      Object.keys(checkboxes).forEach(key => {
        const option = getOptionByQuestion(key, optInContent);
        newValues[key] = !!(
          option.checked === 'true' || option.checked === true
        );
        // console.log('option', option)
        if (Object.prototype.hasOwnProperty.call(defaultValues, key)) {
          newValues[key] = defaultValues[key];
        }
        const fieldName = `NC_CHECK_${key}`;
        const hiddenFieldName = `NC_HIDDEN_${key}`;
        onChange(fieldName, newValues[key]);
        onChange(hiddenFieldName, newValues[key] ? 'OPT_IN' : null);
      });
      // console.log('*********setDefaultSelectionsCalled..', newValues)
      setValues(newValues);
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
    if (!changed) {
      /**
       * @description
       * change checkbox checked option based on new country.
       */
      // console.log('Calling setDefaultSelections from countryChangeAction');
      setDefaultSelections();
    }
  }, [locale, changed, setDefaultSelections]);
  const checkBoxChange = (checked, id) => {
    // event.preventDefault();
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
  if (
    FORM_PATH.indexOf('https://urxapistage.urx.origins.ibm.net') > -1 ||
    FORM_PATH.indexOf('https://wwwstage.ibm.com') > -1
  ) {
    customPostText = customPostText.replace(
      `https://www.ibm.com/account/reg/`,
      `https://wwwstage.ibm.com/account/reg/`
    );
    customPostText = customPostText.replace(`urx-42537`, `urx-33276`);
  }
  const ncHeading = useCallback(() => {
    return (
      <p
        id="ncHeading"
        className={`${prefix}--nc__pre-text`}
        dangerouslySetInnerHTML={{ __html: preText }}
      />
    );
  }, [preText]);
  return (
    <section
      data-autoid={`${stablePrefix}--nc`}
      className={`${prefix}--nc ${classNames}`}>
      {loaded ? (
        <div>
          {ncHeading()}
          <div className={`${prefix}--checkbox-group`}>
            {checkboxes &&
              Object.keys(checkboxes).length > 0 &&
              Object.keys(checkboxes).map(key => {
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
  enableAllOptIn: PropTypes.oneOf([true, false]),
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
export { default as updateECM } from './services';
