/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./index.scss";
import { Footer } from "@carbon/ibmdotcom-vanilla";

async function _getFooter() {
  try {
    const template = await Footer.getFooterWithData();

    const yourapp = document.getElementById("app");
    yourapp.innerHTML = template;
    Footer.init(yourapp);
  } catch (error) {
    // This example seems to have polling timeout for `root.digitalData.page.isDataLayerReady`.
    console.error('Error fetching dotcom shell data:', error);
  }
}

_getFooter();
