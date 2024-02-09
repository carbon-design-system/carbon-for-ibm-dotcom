/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */


declare global {
  interface Window {
    NoticeChoice: any;
  }
}


export function getNcContentFromWindow() {
  let content: any;
  try {
    content = window.NoticeChoice.Content;
  } catch (e) {
    content = {};
  }
  return content;
}
export function resetToWorldWideContent() {
  try {
    window.NoticeChoice = window.NoticeChoice || {};
    window.NoticeChoice = window.NoticeChoice || {};
   
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
      EMAIL_CU: 'CU',
      EMAIL_CC: 'CC',
      EMAIL_UU: 'UU',
      EMAIL_UC: 'UC',
      PHONE_CU: 'CU',
      PHONE_CC: 'CC',
      PHONE_UC: 'UC',
      PHONE_UU: 'UU',
    }[value] || null
  );
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
