/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
    embed: obj => {
      obj.readyCallback(_kdpId);
    },
  };
}

/**
 * Keeps track of the ID for the generated player element
 *
 * @type {string}
 * @private
 */
const _kdpId = '12345';

/**
 * Unmocks the kWidget
 *
 * @private
 */
function _KWidgetUnMock() {
  delete root.kWidget;
}

jest.mock('../../Analytics', () => ({
  AnalyticsAPI: {
    videoPlayerStats: jest.fn(),
  },
}));

/**
 * Prototypes the addJsListener method to the kdp
 *
 * @private
 */
function _mockKdp() {
  document.body.innerHTML = `<div id="${_kdpId}"></div>`;
  Element.prototype.addJsListener = jest.fn((eventName, cb) => {
    _jsListenerEvents.push({
      eventName,
      cb,
    });
  });
}

/**
 * Tracks the addJsListeners added
 *
 * @type {Array}
 * @private
 */
let _jsListenerEvents = [];

describe('VideoPlayerAPI', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    _jsListenerEvents = [];
  });

  afterEach(() => {
    _KWidgetUnMock();
    jest.useRealTimers();
  });

  it('should return the api response', async () => {
    _kWidgetMock();
    const apiResponse = await VideoPlayerAPI.api('123456');

    expect(apiResponse).toEqual(response);
  });

  it('should check if kWidget is available', async () => {
    const spy = jest.fn();
    VideoPlayerAPI.checkScript().then(spy);

    jest.advanceTimersByTime(200);
    await Promise.resolve();

    _kWidgetMock();
    jest.advanceTimersByTime(200);
    await Promise.resolve();

    expect(spy).toHaveBeenCalled();
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

  it('should embed the video player', async () => {
    const videoId = '123';
    _kWidgetMock();
    _mockKdp();
    VideoPlayerAPI.embedVideo(videoId, '12345');
    await Promise.resolve();
    expect(
      _jsListenerEvents.some(event => event.eventName === 'playerPaused')
    ).toBe(true);
    expect(
      _jsListenerEvents.some(event => event.eventName === 'playerPlayed')
    ).toBe(true);
    expect(
      _jsListenerEvents.some(event => event.eventName === 'playerPlayEnd')
    ).toBe(true);
  });

  it('should return the video duration', async () => {
    const duration = 60000;
    const time = VideoPlayerAPI.getVideoDuration(duration);

    expect(time).toEqual('(1:00)');
  });
});
