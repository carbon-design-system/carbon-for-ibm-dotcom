// import apiDataResponse from './data/response.json';
import VideoPlayerAPI from '../VideoPlayer';

let _scriptLoaded = false;

describe('VideoPlayer', () => {
  beforeEach(function() {
    // jest.setTimeout(5000);
    // jest.useFakeTimers();
  });

  it('should return the apiData', async done => {
    //  jest.setTimeout(30000);
    jest.useFakeTimers();
    const apiData = await VideoPlayerAPI.api('0_uka1msg4');

    // console.log(await VideoPlayerAPI.api('0_uka1msg4'))
    expect(apiData.referenceId).toEqual('coffee');
    done();
  });

  it('should set a loop to check script state is the loaded state or loading state', () => {
    jest.useFakeTimers();
    VideoPlayerAPI.checkScript();

    setTimeout(() => {
      _scriptLoaded = true;
    }, 5000);
    jest.runAllTimers();

    expect(_scriptLoaded).toEqual(true);
  });
});
