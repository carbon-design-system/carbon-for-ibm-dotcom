/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AnalyticsAPI } from '../../Analytics';
import KalturaPlayerAPI from '../KalturaPlayer';
import response from './data/response.json';
import root from 'window-or-global';

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
    seconds2Measurements: timeInSeconds => {
      const seconds = Math.floor(timeInSeconds % 60);
      const minutes = Math.floor((timeInSeconds / 60) % 60);
      const hours = Math.floor((timeInSeconds / (60 * 60)) % 24);
      const days = Math.floor(timeInSeconds / (60 * 60 * 24));

      return {
        seconds,
        minutes,
        hours,
        days,
      };
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

describe('KalturaPlayerAPI', () => {
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
    const apiResponse = await KalturaPlayerAPI.api('123456');

    expect(apiResponse).toEqual(response);
  });

  it('should check if kWidget is available', async () => {
    const spy = jest.fn();
    KalturaPlayerAPI.checkScript().then(spy);

    jest.advanceTimersByTime(200);
    await Promise.resolve();

    _kWidgetMock();
    jest.advanceTimersByTime(200);
    await Promise.resolve();

    expect(spy).toHaveBeenCalled();
  });

  it('should execute the media metrics call', () => {
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

    KalturaPlayerAPI.fireEvent({ playerState: 1, kdp, videoId });

    expect(AnalyticsAPI.videoPlayerStats).toHaveBeenCalled();
  });

  it('should embed the media player', async () => {
    const videoId = '123';
    _kWidgetMock();
    _mockKdp();
    KalturaPlayerAPI.embedMedia(videoId, '12345');
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

  it('should return the media duration as 1:00', async () => {
    _kWidgetMock();
    const duration = 60;
    const time = KalturaPlayerAPI.getMediaDuration(duration);

    expect(time).toEqual('1:00');
  });

  it('should return the media duration as 1:01:10', async () => {
    _kWidgetMock();
    const duration = 3670;
    const time = KalturaPlayerAPI.getMediaDuration(duration);

    expect(time).toEqual('1:01:10');
  });

  it('should return the media duration as 0:00', async () => {
    root.kWidget = {
      seconds2Measurements: () => {
        return undefined;
      },
    };

    const time = KalturaPlayerAPI.getMediaDuration();

    expect(time).toEqual('0:00');
  });
});
