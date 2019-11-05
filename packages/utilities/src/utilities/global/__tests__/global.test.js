import { globalInit } from '../';
import { DDOAPI, AnalyticsAPI } from '@carbon/ibmdotcom-services';

jest.mock('@carbon/ibmdotcom-services', () => ({
  DDOAPI: {
    setVersion: jest.fn(),
  },
  AnalyticsAPI: {
    initAll: jest.fn(),
  },
}));

describe('Global init function', () => {
  it('should execute the DDO settings', () => {
    globalInit();
    expect(DDOAPI.setVersion).toHaveBeenCalled();
  });

  it('should execute the AnalyticsAPI initAll', () => {
    globalInit();
    expect(AnalyticsAPI.initAll).toHaveBeenCalled();
  });
});
