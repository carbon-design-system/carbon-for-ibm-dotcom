/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";
import { VideoPlayer } from "@carbon/ibmdotcom-react";

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-12">
        <VideoPlayer inverse={false} videoId="0_uka1msg4" showCaption={true} />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
