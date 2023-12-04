/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import C4DLightboxVideoPlayer from '../lightbox-video-player';
import C4DLightboxVideoPlayerComposite from '../lightbox-video-player-composite';
// Above import is interface-only ref and thus code won't be brought into the build
import '../lightbox-video-player-composite';

const template = (props?) => {
  const {
    embeddedVideos,
    formatCaption,
    formatDuration,
    hideCaption,
    videoId,
    mediaData,
  } = props ?? {};
  return html`
    <c4d-lightbox-video-player-composite
      ?hide-caption="${hideCaption}"
      video-id="${ifDefined(videoId)}"
      .embeddedVideos="${ifDefined(embeddedVideos)}"
      .formatCaption="${ifDefined(formatCaption)}"
      .formatDuration="${ifDefined(formatDuration)}"
      .mediaData="${ifDefined(mediaData)}">
    </c4d-lightbox-video-player-composite>
  `;
};

describe('c4d-lightbox-video-player-composite', function () {
  it('should send props to video player', async function () {
    const formatCaption = () => {};
    const formatDuration = () => {};
    render(
      template({ formatCaption, formatDuration, videoId: 'video-id-foo' }),
      document.body
    );
    await Promise.resolve(); // Micro-task cycle for `VideoPlayer`
    await Promise.resolve(); // Update cycle to render with `VideoPlayer` results
    const videoPlayerComposite = document.querySelector(
      'c4d-lightbox-video-player-composite'
    ) as C4DLightboxVideoPlayerComposite;
    const videoPlayer = (
      videoPlayerComposite.modalRenderRoot as Element
    ).querySelector('c4d-lightbox-video-player') as C4DLightboxVideoPlayer;
    expect(videoPlayer.formatCaption).toBe(formatCaption);
    expect(videoPlayer.formatDuration).toBe(formatDuration);
  });

  it('should render the video player', async function () {
    const mediaData = {
      'video-id-foo': {
        name: 'video-name-foo',
        description: 'video-description-foo',
        duration: 120,
      },
    };

    render(template({ mediaData, videoId: 'video-id-foo' }), document.body);
    await Promise.resolve();
    expect(
      (
        document.querySelector(
          'c4d-lightbox-video-player-composite'
        ) as C4DLightboxVideoPlayerComposite
      ).modalRenderRoot
    ).toMatchSnapshot();
  });

  it('should stop the current video as the modal is closed', async function () {
    render(template({ videoId: 'video-id-bar' }), document.body);
    await Promise.resolve();
    const lightboxVideoPlayerComposite = document.querySelector(
      'c4d-lightbox-video-player-composite'
    ) as C4DLightboxVideoPlayerComposite;
    const modalRenderRoot = (
      lightboxVideoPlayerComposite as C4DLightboxVideoPlayerComposite
    ).modalRenderRoot as Element;
    modalRenderRoot.querySelector('c4d-lightbox-video-player')!.innerHTML = `
      <div data-video-id="video-id-foo"></div>
      <div data-video-id="video-id-bar"></div>
      <div data-video-id="video-id-baz"></div>
    `;
    const embeddedVideoFoo = modalRenderRoot.querySelector(
      '[data-video-id="video-id-foo"]'
    );
    const embeddedVideoBar = modalRenderRoot.querySelector(
      '[data-video-id="video-id-bar"]'
    );
    const embeddedVideoBaz = modalRenderRoot.querySelector(
      '[data-video-id="video-id-baz"]'
    );
    (embeddedVideoFoo as any).sendNotification = jasmine.createSpy();
    (embeddedVideoBar as any).sendNotification = jasmine.createSpy();
    (embeddedVideoBaz as any).sendNotification = jasmine.createSpy();
    lightboxVideoPlayerComposite.embeddedVideos = {
      'video-id-foo': embeddedVideoFoo,
      'video-id-bar': embeddedVideoBar,
      'video-id-baz': embeddedVideoBaz,
    };
    await Promise.resolve();
    (lightboxVideoPlayerComposite.modalRenderRoot as Element).dispatchEvent(
      new CustomEvent('c4d-expressive-modal-closed', { bubbles: true })
    );
    expect((embeddedVideoFoo as any).sendNotification).not.toHaveBeenCalled();
    expect((embeddedVideoBar as any).sendNotification).toHaveBeenCalledWith(
      'doStop'
    );
    expect((embeddedVideoBaz as any).sendNotification).not.toHaveBeenCalled();
  });

  afterEach(function () {
    render(undefined!, document.body);
  });
});
