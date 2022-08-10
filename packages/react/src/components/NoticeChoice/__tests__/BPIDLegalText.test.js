/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import BPIDLegalText from '../BPIDLegalText';
import { mount } from 'enzyme';
import React from 'react';

describe('BPIDLegalText', () => {
  it('renders as expected', () => {
    const bpidLegalText = mount(<BPIDLegalText bpidLegalText={`Some text`} />);
    expect(bpidLegalText.find('p')).toHaveLength(1);
  });
});
