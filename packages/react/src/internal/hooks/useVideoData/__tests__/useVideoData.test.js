/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { mount } from 'enzyme';
import React from 'react';
import useVideoData from '../useVideoData';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';

jest.mock(
  '@carbon/ibmdotcom-services/lib/services/VideoPlayer/VideoPlayer',
  () => ({
    api: jest.fn(() => Promise.resolve({ msDuration: 10000 })),
    getVideoDuration: jest.fn(() => '1:30'),
  })
);

describe('useVideoData hook', () => {
  const type = 'video';
  const videoId = [{ src: '0_uka1msg4' }];
  /**
   * @param {object} otherProps otherprops
   * @param {string} style style of CTA
   * @param {string} type type of CTA
   * @returns {*} returns an empty value
   */
  function setup(otherProps, style, type) {
    const returnVal = {};

    /**
     * writing test component here that uses the useVideoData hook
     *
     * @returns {*} null
     */
    function TestComponent() {
      Object.assign(returnVal, useVideoData(otherProps, style, type));
      return null;
    }
    mount(<TestComponent />);
    return returnVal;
  }
  it('should call the VideoPlayerAPI', async () => {
    setup(type, videoId);
    expect(VideoPlayerAPI.api).toHaveBeenCalled();
  });
});
