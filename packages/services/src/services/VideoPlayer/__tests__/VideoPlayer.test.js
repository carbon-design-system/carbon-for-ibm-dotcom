import apiDataResponse from './data/response.json';
import root from 'window-or-global';
import VideoPlayerAPI from '../VideoPlayer';

let _scriptLoaded = false;

const _partnerId = process.env.KALTURA_PARTNER_ID || 243342;
const _uiConfId = process.env.KALTURA_UICONF_ID || 12905712;

//jest.mock('../../VideoPlayer');

describe('VideoPlayer', () => {
  beforeEach(function() {
    root.kWidget = {
      api: {
        doRequest: jest.fn(() => Promise.resolve(apiDataResponse)),
      },
      embed: jest.fn(() =>
        Promise.resolve({
          targetId: 'kaltura_player',
          wid: '_' + _partnerId,
          uiconf_id: _uiConfId,
          entry_id: '0_uka1msg4',
          flashvars: {
            autoPlay: false,
          },
        })
      ),
    };
  });

  it('should set a loop to check script state is the loaded state or loading state', () => {
    jest.useFakeTimers();
    VideoPlayerAPI.checkScript();
    setTimeout(() => {
      _scriptLoaded = true;
    }, 500);
    jest.runAllTimers();
    expect(_scriptLoaded).toEqual(true);
  });

  it('should load script', () => {
    process.env.script =
      'https://cdnapisec.kaltura.com/p/243342/sp/24334200/embedIframeJs/uiconf_id/12905712/partner_id/243342';
    VideoPlayerAPI.checkScript();
    expect(document.body.innerHTML).toEqual(
      '<script src="https://cdnapisec.kaltura.com/p/243342/sp/24334200/embedIframeJs/uiconf_id/12905712/partner_id/243342"></script>'
    );
  });

  it('should return the apiData', async done => {
    return VideoPlayerAPI.api('0_uka1msg4').then(data => {
      expect(data).toEqual(apiDataResponse);
      done();
      jest.clearAllTimers();
    });
  });
});
