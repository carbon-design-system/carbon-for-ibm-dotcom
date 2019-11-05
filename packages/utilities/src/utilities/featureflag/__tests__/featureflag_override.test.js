import { featureFlag } from '../';

require('../../../internal/FeatureFlags.js');

jest.mock('../../../internal/FeatureFlags.js', () => ({
  DDS_FLAGS_ALL: true,
}));

describe('Feature flag utility: DDS_FLAGS_ALL [true]', () => {
  const content = 'Lorem ipsum';

  it('DDS_FLAGS_ALL overrides false flags', () => {
    const output = featureFlag(false, () => content);
    expect(output).toBe(content);
  });
});
