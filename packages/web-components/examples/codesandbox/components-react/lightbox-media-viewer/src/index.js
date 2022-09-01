/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import DDSButtonExpressive from '@carbon/ibmdotcom-web-components/es/components-react/button/button';
import DDSLightboxVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/lightbox-media-viewer/lightbox-video-player-container';

import './index.css';

const App = () => (
  <>
    <DDSButtonExpressive id="open-modal-btn">Open modal</DDSButtonExpressive>
    <DDSLightboxVideoPlayerContainer id="my-video" video-id="1_9h94wo6b"></DDSLightboxVideoPlayerContainer>
  </>
);

render(<App />, document.getElementById('root'));

document.getElementById('open-modal-btn').addEventListener('click', () => {
  document.getElementById('my-video').open = true;
});
