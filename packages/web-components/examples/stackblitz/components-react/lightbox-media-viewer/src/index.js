/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import C4DButton from '@carbon/ibmdotcom-web-components/es/components-react/button/button';
import C4DLightboxVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/lightbox-media-viewer/lightbox-video-player-container';

import './index.css';

const App = () => (
  <>
    <C4DButton id="open-modal-btn">Open modal</C4DButton>
    <C4DLightboxVideoPlayerContainer id="my-video" video-id="1_9h94wo6b"></C4DLightboxVideoPlayerContainer>
  </>
);

render(<App />, document.getElementById('root'));

document.getElementById('open-modal-btn').addEventListener('click', () => {
  document.getElementById('my-video').open = true;
});
