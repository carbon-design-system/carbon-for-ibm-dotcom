/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./index.scss";
import content from "./data/content";
import { DotcomShell } from "@carbon/ibmdotcom-vanilla";

const dotcomShellProps = {
  masthead: {
    navigation: "default",
    platform: {
      name: "IBM Cloud",
      url: "https://www.ibm.com/cloud",
    },
    searchProps: {
      hasSearch: true,
      placeHolderText: "Search all of IBM",
      searchOpenOnload: false,
    },
    hasNavigation: true,
    hasProfile: true,
  },
  footer: {
    footerType: "tall",
  },
};

async function _loadDotcomShell() {
  try {
    const template = await DotcomShell.getDotcomShellWithData({
      content,
      ...dotcomShellProps,
    });

    const yourapp = document.getElementById("app");
    yourapp.innerHTML = template;
    DotcomShell.init(yourapp);
  } catch (error) {
    // This example seems to have polling timeout for `root.digitalData.page.isDataLayerReady`.
    console.error('Error fetching dotcom shell data:', error);
  }
}

_loadDotcomShell();
