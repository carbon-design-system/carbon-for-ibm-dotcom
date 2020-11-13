/**
  Copyright IBM Corp. 2016, 2020

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import ArrowRight20 from "@carbon/icons-react/es/arrow--right/20";
import React from "react";
import ReactDom from "react-dom";
import { FeatureCardBlockMedium } from "@carbon/ibmdotcom-react";

const heading = "How is artificial intelligence used today in your industry?";
const card = {
  heading: "Explore AI use cases in all industries",
  cta: {
    href: "https://www.example.com",
    icon: {
      src: ArrowRight20,
    },
  },
  image: {
    defaultSrc: "https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616",
    alt: "Image alt text",
  },
};

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-lg-12">
        <FeatureCardBlockMedium heading={heading} card={card} />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
