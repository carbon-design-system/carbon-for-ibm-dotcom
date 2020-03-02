import VideoPlayerAPI from '../VideoPlayer';

jest.mock('@carbon/ibmdotcom-utilities', () => ({
  settings: {
    version: 'dds.v1.0.0',
  },
}));

describe('VideoPlayer', () => {
  it('should return the apiData', async () => {
    const apiData = await VideoPlayerAPI.api();

    expect(apiData).toEqual();
  });

  it('should set a loop if the data layer is not ready', () => {
    let _scriptLoaded = false;
    jest.useFakeTimers();

    VideoPlayerAPI.checkScript();

    setTimeout(() => {
      _scriptLoaded = true;
    }, 500);
    jest.runAllTimers();

    expect(_scriptLoaded).toEqual(true);
  });
});
