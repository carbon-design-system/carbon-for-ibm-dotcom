/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  MEDIA_PLAYER_API_ACTION,
  MediaData,
  MediaPlayerAPIState,
} from '../../types/kalturaPlayerAPI';
import { MediaPlayerAPIActions } from '../../actions/kalturaPlayerAPI';
import convertValue from '../../../tests/utils/convert-value';
import reducer from '../kalturaPlayerAPI';

const mockMediaData: Partial<MediaData> = {
  name: 'name-foo',
  description: 'description-foo',
  duration: 120,
};

describe('Redux reducers for `KalturaPlayerAPI`', () => {
  it('should return the state unmodified for unknown action', () => {
    const state = {
      mediaData: {
        'video-id-foo': mockMediaData as MediaData,
      },
    };
    expect(reducer(state, {} as MediaPlayerAPIActions)).toEqual(state);
  });

  it('should support starting the spinner for loading video data', () => {
    const request = Promise.resolve(mockMediaData as MediaData);
    expect(
      convertValue(
        reducer({} as MediaPlayerAPIState, {
          type: MEDIA_PLAYER_API_ACTION.SET_REQUEST_MEDIA_DATA_IN_PROGRESS,
          mediaId: 'video-id-foo',
          request,
        })
      )
    ).toEqual({
      requestsMediaDataInProgress: {
        'video-id-foo': true,
      },
      requestsMediaData: {
        'video-id-foo': 'PROMISE',
      },
    });
  });

  it('should support setting error in loading video data', () => {
    expect(
      convertValue(
        reducer({} as MediaPlayerAPIState, {
          type: MEDIA_PLAYER_API_ACTION.SET_ERROR_REQUEST_MEDIA_DATA,
          mediaId: 'video-id-foo',
          error: new Error('error-getvideodata'),
        })
      )
    ).toEqual({
      requestsMediaDataInProgress: {
        'video-id-foo': false,
      },
      errorsRequestMediaData: {
        'video-id-foo': 'error-getvideodata',
      },
    });
  });

  it('should support setting loaded video data', () => {
    expect(
      convertValue(
        reducer({} as MediaPlayerAPIState, {
          type: MEDIA_PLAYER_API_ACTION.SET_MEDIA_DATA,
          mediaId: 'video-id-foo',
          mediaData: mockMediaData as MediaData,
        })
      )
    ).toEqual({
      requestsMediaDataInProgress: {
        'video-id-foo': false,
      },
      requestsMediaData: {
        'video-id-foo': 'PROMISE',
      },
      mediaData: {
        'video-id-foo': mockMediaData,
      },
    });
  });
});
