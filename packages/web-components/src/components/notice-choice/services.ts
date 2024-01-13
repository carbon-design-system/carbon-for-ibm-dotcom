/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function loadContent(locale: string, onSuccess: any, onError: any) {
  const script = document.createElement('script');
  script.async = false;
  script.charset = 'utf-8';
  script.src = `https://www.ibm.com/common/translations/notice/v23/${locale.toLocaleLowerCase()}/ncContent_v23.js`; // URL for the third-party library being loaded.
  document.body.appendChild(script);
  script.onload = () => {
    try {
      if (onSuccess) {
        onSuccess(window.NoticeChoice.Content);
      }
    } catch (e) {
      if (onError) {
        onError(e);
      }
    }
  };
  script.onerror = () => {
    if (onError) {
      onError();
    }
  };
}

export function loadSettings(onSuccess: any, onError: any) {
  const script = document.createElement('script');
  script.async = false;
  script.charset = 'utf-8';
  script.src = `https://1.www.s81c.com/common/noticechoice/settings.js`; // URL for the third-party library being loaded.
  document.body.appendChild(script);
  script.onload = () => {
    try {
      if (onSuccess) {
        onSuccess(window.NoticeChoice.settings?.preferences);
      }
    } catch (e) {
      if (onError) {
        onError(e);
      }
    }
  };
  script.onerror = () => {
    if (onError) {
      onError();
    }
  };
}
