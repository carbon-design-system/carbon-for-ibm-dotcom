/**
   Copyright IBM Corp. 2016, 2020

   This source code is licensed under the Apache-2.0 license found in the
   LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";

import { Desktop } from "@carbon/pictograms-react";
import { ContentGroupPictograms } from "@carbon/ibmdotcom-react";

const App = () => (
  <div>
    <ContentGroupPictograms
      heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      items={[
        {
          heading: "Aliquam condimentum interdum",
          copy:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.",
          cta: {
            type: "local",
            href: "https://www.example.com",
            copy: "Lorem ipsum dolor"
          },
          pictogram: {
            src: Desktop,
            "aria-label": "Desktop Pictogram"
          }
        }
      ]}
    />
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
