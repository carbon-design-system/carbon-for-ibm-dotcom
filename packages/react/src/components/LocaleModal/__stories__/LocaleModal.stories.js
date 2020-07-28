/**
 * Copyright IBM Corp. 2016, 2020
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
  title: 'Components|Locale Modal',

  parameters: {
    ...readme.parameters,
    knobs: {
      LocaleModal: () => ({
        useMockData: boolean('Use mock data', inPercy()),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { useMockData } = parameters?.props?.LocaleModal ?? {};
  return (
    <LocaleModal
      isOpen={true}
      localeData={useMockData ? localeData : null}
      localeDisplay={useMockData ? 'United States - English' : null}
    />
  );
};
