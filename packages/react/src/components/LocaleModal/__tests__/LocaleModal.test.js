/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import LocaleModal from '../LocaleModal';
import { mount } from 'enzyme';
import React from 'react';

const localeData = {
  regionList: [
    {
      name: 'Test land',
      key: '0',
      countryList: ['0', 'Test Land'],
    },
  ],
  localeModal: {
    headerTitle: 'headerTitle',
    modalClose: 'modalClose',
    searchLabel: 'searchLabel',
    searchClearText: 'searchClearText',
    searchPlaceholder: 'searchPlaceholder',
    availabilityText: 'availabilityText',
    unavailabilityText: 'unavailabilityText',
  },
};

const localeDisplay = 'Testing';

const setup = () =>
  new Promise(resolve => {
    const wrapper = mount(
      <LocaleModal localeData={localeData} localeDisplay={localeDisplay} />
    );
    setTimeout(() => resolve(wrapper), 3000);
  });

describe('LocaleModal', () => {
  it('Renders properly', async () => {
    const wrapper = await setup();
    console.log(wrapper.debug());
  });
});
