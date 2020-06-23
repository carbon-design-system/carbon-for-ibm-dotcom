/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import LocaleButton from '../LocaleButton';
import React from 'react';
import { shallow } from 'enzyme';

jest.mock('@carbon/ibmdotcom-services/lib/services/Locale/Locale', () => ({
  getLocale: jest.fn(() => Promise.resolve({ cc: 'us', lc: 'en' })),
  getList: jest.fn(() => Promise.resolve({})),
}));

describe('<LocaleButton />', () => {
  it('opens and closes the modal', () => {
    const localeBtn = shallow(<LocaleButton />);

    expect(
      localeBtn.html().indexOf('data-autoid="dds--locale-modal"') !== -1
    ).toBe(false);

    // simulates opening modal
    localeBtn.find('.bx--locale-btn').simulate('click');

    expect(
      localeBtn.html().indexOf('data-autoid="dds--locale-modal"') !== -1
    ).toBe(true);
  });
});
