/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
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
  'Arabic [ar]': 'ar',
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
  'Unites States': 'US',
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
  true: 'true',
  false: 'false',
};
const onChange = (event: CustomEvent) => {
  console.log(event.detail);
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
    hideErrorMessages: select(
      'Hide Error Messages',
      hideErrorMessages,
      'false'
    ),
  };
};

console.log(props);

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
  } = args?.NoticeChoice ?? {};
  return html`
    <c4d-notice-choice
      language="${language}"
      country="${country}"
      question-choices="${questionchoices}"
      state="${state}"
      terms-condition-link="${termsConditionLink || ''}"
      hide-error-message="${hideErrorMessages}"
      ?enable-all-opt-in=${enableAllOptIn}
      .hiddenEmail="${hiddenEmail}"
      .hiddenPhone="${hiddenPhone}"
      .nc-tele-detail="${ncTeleDetail}"
      .nc-email-detail="${ncEmailDetail}"
      @c4d-notice-choice-change=${onChange}></c4d-notice-choice>
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
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      NoticeChoice: () => props(),
    },
    propsSet: {
      default: {
        NoticeChoice: {
          'question-choices': [1, 2],
          onChange: 'c4d-notice-choice-change',
        },
      },
    },
  },
};
