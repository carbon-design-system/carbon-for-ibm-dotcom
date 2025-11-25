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
      EMAIL_NOTICE_ONLY: 'NOTICE_ONLY',
      PHONE_NOTICE_ONLY: 'NOTICE_ONLY',
      NC_HIDDEN_PHONE_NONE: 'N',
    }[value] || null
  );
}

export function defaultCountrySettings() {
  return {
    email: 'opt-in',
    phone: 'opt-in',
  } as const;
}

export function processCustomText(
  input:
    | string
    | {
        text?: string;
        optOutLink?: string;
        psLink?: string;
        ccpaLink?: string;
      }
) {
  const {
    text = '',
    optOutLink = '',
    psLink = '',
    ccpaLink = '',
  } = typeof input === 'string' ? { text: input } : input ?? {};

  const linkMap = [
    { tag: 'optout', link: optOutLink, part: 'nc-opt-out' },
    { tag: 'ps', link: psLink, part: 'nc-privacy-statement' },
    { tag: 'ccpa', link: ccpaLink, part: 'nc-ccpa-link' },
  ];

  let result = text;

  for (const { tag, link, part } of linkMap) {
    const regex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'gi');
    result = result.replace(regex, (_match, inner) =>
      link && link.trim() !== ''
        ? `<a href="${link}" part="${part}" target="_blank" aria-label="${inner} (opens in new tab)" class="cds-inline">${inner}</a>`
        : inner
    );
  }

  return result;
}
