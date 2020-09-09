/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'carbon-web-components/es/components/modal/modal-close-button';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';
import '@carbon/ibmdotcom-web-components/es/components/button/button';
import '@carbon/ibmdotcom-web-components/es/components/modal/modal';
import '@carbon/ibmdotcom-web-components/es/components/lightbox-media-viewer/lightbox-video-player';

document.addEventListener('click', async event => {
  if (event.target.id === 'open-modal-btn') {
    const lightbox = document.getElementById('lightbox');
    lightbox.open = true;
    const videoPlayer = document.getElementById('video-player');
    const videoTarget = document.createElement('div');
    videoTarget.id = 'video-target';
    videoTarget.className = 'bx--video-player__video';
    videoPlayer.appendChild(videoTarget);
    const [videoData] = await Promise.all([
      VideoPlayerAPI.api('0_uka1msg4'),
      VideoPlayerAPI.embedVideo('0_uka1msg4', videoTarget.id, true),
    ]);
    const { name, description, duration } = videoData;
    videoPlayer.name = name;
    videoPlayer.duration = duration;
    videoPlayer.description = description;
  }
});
