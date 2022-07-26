/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ReactDom from 'react-dom';
import { VideoPlayer } from "@carbon/ibmdotcom-react/es/components/VideoPlayer";

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-12">
        <VideoPlayer inverse={false} videoId="1_9h94wo6b" showCaption />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
