/**
  Copyright IBM Corp. 2016, 2020

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import items from "./items.json";
import React from "react";
import ReactDom from "react-dom";
import { ContentGroupHorizontal } from "@carbon/ibmdotcom-react";

const heading = "Aliquam condimentum";

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-lg-12">
        <ContentGroupHorizontal heading={heading} items={items["items"]} />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
