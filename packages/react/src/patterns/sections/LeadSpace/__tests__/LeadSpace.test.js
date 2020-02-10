import LeadSpace from '../LeadSpace';
import { mount } from 'enzyme';
import React from 'react';

require('../../../internal/FeatureFlags');

jest.mock('../../../internal/FeatureFlags.js', () => ({
  DDS_LEADSPACE: true,
}));

describe('<LeadSpace />', () => {
  it('renders pattern with required title', () => {
    const leadspace = mount(<LeadSpace title="testing" />);
    expect(leadspace.find('.bx--leadspace')).toHaveLength(1);
  });

  it('renders pattern with gradient', () => {
    const leadspace = mount(<LeadSpace title="testing" gradient={true} />);
    expect(leadspace.find('.bx--leadspace--gradient')).toHaveLength(1);
  });
});
