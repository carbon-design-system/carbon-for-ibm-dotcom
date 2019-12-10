/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { shallow } from 'enzyme';
import LocaleButton from '../LocaleButton';
import { ComposedModal } from 'carbon-components-react';
import mocklist from '../__data__/locale-list.json';

jest.mock('@carbon/ibmdotcom-services', () => ({
  LocaleAPI: {
    getLocale: jest.fn(() => Promise.resolve({ cc: 'us', lc: 'en' })),
    getList: jest.fn(() => Promise.resolve(mocklist)),
  },
}));

describe('<LocaleButton />', () => {
  it('opens and closes the modal', () => {
    const localeBtn = shallow(<LocaleButton />);

    // initial state should be closed
    expect(localeBtn.find(ComposedModal).prop('open')).toBe(false);

    // simulates opening modal
    localeBtn.find('.bx--locale-btn').simulate('click');
    expect(localeBtn.find(ComposedModal).prop('open')).toBe(true);

    // simulates closing modal
    localeBtn.find(ComposedModal).invoke('onClose')();
    expect(localeBtn.find(ComposedModal).prop('open')).toBe(false);
  });
});
