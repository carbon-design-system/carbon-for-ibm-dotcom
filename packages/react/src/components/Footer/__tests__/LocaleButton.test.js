/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act } from 'react-dom/test-utils';
import LocaleButton from '../LocaleButton';
import React from 'react';
import ReactDOM from 'react-dom';

jest.mock('@carbon/ibmdotcom-services/lib/services/Locale/Locale', () => ({
  getLocale: jest.fn(() => Promise.resolve({ cc: 'us', lc: 'en' })),
  getList: jest.fn(() => Promise.resolve({})),
  getLangDisplay: jest.fn(() => Promise.resolve()),
  setLangDisplay: jest.fn(() => Promise.resolve()),
}));

describe('<LocaleButton />', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('renders button and locale modal', () => {
    act(() => {
      ReactDOM.render(<LocaleButton />, container);
    });

    const btnContainer = container.querySelector('.bx--locale-btn__container');

    expect(btnContainer.querySelectorAll('button.bx--locale-btn')).toHaveLength(
      1
    );
    expect(
      btnContainer.querySelectorAll('.bx--locale-modal-container')
    ).toHaveLength(1);
  });

  it('opens and closes properly', () => {
    act(() => {
      ReactDOM.render(<LocaleButton />, container);
    });

    const btn = container.querySelector('button.bx--locale-btn');
    const modal = container.querySelector('.bx--locale-modal-container');
    const modalCloseBtn = modal.querySelector('button.bx--modal-close');

    // Closed on load
    expect(modal.classList.contains('is-visible')).toBe(false);
    expect(modal.hasAttribute('open')).toBe(false);

    // Open when button is clicked
    act(() => {
      btn.click();
    });
    expect(modal.classList.contains('is-visible')).toBe(true);
    expect(modal.hasAttribute('open')).toBe(true);

    // And closed again
    act(() => {
      modalCloseBtn.click();
    });
    expect(modal.classList.contains('is-visible')).toBe(false);
    expect(modal.hasAttribute('open')).toBe(false);
  });
});
