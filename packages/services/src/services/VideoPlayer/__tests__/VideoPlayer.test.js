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
        this.doRequest = () => {
          console.log('hah!');
          return response;
        };
      }
    },
  };
}

describe('VideoPlayerAPI', () => {
  it('should return the api response', async () => {
    _kWidgetMock();
    const apiResponse = await VideoPlayerAPI.api('123456');

    expect(apiResponse).toEqual(response);
  });
});
