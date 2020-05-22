/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import inPercy from '@percy-io/in-percy';
import localeData from '../__data__/locale-data.json';
import LocaleModal from '../LocaleModal';
import React from 'react';
import readme from '../README.md';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Components|Locale Modal',
  decorators: [withKnobs],

  parameters: {
    readme: {
      sidebar: readme,
    },
  },
};

export const Default = () => {
  return (
    <LocaleModal
      isOpen={true}
      localeData={inPercy() ? localeData : null}
      localeDisplay={inPercy() ? 'United States - English' : null}
    />
  );
};

