/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import DDSVideoPlayer from '../video-player';
/* eslint-disable import/no-duplicates */
import DDSVideoPlayerComposite from '../video-player-composite';
// Above import is interface-only ref and thus code won't be brought into the build
import '../video-player-composite';
/* eslint-enable import/no-duplicates */

const template = (props?) => {
  const { embeddedVideos, formatCaption, formatDuration, hideCaption, videoId, videoData } = props ?? {};
  return html`
    <dds-video-player-composite
      ?hide-caption="${hideCaption}"
      video-id="${ifNonNull(videoId)}"
      .embeddedVideos="${ifNonNull(embeddedVideos)}"
      .formatCaption="${ifNonNull(formatCaption)}"
      .formatDuration="${ifNonNull(formatDuration)}"
      .videoData="${ifNonNull(videoData)}"
    >
    </dds-video-player-composite>
  `;
};

describe('dds-video-player-composite', function() {
  it('should send props to video player', async function() {
    const formatCaption = () => {};
    const formatDuration = () => {};
    render(template({ formatCaption, formatDuration, hideCaption: true, videoId: 'video-id-foo' }), document.body);
    await Promise.resolve(); // Micro-task cycle for `VideoPlayer`
    await Promise.resolve(); // Update cycle to render with `VideoPlayer` results
    const videoPlayer = document.querySelector('dds-video-player') as DDSVideoPlayer;
    expect(videoPlayer.formatCaption).toBe(formatCaption);
    expect(videoPlayer.formatDuration).toBe(formatDuration);
    expect(videoPlayer.hideCaption).toBe(true);
  });

  it('should render the video player', async function() {
    const videoData = {
      'video-id-foo': {
        name: 'video-name-foo',
        duration: 120,
      },
    };

    render(template({ videoData, videoId: 'video-id-foo' }), document.body);
    await Promise.resolve();
    expect(document.querySelector('dds-video-player-composite')).toMatchSnapshot();
  });

  it('should activate/deactivate videos as user switches video', async function() {
    render(template({ videoId: 'video-id-foo' }), document.body);
    await Promise.resolve();
    const videoPlayerComposite = document.querySelector('dds-video-player-composite') as DDSVideoPlayerComposite;
    videoPlayerComposite.querySelector('dds-video-player')!.innerHTML = `
      <div data-video-id="video-id-foo"></div>
      <div data-video-id="video-id-bar"></div>
      <div data-video-id="video-id-baz"></div>
    `;
    const embeddedVideoFoo = videoPlayerComposite.querySelector('[data-video-id="video-id-foo"]');
    const embeddedVideoBar = videoPlayerComposite.querySelector('[data-video-id="video-id-bar"]');
    const embeddedVideoBaz = videoPlayerComposite.querySelector('[data-video-id="video-id-baz"]');
    (embeddedVideoFoo as any).sendNotification = jasmine.createSpy();
    (embeddedVideoBar as any).sendNotification = jasmine.createSpy();
    (embeddedVideoBaz as any).sendNotification = jasmine.createSpy();
    videoPlayerComposite.videoId = 'video-id-bar';
    videoPlayerComposite.embeddedVideos = {
      'video-id-foo': embeddedVideoFoo,
      'video-id-bar': embeddedVideoBar,
      'video-id-baz': embeddedVideoBaz,
    };
    await Promise.resolve();
    expect((embeddedVideoFoo as HTMLElement).hidden).toBe(true);
    expect((embeddedVideoBar as HTMLElement).hidden).toBe(false);
    expect((embeddedVideoBaz as HTMLElement).hidden).toBe(true);
    expect((embeddedVideoFoo as any).sendNotification).toHaveBeenCalledWith('doStop');
    expect((embeddedVideoBar as any).sendNotification).not.toHaveBeenCalled();
    expect((embeddedVideoBaz as any).sendNotification).toHaveBeenCalledWith('doStop');
  });

  afterEach(function() {
    render(undefined!, document.body);
  });
});
