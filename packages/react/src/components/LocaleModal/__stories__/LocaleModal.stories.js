/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean } from '@storybook/addon-knobs';
import inPercy from '@percy-io/in-percy';
import localeData from '../__data__/locale-data.json';
import LocaleModal from '../LocaleModal';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components/Locale modal',
  parameters: {
    ...readme.parameters,
    percy: {
      name: 'Components|Locale modal: Default',
    },
  },
};

const props = () => ({
  useMockData: boolean('Use mock data', inPercy()),
});

export const Default = () => {
  return (
    <LocaleModal
      isOpen
      localeData={props().useMockData ? localeData : null}
      localeDisplay={props().useMockData ? 'United States - English' : null}
    />
  );
};
