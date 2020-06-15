/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";

import { ArrowRight20 } from "@carbon/icons-react";
import { FeatureCard } from "@carbon/ibmdotcom-react";

const App = () => (
  <div>
    <FeatureCard
      card={{
        heading: "Lorem ipsum dolor sit amet.",
        image: {
          defaultSrc: "https://dummyimage.com/672x672/ee5396/161616&text=1x1",
          alt: "Image alt text"
        },
        cta: {
          href: "https://www.example.com",
          icon: {
            src: ArrowRight20
          }
        }
      }}
    />
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
