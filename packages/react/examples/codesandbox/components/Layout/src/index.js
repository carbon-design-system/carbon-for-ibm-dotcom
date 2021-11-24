/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import { Layout } from "@carbon/ibmdotcom-react";
import React from "react";
import ReactDom from "react-dom";

const App = () => (
  <div className="bx--grid bx--layout--top-layout-03 bx--layout--bottom-layout-06">
      <div className="bx--row">
        <div className="bx--layout-1-3">
          div className="bx--layout--sticky" style=
          {{
            top: '50px',
          }}><h3>Column 1</h3>
        </div>
        <div className="bx--layout-2-3">
          <div><h3>Example Text</h3>
        </div>
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
