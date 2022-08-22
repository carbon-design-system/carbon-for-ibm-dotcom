/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act } from 'react-dom/test-utils';
import { Checkbox } from 'carbon-components-react';
import NoticeChoice from '../NoticeChoice';
import React from 'react';
import ReactDOM from 'react-dom';

xdescribe('<NoticeChoice />', () => {
  let container;
  const questionChoices = [1, 2, 3];
  const termsConditionLink = ``;
  const locale = 'us-en';
  const country = 'US';
  const email = '';
  const classNames = '';
  const enableAllOptIn = false;
  const onChange = () => {};
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
      await ReactDOM.render(
        <NoticeChoice
          questionChoices={questionChoices}
          termsConditionLink={termsConditionLink}
          locale={locale}
          country={country}
          onChange={onChange}
          email={email}
          classNames={classNames}
          enableAllOptIn={enableAllOptIn}
        />,
        container
      );
    });
    const noticechoice = container.querySelector('.bx--nc');
    expect(noticechoice.querySelectorAll('.bx--nc__pre-text')).toHaveLength(1);
    expect(noticechoice.querySelectorAll('.bx--checkbox-group')).toHaveLength(
      1
    );
    expect(noticechoice.find(Checkbox)).toHaveLength(3);
    expect(noticechoice.querySelectorAll('.bx--nc__post-text')).toHaveLength(1);
  });
});
