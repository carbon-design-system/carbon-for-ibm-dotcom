/**
 * Copyright IBM Corp. 2020, 2022
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
    embed: (obj) => {
      obj.readyCallback(_kdpId);
    },
    seconds2Measurements: (timeInSeconds) => {
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

/**
 * List of addJsListeners events added to fire IBM Metrics events
 *
 * @type {Array}
 * @private
 */
const _jsEventListenerList = [
  'playerPaused.ibm',
  'playerPlayed.ibm',
  'playerPlayEnd.ibm',
  'IbmCtaEvent.ibm',
];

describe('KalturaPlayerAPI', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    _jsListenerEvents = [];
    AnalyticsAPI.videoPlayerStats.mockReset();
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
      evaluate: (query) => {
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
  it('should execute the media metrics call with custom-metrics-data', () => {
    const kdp = {
      evaluate: (query) => {
        switch (query) {
          case '{video.player.currentTime}':
            return 0;
          case '{mediaProxy.entry.name}':
            return 'name';
          case '{mediaProxy.entry.duration}':
            return 60;
          default:
        }
      },
    };
    const mediaId = '123';

    const customMetricsData = {
      playerStateLabel: 'test',
    };

    const expected = {
      currentTime: 0,
      customMetricsData,
      duration: 60,
      mediaId: '123',
      playerState: 0,
      playerType: 'kaltura',
      title: 'name',
    };

    KalturaPlayerAPI.fireEvent({
      playerState: 2,
      kdp,
      mediaId,
      customMetricsData,
    });

    expect(AnalyticsAPI.videoPlayerStats).toHaveBeenCalledWith(expected);
  });

  it('should embed the media player with metrics', async () => {
    const videoId = '123';
    _kWidgetMock();
    _mockKdp();
    KalturaPlayerAPI.embedMedia(videoId, '12345', {});
    await Promise.resolve();

    _jsEventListenerList.forEach((eventName) => {
      expect(
        _jsListenerEvents.some((event) => event.eventName === eventName)
      ).toBe(true);
    });
  });

  it('should embed the media player without metrics', async () => {
    const videoId = '123';
    _kWidgetMock();
    _mockKdp();
    KalturaPlayerAPI.embedMedia(videoId, '12345', {}, false);
    await Promise.resolve();
    _jsEventListenerList.forEach((eventName) => {
      expect(
        _jsListenerEvents.some((event) => event.eventName === eventName)
      ).toBe(false);
    });
  });

  it('should embed the media player with custom events', async () => {
    const mockedCustomReadyCallback = jest.fn().mockImplementation((kdp) => {
      kdp.addJsListener('customEvent.test', () => {});
    });

    const videoId = '123';
    _kWidgetMock();
    _mockKdp();
    KalturaPlayerAPI.embedMedia(
      videoId,
      '12345',
      {},
      false,
      mockedCustomReadyCallback
    );
    await Promise.resolve();
    _jsEventListenerList.forEach((eventName) => {
      expect(
        _jsListenerEvents.some((event) => event.eventName === eventName)
      ).toBe(false);
    });
    expect(mockedCustomReadyCallback).toHaveBeenCalled();
    expect(
      _jsListenerEvents.some((event) => event.eventName === 'customEvent.test')
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

  it('should return the media duration as (1:1:10) in miliseconds', async () => {
    _kWidgetMock();
    const duration = 3670 * 1000;
    const time = KalturaPlayerAPI.getMediaDuration(duration, true);

    expect(time).toEqual('(1:1:10)');
  });

  it('should return the media duration as (0:05) in miliseconds', async () => {
    _kWidgetMock();
    const duration = 5 * 1000;
    const time = KalturaPlayerAPI.getMediaDuration(duration, true);

    expect(time).toEqual('(0:05)');
  });

  it('should return the media thumbnail with width and height', () => {
    const mediaId = 'testid';
    const width = 100;
    const height = 100;

    const thumbnailURL = KalturaPlayerAPI.getThumbnailUrl({
      mediaId,
      width,
      height,
    });

    expect(thumbnailURL.includes('/entry_id/testid')).toBe(true);
    expect(thumbnailURL.includes('/width/100')).toBe(true);
    expect(thumbnailURL.includes('/height/100')).toBe(true);
  });

  it('should return the media thumbnail without width and height', () => {
    const mediaId = 'testid';

    const thumbnailURL = KalturaPlayerAPI.getThumbnailUrl({ mediaId });

    expect(thumbnailURL.includes('/entry_id/testid')).toBe(true);
    expect(thumbnailURL.includes('/width/')).toBe(false);
    expect(thumbnailURL.includes('/height/')).toBe(false);
  });

  it('Should return media duration with all parameters - hour, minutes and seconds', () => {
    const time = 4510 * 1000; // Miliseconds
    const formatedMediaDuration = KalturaPlayerAPI.getMediaDurationFormatted(
      time,
      true
    );

    expect(formatedMediaDuration).toBe('1 hour 15 minutes 10 seconds');
  });

  it('Should return media duration with zero seconds', () => {
    const formatedMediaDuration = KalturaPlayerAPI.getMediaDurationFormatted();

    expect(formatedMediaDuration).toBe('0 seconds');
  });
});
