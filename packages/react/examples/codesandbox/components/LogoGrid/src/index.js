/**
  Copyright IBM Corp. 2016, 2020

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import logos from "./logos.json";
import React from "react";
import ReactDom from "react-dom";
import { LogoGrid } from "@carbon/ibmdotcom-react";

const heading = "Our customers";
const ctaCopy = "Lorem ipsum dolor sit amet";
const ctaHref = "http://local.url.com/";
const hideBorder = false;

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-lg-12">
        <LogoGrid
          heading={heading}
          logosGroup={logos}
          ctaCopy={ctaCopy}
          ctaHref={ctaHref}
          hideBorder={hideBorder}
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
