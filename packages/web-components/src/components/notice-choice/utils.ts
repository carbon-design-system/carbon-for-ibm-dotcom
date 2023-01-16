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
    }[value] || null
  );
}
