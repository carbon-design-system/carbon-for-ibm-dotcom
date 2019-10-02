import React from 'react';
import { mount } from 'enzyme';
import LeadSpaceButtons from '../LeadSpaceButtons';

describe('<LeadSpace />', () => {
  it('renders pattern with required title', () => {
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
    const buttonGroup = mount(<LeadSpaceButtons buttons={buttons} />);
    expect(buttonGroup.find('.bx--leadspace__ctas')).toHaveLength(1);
  });

  it('renders only 2 buttons max', () => {
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
      {
        link: '',
        copy: 'Another action button',
        renderIcon: 'ArrowRight',
      },
    ];
    const buttonGroup = mount(<LeadSpaceButtons buttons={buttons} />);
    expect(buttonGroup.find('.bx--btn')).toHaveLength(2);
  });
});
