/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import MastheadL1 from '../MastheadL1';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import { shallow } from 'enzyme';

const { prefix } = settings;

describe('MastheadL1', () => {
  it('applyies the `short` style correctly', () => {
    const wrapper = shallow(<MastheadL1 isShort />);
    const isShortClass = wrapper.find(`.${prefix}--masthead__l1--short`);
    expect(isShortClass.exists()).toBeTruthy();
  });
});
