/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';

import { select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { html } from 'lit';
import readme from './README.stories.mdx';

const questionChoices = {
  Email: '1',
  'Email + Phone': '1,2',
};
const languages = {
  'English [en]': 'en',
  'Arabic  [ar]': 'ar',
  'Arabic (Qatar) [qa-ar]': 'qa-ar',
  'Chinese (PRC) [zh-cn]': 'zh-cn',
  'Chinese (Taiwan) [zh-tw]': 'zh-tw',
  'French [fr]': 'fr',
  'German [de]': 'de',
  'Greek [el]': 'el',
  'Hebrew [he]': 'he',
  'Hungarian [hu]': 'hu',
  'Indonesian [id]': 'id',
  'Italian [it]': 'it',
  'Japanese [ja]': 'ja',
  'Korean [ko]': 'ko',
  'Malaysian [ms]': 'ms',
  'Polish [pl]': 'pl',
  'Portuguese [pt]': 'pt',
  'Portuguese (Brazil)': 'pt-br',
  'Slovenian [sl]': 'sl',
  'Spanish [es]': 'es',
  'Spanish-Latin America [es-la]': 'es-la',
  'Spanish (Mexico)': 'es-MX',
  'Turkish [tr]': 'tr',
  'Ukrainian [uk]': 'uk',
};
const countryList = {
  'United States': 'US',
  Germany: 'DE',
  India: 'IN',
  China: 'CN',
  Japan: 'JP',
  'Korea, Republic of': 'KR',
};
const stateList = {
  US: {
    Unknown: '',
    Alabama: 'AL',
    California: 'CA',
  },
  IN: {
    Unknown: '',
    Karnataka: 'KA',
    Delhi: 'DL',
  },
  CN: {
    Unknown: '',
    'Beijing Shi': 'BJ',
    'Hong Kong': 'HK',
  },
  JP: {
    Unknown: '',
    Kyoto: '26',
    Mie: '27',
  },
  KR: {
    Unknown: '',
    Sejong: '50',
    'Daegu-gwangyeoksi': '27',
  },
  DE: {
    Unknown: '',
    Hamburg: 'HU',
    Sachsen: 'SN',
  },
};
const hideErrorMessages = {
  True: 'true',
  False: 'false',
};

const environment = {
  Production: 'prod',
  Stage: 'stage',
};

const onChange = (event: CustomEvent) => {
  console.log(`[${event.type}] :`, event.detail);
};

const onEmailStatusChanged = (events: CustomEvent) => {
  console.log(`[${events.type}] :`, events.detail);
};

const formType = {
  marketing: 'marketing',
  newsletter: 'newsletter',
};

const props = () => {
  const selectedCountry = select('Country', countryList, 'US');
  let availableStates = stateList[selectedCountry] || [{ Unknown: '' }];

  return {
    language: select('Language', languages, 'en'),
    country: selectedCountry,
    state: select('State', availableStates, ''),
    questionchoices: select('Question Choices', questionChoices, '1,2'),
    termsConditionLink: text(
      'Terms & Condition Link',
      'https://www.ibm.com/legal'
    ),
    onChange: action('c4d-notice-choice-change'),
    onEmailStatusChanged: action('c4d-notice-choice-email-status-changed'),
    hideErrorMessages: select(
      'Hide Error Messages',
      hideErrorMessages,
      'false'
    ),
    environment: select('Environment', environment, 'stage'),
    email: text('Email', ''),
    formType: select('Form Type', formType, 'marketing'),
  };
};

export const Default = (args) => {
  const {
    language,
    country,
    state,
    termsConditionLink,
    questionchoices,
    hideErrorMessages,
    enableAllOptIn,
    hiddenEmail,
    hiddenPhone,
    ncTeleDetail,
    ncEmailDetail,
    environment,
    email,
    formType,
  } = args?.NoticeChoice ?? {};
  return html`
    <c4d-notice-choice
      language="${language}"
      country="${country}"
      email="${email || ''}"
      question-choices="${questionchoices}"
      state="${state}"
      terms-condition-link="${termsConditionLink || ''}"
      hide-error-message="${hideErrorMessages}"
      ?enable-all-opt-in=${enableAllOptIn}
      .hiddenEmail="${hiddenEmail}"
      .hiddenPhone="${hiddenPhone}"
      .nc-tele-detail="${ncTeleDetail}"
      .nc-email-detail="${ncEmailDetail}"
      environment="${environment}"
      form-type="${formType}"
      @c4d-notice-choice-change=${onChange}
      @c4d-notice-choice-email-status-changed=${onEmailStatusChanged}>
    </c4d-notice-choice>
  `;
};

export default {
  title: 'IBM components/Notice Choice',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div
            class="cds--col-sm-4 cds--col-md-8 cds--col-lg-12 cds--offset-lg-2">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    percy: {
      skip: true,
    },
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      NoticeChoice: () => props(),
    },
    propsSet: {
      default: {
        NoticeChoice: {
          'question-choices': [1, 2],
        },
      },
    },
  },
};
