import { Desktop } from '@carbon/pictograms-react';
import { mount } from 'enzyme';
import PictogramItem from '../PictogramItem';
import React from 'react';

describe('<PictogramItem />', () => {
  it('renders PictogramItem as expected', () => {
    const heading = 'Lorem ipsum dolor sit';
    const copy =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam';
    const cta = {
      type: 'text',
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor',
    };
    const buttonGroup = mount(
      <PictogramItem
        heading={heading}
        copy={copy}
        cta={cta}
        Pictogram={Desktop}
      />
    );
    expect(buttonGroup.find('.bx--pictogram-item')).toHaveLength(1);
    expect(buttonGroup.find('.bx--pictogram-item__pictogram')).toHaveLength(1);
    expect(buttonGroup.find('.bx--pictogram-item__content-col')).toHaveLength(
      1
    );
  });
});
