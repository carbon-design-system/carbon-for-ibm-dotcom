/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "@carbon/ibmdotcom-styles/scss/components/masthead/index.scss";
import { Masthead } from "@carbon/ibmdotcom-vanilla";

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

async function _getMasthead() {
  const template = await Masthead.getMastheadWithData(
    mastheadProps.navigation,
    mastheadProps.platform,
    mastheadProps.hasNavigation,
    mastheadProps.hasProfile,
    mastheadProps.searchProps
  );

  const yourapp = document.getElementById("app");
  yourapp.innerHTML = template;
  Masthead.init();
}

_getMasthead();
