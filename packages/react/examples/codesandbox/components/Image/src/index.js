/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";
import { Image } from "@carbon/ibmdotcom-react";

const image = [
  {
    src: 'https://dummyimage.com/320x160/ee5396/161616&text=2x1',
    breakpoint: 'sm',
  },
  {
    src: 'https://dummyimage.com/400x200/ee5396/161616&text=2x1',
    breakpoint: 'md',
  },
  {
    src: 'https://dummyimage.com/672x336/ee5396/161616&text=2x1',
    breakpoint: 'lg',
  },
];
const alt = "Image alt text";
const defaultSrc = "https://dummyimage.com/672x336/ee5396/161616&text=2x1";

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-8">
        <Image sources={image} defaultSrc={defaultSrc} alt={alt} />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
