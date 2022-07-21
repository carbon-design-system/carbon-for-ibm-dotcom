/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Checkbox } from 'carbon-components-react';
import { mount } from 'enzyme';
import NoticeChoice from '../NoticeChoice';
import React from 'react';

describe('NoticeChoice', () => {
  it('renders as expected', () => {
    const questionChoices = [1, 2, 3];
    const termsConditionLink = ``;
    const locale = 'us-en';
    const country = 'US';
    const email = '';
    const classNames = '';
    const enableAllOptIn = false;
    const onChange = () => {};

    const noticeChoice = mount(
      <NoticeChoice
        questionChoices={questionChoices}
        termsConditionLink={termsConditionLink}
        locale={locale}
        country={country}
        onChange={onChange}
        email={email}
        classNames={classNames}
        enableAllOptIn={enableAllOptIn}
      />
    );
    expect(noticeChoice.find('.bx--nc')).toHaveLength(1);
    expect(noticeChoice.find('.bx--nc__pre-text')).toHaveLength(1);
    expect(noticeChoice.find('.bx--checkbox-group')).toHaveLength(1);
    expect(noticeChoice.find(Checkbox)).toHaveLength(3);
    expect(noticeChoice.find('.bx--nc__post-text')).toHaveLength(1);
  });
});
