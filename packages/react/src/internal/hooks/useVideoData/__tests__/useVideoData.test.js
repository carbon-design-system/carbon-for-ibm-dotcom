/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { mount } from 'enzyme';
import React from 'react';
import useVideoData from '../useVideoData';
import { VideoPlayerAPI } from '@carbon/ibmdotcom-services';

jest.mock('@carbon/ibmdotcom-services', () => ({
  __esModule: true,
  VideoPlayerAPI: {
    api: jest.fn(() => Promise.resolve({ msDuration: 10000 })),
    getVideoDuration: jest.fn(() => '1:30'),
  },
}));

describe('useVideoData hook', () => {
  const type = 'video';
  const style = 'text';
  const otherProps = {
    copy: 'testing',
    media: {
      src: 'video_id',
      type: 'video',
    },
  };
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
    setup(otherProps, style, type);
    expect(VideoPlayerAPI.api).toHaveBeenCalled();
  });
});
