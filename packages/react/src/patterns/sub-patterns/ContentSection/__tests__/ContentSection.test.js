import ContentSection from '../ContentSection';
import { mount } from 'enzyme';
import React from 'react';

describe('<ContentSection />', () => {
  it('renders pattern with required heading', () => {
    const contentsection = mount(<ContentSection heading="testing" />);
    expect(contentsection.find('.bx--content-section')).toHaveLength(1);
  });
});
