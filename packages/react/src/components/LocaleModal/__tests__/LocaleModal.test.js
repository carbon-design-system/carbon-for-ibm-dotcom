/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act } from 'react-dom/test-utils';
import { altlangs } from '@carbon/ibmdotcom-utilities';
import { LocaleAPI } from '@carbon/ibmdotcom-services';
import LocaleModal from '../LocaleModal';
import React from 'react';
import ReactDOM from 'react-dom';

const pageLangs = altlangs();

const MOCK_DATA = {
  pageLangs: pageLangs,
};

jest.mock('@carbon/ibmdotcom-services', () => ({
  LocaleAPI: {
    getLocale: jest.fn(() => Promise.resolve({ cc: 'us', lc: 'en' })),
    getList: jest.fn(() => Promise.resolve({})),
    pageLangs: jest.fn(() => Promise.resolve(MOCK_DATA)),
  },
}));

describe('<LocaleModal />', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('renders with everything as expected', async () => {
    await act(async () => {
      await ReactDOM.render(<LocaleModal />, container);
    });

    const localeModal = container.querySelector('.bx--locale-modal');

    expect(LocaleAPI.getLocale).toHaveBeenCalledTimes(1);
    expect(LocaleAPI.getList).toHaveBeenCalledTimes(1);
    expect(localeModal.querySelectorAll('.bx--card')).toHaveLength(4);
    expect(
      localeModal.querySelectorAll('.bx--locale-modal__filter')
    ).toHaveLength(1);
    expect(
      localeModal.querySelectorAll('.bx--locale-modal__locales')
    ).toHaveLength(MOCK_DATA.pageLangs.length);
  });
});
