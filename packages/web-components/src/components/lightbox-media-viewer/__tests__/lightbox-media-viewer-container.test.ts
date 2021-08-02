/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import KalturaPlayerAPI from '@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer.js';
import { EmbeddedVideoPlayer } from '../__stories__/lightbox-media-viewer.stories';

const videoPlayerTemplate = (props?) =>
  EmbeddedVideoPlayer({
    parameters: {
      props: {
        LightboxVideoPlayerContainer: props,
      },
    },
  });

describe('dds-lightbox-video-player-container', function() {
  it('should render the video player', async function() {
    spyOn(KalturaPlayerAPI, 'api').and.returnValue(
      Promise.resolve({
        name: 'video-name-foo',
        msDuration: 60000,
      })
    );
    spyOn(KalturaPlayerAPI, 'embedMedia').and.callFake(async (videoId: string, playerId: string, autoplay: boolean) => {
      const playerElem = document.getElementById(playerId);
      // Causes to remder `<div data-autoplay="${String(Boolean(autoplay))}" data-video-id="${videoId}">`
      const replaceElem = document.createElement('div');
      replaceElem.dataset.videoId = videoId;
      replaceElem.dataset.autoplay = String(Boolean(autoplay));
      playerElem!.parentNode!.replaceChild(replaceElem, playerElem!);
      return { kWidget() {} };
    });
    render(videoPlayerTemplate({ videoId: 'video-id-foo' }), document.body);
    await Promise.resolve(); // Update cycle to trigger `._loadVideo()`
    await Promise.resolve(); // Let `KalturaPlayerAPI.api()` be resolved
    await Promise.resolve(); // Let `KalturaPlayerAPI.embedVideo()` be resolved
    await Promise.resolve(); // Let `loadVideoPromise` be resolved, that updates the instance with video name, etc.
    await Promise.resolve(); // Let `_loadVideo()` be resolved
    await Promise.resolve(); // Update cycle to render with `VideoPlayer` results
    expect(document.querySelector('dds-lightbox-video-player-container')).toMatchSnapshot();
  });

  afterEach(function() {
    render(undefined!, document.body);
  });
});
