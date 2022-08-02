/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const worldWideContent = {
  cc_name: 'zz',
  cc_lang: 'en',
  cc_default_status: 'OPT_IN',
  OptInContent: {
    preText:
      'IBM may use my contact data to keep me informed of products, services and offerings:',
    oneQuestionApp: [
      {
        id: '0',
        optionTextPre: '',
        checked: 'false',
        optionTextPost:
          'IBM may use my contact data to keep me informed by email of products, services and offerings',
      },
    ],
    twoQuestionApp: [
      {
        id: '0',
        optionTextPre: '',
        checked: 'false',
        optionTextPost: 'by email',
      },
      {
        id: '4',
        optionTextPre: '',
        checked: 'true',
        optionTextPost: 'by telephone or postal mail.',
      },
    ],
    fourQuestionApp: [
      {
        id: '0',
        optionTextPre: '',
        checked: 'false',
        optionTextPost: 'by email.',
      },
      {
        id: '1',
        optionTextPre: '',
        checked: 'false',
        optionTextPost: 'by telephone.',
      },
      {
        id: '2',
        optionTextPre: '',
        checked: 'true',
        optionTextPost: 'by postal mail.',
      },
      {
        id: '3',
        optionTextPre: '',
        checked: 'hidden',
        optionTextPost: '',
      },
    ],
    postText:
      '<p class="nc-gdpr-info">You can withdraw your marketing consent at any time by submitting an <a href="https://www.ibm.com/account/reg/signup?formid=urx-33276" target="_blank">opt-out request</a>. Also you may unsubscribe from receiving marketing emails by clicking the unsubscribe link in each email.</p><p class="nc-gdpr-ack">More information on our processing can be found in the <a href="https://www.ibm.com/privacy/zz/en/" target="_blank">IBM Privacy Statement.</a> By submitting this form, I acknowledge that I have read and understand the IBM Privacy Statement.</p>',
  },

  GranularPreference: {
    GranularEmailText:
      'Please keep me informed by email of products, services and offerings from IBM companies worldwide.  Check the boxes below to receive more information about:',
    GranularText:
      'Please keep me informed of products, services and offerings from IBM companies worldwide.  Check the boxes below to receive more information about:',
    EnglishGranularText: '',
  },
  OtherPreferences: {
    allIBMNotice:
      'I would also like to receive information about other IBM products.',
    englishNoticeText: '',
    allIBMNoticeChecked: 'false',
    noMediaErrorTextt:
      'You have selected a product category, please select your preferred media choice.',
    mediaChoice: 'Please tell us how you would like to be contacted.',
    trailPrivacyText:
      '<p class="nc-gdpr-info">You can withdraw your marketing consent at any time by submitting an <a href="https://www.ibm.com/account/reg/signup?formid=urx-33276" target="_blank">opt-out request</a>. Also you may unsubscribe from receiving marketing emails by clicking the unsubscribe link in each email.</p><p class="nc-gdpr-ack">More information on our processing can be found in the <a href="https://www.ibm.com/privacy/zz/en/" target="_blank">IBM Privacy Statement</a>. By submitting this form, I acknowledge that I have read and understand the IBM Privacy Statement.</p><p>I accept the product <tc>Terms and Conditions</tc> of this registration form. </p>',
  },
};
export default worldWideContent;
