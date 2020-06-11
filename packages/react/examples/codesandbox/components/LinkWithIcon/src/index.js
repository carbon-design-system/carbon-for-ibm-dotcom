/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";

import { ArrowRight20 } from "@carbon/icons-react";
import { LinkWithIcon } from "@carbon/ibmdotcom-react";

const App = () => (
  <div>
    <LinkWithIcon href="https://www.example.com">
      <span>LinkWithIcon</span>
      <ArrowRight20 />
    </LinkWithIcon>
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
