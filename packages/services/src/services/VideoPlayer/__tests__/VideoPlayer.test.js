import apiDataResponse from './data/response.json';
import root from 'window-or-global';
import VideoPlayerAPI from '../VideoPlayer';

//jest.mock('../../VideoPlayer');

describe('VideoPlayer', () => {
  /**
   *
   * Mock function for kWidget api and embed objects
   */
  const mockFn = () => {
    root.kWidget = {
      api: {
        doRequest: jest.fn(() => Promise.resolve(apiDataResponse)),
      },
      embed: jest.fn(() =>
        Promise.resolve({
          targetId: 'kaltura_player',
          wid: '_' + 123456,
          uiconf_id: 12345678,
          entry_id: '0_uka1msg4',
          flashvars: {
            autoPlay: false,
          },
        })
      ),
    };
  };
  it('should load script', () => {
    process.env.script =
      'https://cdnapisec.kaltura.com/p/243342/sp/24334200/embedIframeJs/uiconf_id/12905712/partner_id/243342';
    VideoPlayerAPI.checkScript();
    expect(document.body.innerHTML).toEqual(
      '<script src="https://cdnapisec.kaltura.com/p/243342/sp/24334200/embedIframeJs/uiconf_id/12905712/partner_id/243342"></script>'
    );
  });

  it('should return the apiData', async done => {
    const data = await VideoPlayerAPI.api('0_uka1msg4');
    mockFn();
    expect(data).toEqual(apiDataResponse);
    done();
    jest.clearAllTimers();
  });
});
