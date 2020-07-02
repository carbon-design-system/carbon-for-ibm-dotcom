/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import "./styles.scss";
import { Masthead } from "@carbon/ibmdotcom-react";

export default function App() {
  const mastheadProps = {
    navigation: "default",
    platform: {
      name: "IBM Cloud",
      url: "https://www.ibm.com/cloud",
    },
    hasNavigation: true,
    hasProfile: true,
    searchProps: {
      hasSearch: true,
      placeHolderText: "Search all of IBM",
      searchOpenOnload: false,
    },
  };
  return (
    <div className="App">
      <Masthead {...mastheadProps} />
    </div>
  );
}
