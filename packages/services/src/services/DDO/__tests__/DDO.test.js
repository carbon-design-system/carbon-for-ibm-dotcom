import DDOAPI from '../DDO';
import digitalDataResponse from './data/response.json';
import root from 'window-or-global';

jest.mock('@carbon/ibmdotcom-utilities', () => ({
  settings: {
    version: 'dds.v1.0.0',
  },
}));

describe('DDOAPI', () => {
  beforeEach(function() {
    root.digitalData = digitalDataResponse;
  });

  it('should return the language', async () => {
    const language = await DDOAPI.getLanguage();

    expect(language).toEqual('en-US');
  });

  it('should set the version in the DDO', async () => {
    await DDOAPI.setVersion();

    expect(root.digitalData.page.version).toEqual('dds.v1.0.0');
  });

  it('should set an event listener if the data layer is not ready', () => {
    root.digitalData.page.isDataLayerReady = false;
    jest.useFakeTimers();

    DDOAPI.isReady();

    setTimeout(() => {
      root.digitalData.page.isDataLayerReady = 'test ready';
      root.dispatchEvent(new Event('datalayer_ready'));
    }, 500);
    jest.runAllTimers();

    expect(root.digitalData.page.isDataLayerReady).toEqual('test ready');
  });
});
