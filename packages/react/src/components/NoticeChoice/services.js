/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { apiPath, URX_PWS_LOOKUP, URX_PWS_LOOKUP_V3 } from './api-path';

import axios from 'axios';

export function transformEmailPreference(NC_HIDDEN_EMAIL) {
  if (NC_HIDDEN_EMAIL === 'PERMISSION') {
    return 'OPT_IN';
  } else if (NC_HIDDEN_EMAIL === 'SUPPRESSION') {
    return 'OPT_OUT';
  } else {
    return 'UNCHANGED';
  }
}
export default function services(formData, timeout = 10000) {
  return Promise.resolve({
    status: 'Success',
    formData,
    timeout,
  });
}
export function checkPreferencesv3(emailAddress) {
  const endpoint = apiPath(URX_PWS_LOOKUP_V3);
  return new Promise((resolve, reject) => {
    if (emailAddress && emailAddress.indexOf('*****') > -1) {
      resolve('N');
    } else {
      // debounce((emailAddress) => {
      axios
        .get(endpoint, {
          params: { emailAddress },
        })
        .then(response => {
          resolve(response.data ? response.data.email : 'N');
        })
        .catch(error => {
          console.error(error); // eslint-disable-line no-console
          reject('N');
        });
      // }, 500)
    }
  });
}
export function checkPreferences(postData) {
  return new Promise((resolve, reject) => {
    axios
      .get(URX_PWS_LOOKUP, {
        params: postData,
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        reject(error);
      });
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
