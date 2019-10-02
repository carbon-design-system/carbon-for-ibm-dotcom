import React from 'react';
import { shallow } from 'enzyme';
import LeadSpace from '../LeadSpace';

describe('<LeadSpace />', () => {
  it('renders pattern with required title', () => {
    const leadspace = shallow(<LeadSpace title="Testing" />);
    expect(leadspace.hasClass('bx--leadspace')).toBeTruthy();
  });
});
