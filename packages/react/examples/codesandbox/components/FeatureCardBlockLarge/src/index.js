/**
  Copyright IBM Corp. 2016, 2020

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import ArrowRight20 from "@carbon/icons-react/es/arrow--right/20";
import React from "react";
import ReactDom from "react-dom";
import { FeatureCardBlockLarge } from "@carbon/ibmdotcom-react";

const eyebrow = "This is an eyebrow";
const heading = "Explore AI use cases in all industries";
const copy =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const cta = {
  href: "https://www.example.com",
  icon: {
    src: ArrowRight20,
  },
};
const image = {
  defaultSrc: "https://dummyimage.com/600x300/ee5396/161616&text=2:1",
  alt: "Image alt text",
};

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-lg-12">
        <FeatureCardBlockLarge
          eyebrow={eyebrow}
          heading={heading}
          copy={copy}
          cta={cta}
          image={image}
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
