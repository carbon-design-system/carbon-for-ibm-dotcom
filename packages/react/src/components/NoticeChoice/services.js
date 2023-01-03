/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import axios from 'axios';

export function checkPreferencesv3(emailAddress) {
  const endpoint = `https://www.ibm.com/account/apis/v2.0/pws/V3.0/lookup`;
  return new Promise((resolve, reject) => {
    if (emailAddress && emailAddress.indexOf('*****') > -1) {
      resolve('N');
    } else {
      axios
        .get(endpoint, {
          params: { emailAddress },
        })
        .then((response) => {
          resolve(response.data ? response.data.email : 'N');
        })
        .catch((error) => {
          console.error(error); // eslint-disable-line no-console
          reject('N');
        });
    }
  });
}
export function loadContent(cc, lc, onSuccess = () => {}, onError = () => {}) {
  const script = document.createElement('script');
  script.async = false;
  script.charset = 'utf-8';
  script.src = `https://www.ibm.com/common/translations/notice/${cc}/${lc}/ncContent_v18.js`; // URL for the third-party library being loaded.
  document.body.appendChild(script);
  script.onload = () => {
    try {
      if (onSuccess) onSuccess(window.NoticeChoice.Content);
    } catch (e) {
      if (onError) onError(e);
    }
  };
  script.onerror = () => {
    if (onError) onError();
  };
}
