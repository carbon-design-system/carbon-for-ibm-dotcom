/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import { Quote } from "@carbon/ibmdotcom-react";
import React from "react";
import ReactDom from "react-dom";

const copy =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus, posuere at est vitae, ornare rhoncus sem. Suspendisse vitae tellus fermentum, hendrerit augue eu, placerat magna.";
const markType = "doubleCurved";
const cta = {
  copy: "Link with Icon",
  type: "local",
  href: "https://example.com",
};
const source = {
  heading: "Lorem ipsum dolor sit amet",
  copy: "consectetur adipiscing elit",
  copy2: "IBM Cloud",
};

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-12">
        <Quote markType={markType} copy={copy} source={source} cta={cta} />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
