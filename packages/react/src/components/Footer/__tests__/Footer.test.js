/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act } from 'react-dom/test-utils';
import Footer from '../Footer';
import React from 'react';
import ReactDOM from 'react-dom';
import { TranslationAPI } from '@carbon/ibmdotcom-services';

const FOOTER_MENU_MOCK_DATA = require('../__data__/footer-menu.json');
const FOOTER_THIN_MOCK_DATA = require('../__data__/footer-thin.json');

const MOCK_DATA = {
  footerMenu: FOOTER_MENU_MOCK_DATA,
  footerThin: FOOTER_THIN_MOCK_DATA,
};

jest.mock('@carbon/ibmdotcom-services', () => ({
  TranslationAPI: {
    getTranslation: jest.fn(() => Promise.resolve(MOCK_DATA)),
  },
  LocaleAPI: {
    getLocale: jest.fn(() => Promise.resolve({ cc: 'us', lc: 'en' })),
    getList: jest.fn(() => Promise.resolve({})),
  },
  DDOAPI: {
    setVersion: jest.fn(),
  },
  AnalyticsAPI: {
    initAll: jest.fn(),
  },
}));

xdescribe('<Footer />', () => {
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
      await ReactDOM.render(<Footer type="short" />, container);
    });

    const footer = container.querySelector('.bx--footer');

    expect(TranslationAPI.getTranslation).toHaveBeenCalledTimes(1);
    expect(footer.querySelectorAll('.bx--footer-logo')).toHaveLength(1);
    expect(footer.querySelectorAll('.bx--footer-nav-group')).toHaveLength(
      MOCK_DATA.footerMenu.length
    );
    expect(footer.querySelectorAll('.bx--legal-nav__list-item')).toHaveLength(
      MOCK_DATA.footerThin.length + 1
    );
    expect(footer.querySelectorAll('.bx--footer--short')).toHaveLength(1);
  });
});
