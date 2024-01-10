/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ccLcMap } from './cc-lc-map';
import { worldWideContent } from './world-wide-content';

export const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

declare global {
  interface Window {
    NoticeChoice: any;
  }
}

export function getMappedValue(locale) {
  let ccLcValue = {
    cc: 'us',
    lc: 'en',
  };
  if (Object.prototype.isPrototypeOf.call(ccLcMap, locale)) {
    ccLcValue = ccLcMap[locale];
  } else if (locale.indexOf('-') > -1) {
    const splitValue = locale.split('-', 2);
    ccLcValue = {
      cc: splitValue[0],
      lc: splitValue[1],
    };
  }
  return ccLcValue;
}
export function getNcContentFromWindow() {
  let content: any;
  try {
    content = window.NoticeChoice.Content;
  } catch (e) {
    content = worldWideContent;
  }
  return content;
}
export function resetToWorldWideContent() {
  try {
    window.NoticeChoice = window.NoticeChoice || {};
    window.NoticeChoice = window.NoticeChoice || {};
    window.NoticeChoice.content = worldWideContent;
  } catch (e) {
    console.log('unable to set worldWideContent', e);
  }
}
export function pwsValueMap(value) {
  return (
    {
      OPT_IN: 'yes',
      OPT_OUT: 'no',
      PERMISSION: 'yes',
      SUPPRESSION: 'no',
      formSubmissionYes: 'false',
      formSubmissionNo: 'true',
      countyBasedCheckedYes: 'true',
      countyBasedCheckedNo: 'false',
      NC_HIDDEN_PERMISSION: 'PERMISSION',
      NC_HIDDEN_SUPPRESSION: 'SUPPRESSION',
    }[value] || null
  );
}

export function specialCountryBasedText(countryCode) {
  const countryBasedText = {
    cn: 'chinaPIPLtext',
  };
  return countryBasedText[countryCode.toLocaleLowerCase()];
}

export function supportedLanguages(language) {
  const languageMapping = {
    en: 'en',
    fr: 'fr',
    'zh-cn': 'zh-cn',
    zh: 'zh-cn',
    de: 'de',
    id: 'id',
    it: 'it',
    ja: 'ja',
    ko: 'ko',
    pt: 'pt',
    'es-la': 'es-la',
    es: 'es',
    ar: 'ar',
    'zh-tw': 'zh-tw',
    'es-es': 'es',
    el: 'el',
    hu: 'hu',
    he: 'he',
    ms: 'ms',
    pl: 'pl',
    sl: 'sl',
    tr: 'tr',
    uk: 'uk',
    bg: 'bg',
    cs: 'cs',
    da: 'da',
    et: 'et',
    fi: 'fi',
    hr: 'hr',
    lt: 'lt',
    lv: 'lv',
    nl: 'nl',
    no: 'no',
    ro: 'ro',
    sk: 'sk',
    sr: 'sr',
    vi: 'vi',
  };
  return languageMapping[language.toLocaleLowerCase()];
}
