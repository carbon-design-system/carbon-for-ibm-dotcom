/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'carbon-custom-elements/es/components/modal/modal-close-button';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';
import '@carbon/ibmdotcom-web-components/es/components/cta/text-cta';
import '@carbon/ibmdotcom-web-components/es/components/modal/modal';
import '@carbon/ibmdotcom-web-components/es/components/lightbox-media-viewer/lightbox-media-viewer-body';
import '@carbon/ibmdotcom-web-components/es/components/lightbox-media-viewer/lightbox-video-player';

document.addEventListener('dds-cta-run-action', async event => {
  const videoId = event.detail.href;
  const lightboxId = `lightbox-${videoId}`;
  let lightboxElem = document.getElementById(lightboxId);
  if (!lightboxElem) {
    lightboxElem = document.createElement('dds-modal');
    lightboxElem.size = 'full-width';
    lightboxElem.innerHTML = `
      <bx-modal-close-button></bx-modal-close-button>
      <dds-lightbox-media-viewer-body>
        <dds-lightbox-video-player id="lightbox-video-player-${videoId}"></dds-lightbox-video-player>
      </dds-lightbox-media-viewer-body>
    `;
    document.body.appendChild(lightboxElem);
    const videoTarget = document.createElement('div');
    videoTarget.id = `video-target-${videoId}`;
    videoTarget.className = 'bx--video-player__video';
    const videoPlayer = document.getElementById(`lightbox-video-player-${videoId}`);
    videoPlayer.appendChild(videoTarget);
    const [videoData] = await Promise.all([
      VideoPlayerAPI.api(videoId),
      VideoPlayerAPI.embedVideo(videoId, videoTarget.id, true),
    ]);
    const { name, description, duration } = videoData;
    videoPlayer.name = name;
    videoPlayer.duration = duration;
    videoPlayer.description = description;
  }
  lightboxElem.open = true;
});
