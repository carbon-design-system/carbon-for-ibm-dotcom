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
import { html } from 'lit-element';
import readme from './README.stories.mdx';

const questionChoices = {
  Email: '1',
  'Email + Phone': '1,2',
  'Email + Phone + Postal': '1,2,3',
};
const locales = {
  'United States English': 'us-en',
  'fr-fr': 'fr-fr',
  'ca-fr': 'ca-fr',
  'br-pt': 'br-pt',
  'it-it': 'it-it',
  'pl-pl': 'pl-pl',
  'cn-zh': 'cn-zh',
  'ru-ru': 'ru-ru',
  'kr-ko': 'kr-ko',
  'jp-ja': 'jp-ja',
  'de-de': 'de-de',
  'tw-zh': 'tw-zh',
  'tr-tr': 'tr-tr',
  'in-en': 'in-en',
};
const countryList = {
  'Unites States': 'US',
  Germany: 'DE',
  India: 'IN',
  China: 'CN',
  Japan: 'JP',
};
const stateList = {
  Unknown: '',
  Alabama: 'AL',
  California: 'CA',
};
const onChange = (event: CustomEvent) => {
  console.log(event.detail);
};
const props = () => ({
  locale: select('Locale', locales, 'in-en'),
  country: select('Country', countryList, 'US'),
  state: select('State', stateList, ''),
  questionchoices: select('Question Choices', questionChoices, '1,2'),
  email: text('Email', ''),
  termsConditionLink: text(
    'Terms & Condition Link',
    'https://www.ibm.com/legal'
  ),
  bpidLegalText: text('BPID Legal Text', ''),
  onChange: action('dds-notice-choice-change'),
});

export const Default = (args) => {
  const {
    locale,
    country,
    state,
    email,
    termsConditionLink,
    questionchoices,
    enableAllOptIn,
    bpidLegalText,
  } = args?.NoticeChoice ?? {};
  return html`
    <dds-notice-choice
      locale="${locale}"
      country="${country}"
      question-choices="${questionchoices}"
      state="${state}"
      email=${email}
      terms-condition-link="${termsConditionLink}"
      ?enable-all-opt-in=${enableAllOptIn}
      bpid-legal-text="${bpidLegalText}"
      @dds-notice-choice-change=${onChange}></dds-notice-choice>
  `;
};

export default {
  title: 'Components/Notice Choice',
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-md-8 bx--col-lg-12 bx--offset-lg-2">
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
          onChange: 'dds-notice-choice-change',
        },
      },
    },
  },
};
