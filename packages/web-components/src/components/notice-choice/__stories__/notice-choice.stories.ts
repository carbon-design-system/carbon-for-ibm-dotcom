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

const props = () => ({
  locale: select('Locale', locales, 'in-en'),
  country: select('Country', countryList, 'US'),
  state: select('State', stateList, ''),
  questionchoices: select('Question Choices', questionChoices, '1,2'),
  email: text('Email', ''),
  termsConditionLink: text('termsConditionLink', 'https://www.ibm.com/legal'),
  bpidLegalText: text('bpidLegalText', ''),
  onchange: (name, value) => {
    console.log('onchange Callback ', name, value);
  },
});

export const Default = (args) => {
  const {
    locale,
    country,
    state,
    onchange,
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
      questionchoices="${questionchoices}"
      state="${state}"
      email=${email}
      termsConditionLink="${termsConditionLink}"
      ?enableAllOptIn=${enableAllOptIn}
      bpidLegalText="${bpidLegalText}"
      .onchange=${onchange}></dds-notice-choice>
  `;
};

export default {
  title: 'Components/Notice Choice',
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div
            class="bx--col-sm-4 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
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
          questionchoices: [1, 2],
        },
      },
    },
  },
};
