/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import KalturaPlayerAPI from '../KalturaPlayer';
import response from './data/response.json';
import root from 'window-or-global';

/**
 * Keeps track of the ID for the generated player element
 *
 * @type {string}
 * @private
 */
const _kdpId = 'test-kdp-ip';

/**
 * Mocks the kaltura player plugin window object
 *
 * @private
 */
const _kalturaPlayerPluginMock = () => {
  root.IBM = {
    Mediacenter: {
      player: {
        api: class {
          /**
           * mock constructor for the kWidget api class
           */
          constructor() {
            this.doRequest = (_obj, cb) => {
              cb(response);
            };
          }
          static getMediaProperties = (_partnerId, _mediaId) => {
            return Promise.resolve(response);
          }

          static getThumbnail = (
            partnerId = 'test-pid',
            mediaId = '',
            width = 0,
            height = 0
          ) => {
            let thumbnailUrl = `https://cfvod.kaltura.com/p/${partnerId}/sp/${partnerId}00/thumbnail/entry_id/${mediaId}/`;
            if (height > 0) {
              thumbnailUrl = `${thumbnailUrl}/height/${height}`;
            }
            if (width > 0) {
              thumbnailUrl = `${thumbnailUrl}/width/${width}`;
            }

            return thumbnailUrl;
          }
        },
        embed: () => {
          return document.getElementById(_kdpId)
        }
      }
    }
  };
}

/**
 * Make the kaltura player plugin window object
 * passable to checkscripts, but failt due to not
 * having the right components for the service to call
 *
 * @private
 */
const _kalturaPlayerPluginMockCleanToBypassChecks = () => {
  root.IBM.Mediacenter.player = {};
}

/**
 * Unmocks the kaltura player plugin window object
 *
 * @private
 */
const _kalturaPlayerPluginUnmock = () => {
  delete root.IBM;
}

/**
 * Prototypes the addJsListener method to the kdp
 *
 * @private
 */
const kdpPauseEvent = jest.fn();
const kdpPlayEvent = jest.fn();
const _mockKalturaPlayer = () => {
  document.body.innerHTML = `<div id="${_kdpId}"></div>`;
  Element.prototype.play = kdpPlayEvent;
  Element.prototype.pause = kdpPauseEvent;
}

const _unmockKalturaPlayer = () => {
  kdpPauseEvent.mockReset();
  kdpPlayEvent.mockReset();
}

jest.setTimeout(110000);

describe('KalturaPlayerAPI', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    _kalturaPlayerPluginUnmock();
    _unmockKalturaPlayer();
    jest.useRealTimers();
  });

  it('should succeed in checking if the KalturaPlayer Script is available', async () => {
    const spy = jest.fn();
    KalturaPlayerAPI.checkScript()
      .then(spy);

    jest.advanceTimersByTime(200);
    await Promise.resolve();

    _kalturaPlayerPluginMock();
    jest.advanceTimersByTime(200);
    await Promise.resolve();

    expect(spy).toHaveBeenCalled();
  });

  it('should fail in checking if the KalturaPlayer Script is available', async () => {
    const spy = jest.fn();
    KalturaPlayerAPI.checkScript()
      .catch(spy);

    jest.advanceTimersByTime(100000);
    await Promise.resolve();

    expect(spy).toHaveBeenCalled();
  });

  it('should return an expected api response', async () => {
    _kalturaPlayerPluginMock();
    const apiResponse = await KalturaPlayerAPI.api('123456');

    expect(apiResponse).toEqual(response);
  });

  it('should return an empty api response', async () => {
    _kalturaPlayerPluginMock();
    _kalturaPlayerPluginMockCleanToBypassChecks();

    const apiResponse = await KalturaPlayerAPI.api();

    expect(apiResponse).toEqual({});
  });

  it('should return the media thumbnail with width and height', () => {
    _kalturaPlayerPluginMock();

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
    _kalturaPlayerPluginMock();
    const mediaId = 'test-id';

    const thumbnailURL = KalturaPlayerAPI.getThumbnailUrl({ mediaId });

    expect(thumbnailURL.includes('/entry_id/test-id')).toBe(true);
    expect(thumbnailURL.includes('/width/')).toBe(false);
    expect(thumbnailURL.includes('/height/')).toBe(false);
  });

  it('should return the media thumbnail as empty', () => {
    _kalturaPlayerPluginMock();
    _kalturaPlayerPluginMockCleanToBypassChecks();

    const thumbnailURL = KalturaPlayerAPI.getThumbnailUrl({});

    expect(thumbnailURL).toBe('');
  });

  it('should embed the media player with custom events', async () => {
    const mockedCustomReadyCallback = jest.fn().mockImplementation((kalturaPlayer) => {
      kalturaPlayer.play();
      kalturaPlayer.pause();
    });

    const mediaId = 'test-media-id';
    _kalturaPlayerPluginMock();
    _mockKalturaPlayer();

    await KalturaPlayerAPI.embedMedia(
      mediaId,
      'test-target-id',
      {},
      mockedCustomReadyCallback,
      'test-partner-id'
    );

    expect(kdpPauseEvent).toHaveBeenCalledTimes(1);
    expect(kdpPlayEvent).toHaveBeenCalledTimes(1);
    expect(1).toBe(1);
  });
});
