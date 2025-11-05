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

export function processCustomText(customNoticeText: {
  text?: string;
  optOutLink?: string;
  psLink?: string;
}) {
  if (
    !customNoticeText?.text ||
    !customNoticeText?.optOutLink ||
    !customNoticeText?.psLink
  ) {
    return '';
  }

  let preText = customNoticeText.text;

  preText = preText
    .replace(
      /<optout>(.*?)<\/optout>/g,
      `<span id="optout">
        <a href="${customNoticeText.optOutLink}" part="nc-opt-out" target="_blank">$1</a>
      </span>`
    )
    .replace(
      /<ps>(.*?)<\/ps>/g,
      `<span id="ps">
        <a href="${customNoticeText.psLink}" 
           part="nc-privacy-statement" 
           target="_blank" 
           aria-label="$1 (opens in new tab)" 
           class="cds-inline">$1</a>
      </span>`
    );

  return preText;
}
