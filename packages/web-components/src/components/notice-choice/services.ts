/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function loadContent(
  locale: string,
  env: string,
  onSuccess: any,
  onError: any
) {
  const script = document.createElement('script');
  const environment = env === 'prod' ? '1.www.s81c.com' : '1.wwwstage.s81c.com';
  script.async = false;
  script.charset = 'utf-8';
  script.src = `https://${environment}/common/translations/notice/v23/${locale.toLocaleLowerCase()}/ncContent_v23.js`; // URL for the third-party library being loaded.
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

export function loadSettings(env: string, onSuccess: any, onError: any) {
  const script = document.createElement('script');
  const environment = env === 'prod' ? '1.www.s81c.com' : '1.wwwstage.s81c.com';
  script.async = false;
  script.charset = 'utf-8';
  script.src = `https://${environment}/common/noticechoice/settings.js`; // URL for the third-party library being loaded.
  document.body.appendChild(script);
  script.onload = () => {
    try {
      if (onSuccess) {
        onSuccess(window.NoticeChoice.settings);
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

export function checkEmailStatus(
  email: string,
  env: string,
  onSuccess: (data: any) => void,
  onError: (err?: any) => void
) {
  const environment = env === 'prod' ? 'www.ibm.com' : 'wwwstage.ibm.com';
  const url = `https://${environment}/account/apis/v2.0/preference/get`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }), // sending email in request body
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      console.error('Error checking email status:', err);

      onError(err);
    });
}
