import MastheadL1 from '../MastheadL1';
import React from 'react';
import { settings } from 'carbon-components';
import { shallow } from 'enzyme';

const { prefix } = settings;

describe('MastheadL1', () => {
  it('applyies the `short` style correctly', () => {
    const wrapper = shallow(<MastheadL1 isShort />);
    const isShortClass = wrapper.find(`.${prefix}--masthead__l1--short`);
    expect(isShortClass.exists()).toBeTruthy();
  });
});
