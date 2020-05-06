import CTASection from '../CTASection';
import { mount } from 'enzyme';
import React from 'react';

describe('CTA Section', () => {
  it('should render `booting component` string', () => {
    const wrapper = mount(<CTASection />);
    const divElement = wrapper.find('div#boot');
    const text = divElement.text();
    expect(text).toMatch('booting component');
  });
});
