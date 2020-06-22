/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";
import { LocaleModal } from "@carbon/ibmdotcom-react";

const App = () => <LocaleModal isOpen={true} />;

ReactDom.render(<App />, document.getElementById("app"));
