/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import { HorizontalRule } from "@carbon/ibmdotcom-react";
import React from "react";
import ReactDom from "react-dom";

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-8">
        <h4>Default</h4>
        <HorizontalRule />
      </div>
    </div>
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-8">
        <h4>Dashed</h4>
        <HorizontalRule style="dashed" />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
