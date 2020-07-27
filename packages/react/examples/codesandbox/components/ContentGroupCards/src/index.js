/**
  Copyright IBM Corp. 2016, 2020

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";

import { ContentGroupCards } from "@carbon/ibmdotcom-react";

const App = () => (
  <div>
    <ContentGroupCards
      heading="Lorem ipsum dolor sit amet"
      items={[
        {
          heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          copy:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          cta: {
            href: "https://www.example.com"
          }
        },
        {
          heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          copy:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          cta: {
            href: "https://www.example.com"
          }
        },
        {
          heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          copy:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          cta: {
            href: "https://www.example.com"
          }
        },
        {
          heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          copy:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          cta: {
            href: "https://www.example.com"
          }
        }
      ]}
    />
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
