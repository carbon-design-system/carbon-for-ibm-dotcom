/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import NoticeChoice from '../NoticeChoice';
import React from 'react';
import readme from '../README.stories.mdx';

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
const questionChoices = {
  Email: [1],
  'Email + Phone': [1, 2],
  'Email + Phone + Postal': [1, 2, 3],
};
const countryList = {
  'Unites States': 'US',
  Germany: 'DE',
  India: 'IN',
  China: 'CN',
};

const props = () => ({
  locale: select('Locale', locales, 'in-en'),
  country: select('Country', countryList, 'IN'),
  onChange: action('onChange'),
  questionChoices: select('Question Choices', questionChoices, [1, 2]),
  email: text('Email', ''),
  termsConditionLink: text('termsConditionLink', 'https://www.ibm.com/legal'),
  classNames: text('classNames', `custom-class-by-app`),
  enableAllOptIn: boolean('enableAllOptIn', false),
  bpidLegalText: text('bpidLegalText', ''),
});

export default {
  title: 'Components/Notice Choice',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
    propsSet: {
      default: {
        NoticeChoice: {},
      },
    },
  },
};

export const Default = () => {
  return (
    <div className="bx--grid" style={{ marginTop: '2rem' }}>
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-md-8 bx--col-lg-12 bx--offset-lg-2">
          <NoticeChoice {...props()} />
        </div>
      </div>
    </div>
  );
};
