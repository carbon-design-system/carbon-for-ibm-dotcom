import LeadSpaceCentered from '../LeadSpaceCentered';
import React from 'react';
import { mount } from 'enzyme';

require('../../../../internal/FeatureFlags');

jest.mock('../../../../internal/FeatureFlags.js', () => ({
  DDS_LEADSPACE_CENTERED: true,
}));

describe('<LeadSpaceCentered />', () => {
  it('renders pattern with required title', () => {
    const leadspace = mount(<LeadSpaceCentered title="testing" />);
    expect(leadspace.find('.bx--leadspace--centered')).toHaveLength(1);
  });

  it('renders pattern with gradient', () => {
    const leadspace = mount(
      <LeadSpaceCentered title="testing" gradient={true} />
    );
    expect(leadspace.find('.bx--leadspace--centered__gradient')).toHaveLength(
      1
    );
  });
});
