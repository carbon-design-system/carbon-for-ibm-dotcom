/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean } from '@storybook/addon-knobs';
import { DDS_USE_WEB_COMPONENTS_REACT } from '../../../internal/FeatureFlags';
import inPercy from '@percy-io/in-percy';
import localeData from '../__data__/locale-data.json';
import LocaleModal from '../LocaleModal';
import React from 'react';
import readme from '../README.stories.mdx';
import reducers from '@carbon/ibmdotcom-web-components/es/globals/services-store/reducers';
import store from '@carbon/ibmdotcom-web-components/es/globals/services-store/store';

store.replaceReducer(reducers);

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
  return DDS_USE_WEB_COMPONENTS_REACT ? (
    <LocaleModal
      open
      langDisplay={useMockData ? 'United States - English' : null}
      localeList={useMockData ? localeData.localeList : null}
    />
  ) : (
    <LocaleModal
      isOpen={true}
      localeData={useMockData ? localeData : null}
      localeDisplay={useMockData ? 'United States - English' : null}
    />
  );
};
