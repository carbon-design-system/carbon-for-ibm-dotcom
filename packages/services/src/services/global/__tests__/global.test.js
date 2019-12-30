import { AnalyticsAPI } from '../../Analytics';
import { DDOAPI } from '../../DDO';
import { globalInit } from '../';

jest.mock('../../DDO', () => ({
  DDOAPI: {
    setVersion: jest.fn(),
  },
}));
jest.mock('../../Analytics', () => ({
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
