import React from 'react';
import { mount } from 'enzyme';
import ButtonGroup from '../ButtonGroup';

jest.mock('../../../internal/FeatureFlags', () => ({
  DDS_BUTTON_GROUP: true,
}));

describe('<ButtonGroup />', () => {
  it('renders ButtonGroup as expected', () => {
    const buttons = [
      {
        href: '',
        copy: 'Primary action button',
        renderIcon: 'ArrowDown',
      },
      {
        href: '',
        copy: 'Secondary action button',
        renderIcon: 'ArrowRight',
      },
    ];
    const buttonGroup = mount(<ButtonGroup buttons={buttons} />);
    expect(buttonGroup.find('.bx--buttongroup')).toHaveLength(1);
  });
});
