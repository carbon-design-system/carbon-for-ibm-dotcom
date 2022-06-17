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
import DDSVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import './index.css';

const App = () => (
  <>
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--offset-lg-3 bx--col-lg-13">
          <DDSVideoPlayerContainer aspectRatio="1x1" videoId="1_9h94wo6b" />
        </div>
      </div>
    </div>
  </>
);

render(<App />, document.getElementById('root'));
