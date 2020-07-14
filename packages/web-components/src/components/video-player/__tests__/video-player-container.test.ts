/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import { EventTarget } from 'event-target-shim';
import ifNonNull from 'carbon-custom-elements/es/globals/directives/if-non-null';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';
import EventManager from '../../../../tests/utils/event-manager';
import DDSVideoPlayer from '../video-player';
import '../video-player-container';

const template = (props?) => {
  const { formatCaption, hideCaption, videoId } = props ?? {};
  return html`
    <dds-video-player-container ?hide-caption="${hideCaption}" video-id="${ifNonNull(videoId)}" .formatCaption="${formatCaption}">
    </dds-video-player-container>
  `;
};

describe('dds-video-player-container', function() {
  const events = new EventManager();

  it('should send props to video player', async function() {
    spyOn(VideoPlayerAPI, 'api').and.returnValue(Promise.resolve({}));
    spyOn(VideoPlayerAPI, 'embedVideo').and.returnValue(Promise.resolve());
    const formatCaption = () => {};
    render(template({ formatCaption, hideCaption: true, videoId: 'video-id-foo' }), document.body);
    await Promise.resolve(); // Update cycle to trigger `._loadVideo()`
    await Promise.resolve(); // Micro-task cycle for `VideoPlayer`
    await Promise.resolve(); // Update cycle to render with `VideoPlayer` results
    const videoPlayer = document.querySelector('dds-video-player') as DDSVideoPlayer;
    expect(videoPlayer.formatCaption).toBe(formatCaption);
    expect(videoPlayer.hideCaption).toBe(true);
  });

  it('should render the video player', async function() {
    spyOn(VideoPlayerAPI, 'api').and.returnValue(
      Promise.resolve({
        name: 'video-name-foo',
        msDuration: 60000,
      })
    );
    spyOn(VideoPlayerAPI, 'embedVideo').and.callFake(async (videoId: string, playerId: string, autoplay: boolean) => {
      const playerElem = document.getElementById(playerId);
      // Causes to remder `<div data-autoplay="${String(Boolean(autoplay))}" data-video-id="${videoId}">`
      const replaceElem = document.createElement('div');
      replaceElem.dataset.videoId = videoId;
      replaceElem.dataset.autoplay = String(Boolean(autoplay));
      playerElem!.parentNode!.replaceChild(replaceElem, playerElem!);
    });
    render(template({ videoId: 'video-id-foo' }), document.body);
    await Promise.resolve(); // Update cycle to trigger `._loadVideo()`
    await Promise.resolve(); // Let `VideoPlayerAPI.api()` be resolved
    await Promise.resolve(); // Let `VideoPlayerAPI.embedVideo()` be resolved
    await Promise.resolve(); // Let `loadVideoPromise` be resolved, that updates the instance with video name, etc.
    await Promise.resolve(); // Let `_loadVideo()` be resolved
    await Promise.resolve(); // Update cycle to render with `VideoPlayer` results
    expect(document.querySelector('dds-video-player-container')).toMatchSnapshot();
  });

  it('should avoid race condition in switching video', async function() {
    const eventTarget = new EventTarget();
    spyOn(VideoPlayerAPI, 'api').and.callFake(
      (videoId: string) =>
        new Promise(resolve => {
          events.on(eventTarget, `drain-promise-${videoId}`, () => {
            resolve({
              name: `video-name-${videoId}`,
            });
          });
        })
    );
    spyOn(VideoPlayerAPI, 'embedVideo').and.returnValue(Promise.resolve());
    render(template({ videoId: 'video-id-foo' }), document.body);
    await Promise.resolve(); // Update cycle to trigger `._loadVideo()`
    render(template({ videoId: 'video-id-bar' }), document.body);
    await Promise.resolve(); // Update cycle to trigger `._loadVideo()`
    eventTarget.dispatchEvent(new CustomEvent('drain-promise-video-id-bar'));
    await Promise.resolve(); // Let `VideoPlayerAPI.api()` be resolved
    await Promise.resolve(); // Let `loadVideoPromise` be resolved, that updates the instance with video name, etc.
    eventTarget.dispatchEvent(new CustomEvent('drain-promise-video-id-foo'));
    await Promise.resolve(); // Let `VideoPlayerAPI.api()` be resolved
    // Let `loadVideoPromise` be resolved, that attempts to updatethe instance with video name, etc.,
    // but it shouldn't happen given `video-id-foo` is stale
    await Promise.resolve();
    await Promise.resolve(); // Update cycle to render with `VideoPlayer` results
    const videoPlayer = document.querySelector('dds-video-player') as DDSVideoPlayer;
    expect(videoPlayer.name).toBe('video-name-video-id-bar');
  });

  it('should cache the API call result for video data', async function() {
    spyOn(VideoPlayerAPI, 'api').and.returnValue(Promise.resolve({}));
    spyOn(VideoPlayerAPI, 'embedVideo').and.returnValue(Promise.resolve());
    render(template({ videoId: 'video-id-foo' }), document.body);
    await Promise.resolve(); // Update cycle to trigger `._loadVideo()`
    render(template({ videoId: 'video-id-bar' }), document.body);
    await Promise.resolve(); // Update cycle to trigger `._loadVideo()`
    render(template({ videoId: 'video-id-foo' }), document.body);
    await Promise.resolve(); // Update cycle to trigger `._loadVideo()`
    expect(VideoPlayerAPI.api).toHaveBeenCalledTimes(2);
    expect(VideoPlayerAPI.embedVideo).toHaveBeenCalledTimes(2);
  });

  it('should send props to video player', async function() {
    spyOn(VideoPlayerAPI, 'api').and.returnValue(Promise.resolve({}));
    spyOn(VideoPlayerAPI, 'embedVideo').and.returnValue(Promise.resolve());
    const formatCaption = () => {};
    render(template({ formatCaption, hideCaption: true, videoId: 'video-id-foo' }), document.body);
    await Promise.resolve(); // Update cycle to trigger `._loadVideo()`
    await Promise.resolve(); // Micro-task cycle for `VideoPlayer`
    await Promise.resolve(); // Update cycle to render with `VideoPlayer` results
    const videoPlayer = document.querySelector('dds-video-player') as DDSVideoPlayer;
    expect(videoPlayer.formatCaption).toBe(formatCaption);
    expect(videoPlayer.hideCaption).toBe(true);
  });

  afterEach(function() {
    render(undefined!, document.body);
    events.reset();
  });
});
