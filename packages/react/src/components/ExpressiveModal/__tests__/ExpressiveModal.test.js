/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act } from 'react-dom/test-utils';
import ExpressiveModal from '../ExpressiveModal';
import MockedComponent from './mocks/mock-component';
import React from 'react';
import ReactDOM from 'react-dom';

describe('<ExpressiveModal />', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('opens and closes on command', () => {
    act(() => {
      ReactDOM.render(<MockedComponent />, container);
    });

    const expressiveModal = container.querySelector('.bx--modal--expressive');
    const expressiveModalCloseBtn = container.querySelector('.bx--modal-close');
    const openBtn = container.querySelector('button');

    expect(expressiveModal.classList.contains('bx--modal')).toBeTruthy();
    expect(expressiveModal.classList.contains('is-visible')).toBeFalsy();

    // open
    act(() => {
      openBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(expressiveModal.classList.contains('is-visible')).toBeTruthy();

    // close
    act(() => {
      expressiveModalCloseBtn.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
    });

    expect(expressiveModal.classList.contains('is-visible')).toBeFalsy();
  });

  it('disable close event', () => {
    act(() => {
      ReactDOM.render(
        <ExpressiveModal open={true} onClose={() => false} />,
        container
      );
    });

    const expressiveModal = container.querySelector('.bx--modal--expressive');
    const expressiveModalCloseBtn = container.querySelector('.bx--modal-close');

    expect(expressiveModal.classList.contains('is-visible')).toBeTruthy();

    // open
    act(() => {
      expressiveModalCloseBtn.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
    });

    expect(expressiveModal.classList.contains('is-visible')).toBeTruthy();
  });
});
