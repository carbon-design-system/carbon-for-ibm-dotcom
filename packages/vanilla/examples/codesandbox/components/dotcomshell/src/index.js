/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "@carbon/ibmdotcom-styles/scss/components/dotcom-shell/_dotcom-shell.scss";
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
  const template = await DotcomShell.getDotcomShellWithData({
    content,
    ...dotcomShellProps,
  });

  const yourapp = document.getElementById("app");
  yourapp.innerHTML = template;
  DotcomShell.init(yourapp);
}

_loadDotcomShell();
