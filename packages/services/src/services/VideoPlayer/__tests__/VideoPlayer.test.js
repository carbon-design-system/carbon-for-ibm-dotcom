import { AnalyticsAPI } from '../../Analytics';
import response from './data/response.json';
import root from 'window-or-global';
import VideoPlayerAPI from '../VideoPlayer';

/**
 * Mocks the kWidget object
 *
 * @private
 */
function _kWidgetMock() {
  root.kWidget = {
    api: class {
      /**
       * mock constructor for the kWidget api class
       */
      constructor() {
        this.doRequest = (obj, cb) => {
          cb(response);
        };
      }
    },
  };
}

jest.mock('../../Analytics', () => ({
  AnalyticsAPI: {
    videoPlayerStats: jest.fn(),
  },
}));

describe('VideoPlayerAPI', () => {
  it('should return the api response', async () => {
    _kWidgetMock();
    const apiResponse = await VideoPlayerAPI.api('123456');

    expect(apiResponse).toEqual(response);
  });

  it('should execute the video metrics call', () => {
    const kdp = {
      evaluate: query => {
        switch (query) {
          case '{video.player.currentTime}':
            return 123;
          case '{mediaProxy.entry.name}':
            return 'name';
          case '{mediaProxy.entry.duration}':
            return 60;
          default:
        }
      },
    };
    const videoId = '123';

    VideoPlayerAPI.fireEvent({ playerState: 1, kdp, videoId });

    expect(AnalyticsAPI.videoPlayerStats).toHaveBeenCalled();
  });

  it('should return the video duration', async () => {
    const duration = 60000;
    const time = VideoPlayerAPI.getVideoDuration(duration);

    expect(time).toEqual('(1:00)');
  });
});
