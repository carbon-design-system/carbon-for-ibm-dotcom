/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";

import { Layout } from "@carbon/ibmdotcom-react";

const App = () => (
  <Layout type="2-1" border={true}>
    <div
      style={{
        height: "450px",
        background: "#f4f4f4"
      }}
    >
      <h3>
        2-1 type Layout <br /> First column
      </h3>
    </div>
    <div
      style={{
        height: "450px",
        background: "#e0e0e0"
      }}
    >
      <h3>Second column</h3>
    </div>
  </Layout>
);

ReactDom.render(<App />, document.getElementById("app"));
