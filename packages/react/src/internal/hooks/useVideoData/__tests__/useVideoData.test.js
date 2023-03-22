/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import KalturaPlayerAPI from '../../../../internal/vendor/@carbon/ibmdotcom-services/services/KalturaPlayer/KalturaPlayer';
import { mount } from 'enzyme';
import React from 'react';
import useVideoData from '../useVideoData';

jest.mock(
  '../../../../internal/vendor/@carbon/ibmdotcom-services/services/KalturaPlayer/KalturaPlayer',
  () => ({
    api: jest.fn(() => Promise.resolve({ msDuration: 10000 })),
    getMediaDuration: jest.fn(() => '1:30'),
  })
);

describe('useVideoData hook', () => {
  const type = 'video';
  const videoId = [{ src: '1_9h94wo6b' }];
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
  it('should call the KalturaPlayerAPI', async () => {
    setup(type, videoId);
    expect(KalturaPlayerAPI.api).toHaveBeenCalled();
  });
});
