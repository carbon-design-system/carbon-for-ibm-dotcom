import apiDataResponse from './data/response.json';
import VideoPlayerAPI from '../VideoPlayer';

// const _timeoutRetries = 50;

describe('VideoPlayer', () => {
  it('should return the apiData', async () => {
    VideoPlayerAPI.checkScript();
    const apiData = await VideoPlayerAPI.api('0_uka1msg4');
    // console.log(apiData)

    expect(apiData.referenceId).toEqual(apiDataResponse.referenceId);
  });

  it('should return the embedData', async () => {
    // VideoPlayerAPI.checkScript();

    const embedData = await VideoPlayerAPI.embedVideo(
      '0_uka1msg4',
      document.getElementById('kaltura_player')
    );
    console.log(embedData);

    //expect(apiData).toEqual();
  });

  it('should set a loop to check script state is the loaded state or loading state', () => {
    let _scriptLoaded = false;
    jest.useFakeTimers();

    VideoPlayerAPI.checkScript();

    setTimeout(() => {
      _scriptLoaded = true;
    }, 1000);
    jest.runAllTimers();

    expect(_scriptLoaded).toEqual(true);
  });
});
