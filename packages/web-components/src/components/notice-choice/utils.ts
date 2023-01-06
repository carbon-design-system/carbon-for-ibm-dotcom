/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CcLcMap } from './cc-lc-map';
import { worldWideContent } from './world-wide-content';

export const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

declare global {
  interface Window {
    NoticeChoice: any;
  }
}

export function getMappedValue(locale) {
  let CcLcValue = {
    cc: 'us',
    lc: 'en',
  };
  if (Object.prototype.isPrototypeOf.call(CcLcMap, locale)) {
    CcLcValue = CcLcMap[locale];
  } else if (locale.indexOf('-') > -1) {
    const splitValue = locale.split('-', 2);
    CcLcValue = {
      cc: splitValue[0],
      lc: splitValue[1],
    };
  }
  return CcLcValue;
}
export function getNcContentFromWindow() {
  let Content: any;
  try {
    Content = window.NoticeChoice.Content;
  } catch (e) {
    Content = worldWideContent;
  }
  return Content;
}
export function resetToWorldWideContent() {
  try {
    window.NoticeChoice = window.NoticeChoice || {};
    window.NoticeChoice = window.NoticeChoice || {};
    window.NoticeChoice.Content = worldWideContent;
  } catch (e) {
    console.log('unable to set worldWideContent', e);
  }
}
