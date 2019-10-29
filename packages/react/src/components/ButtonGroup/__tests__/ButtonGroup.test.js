import React from 'react';
import { mount } from 'enzyme';
import ButtonGroup from '../ButtonGroup';

jest.mock('../../../internal/FeatureFlags', () => ({
  BUTTON_GROUP: true,
}));

describe('<ButtonGroup />', () => {
  it('renders ButtonGroup as expected', () => {
    const buttons = [
      {
        link: '',
        copy: 'Primary action button',
        renderIcon: 'ArrowDown',
      },
      {
        link: '',
        copy: 'Secondary action button',
        renderIcon: 'ArrowRight',
      },
    ];
    const buttonGroup = mount(<ButtonGroup buttons={buttons} />);
    expect(buttonGroup.find('.bx--buttongroup')).toHaveLength(1);
  });
});
