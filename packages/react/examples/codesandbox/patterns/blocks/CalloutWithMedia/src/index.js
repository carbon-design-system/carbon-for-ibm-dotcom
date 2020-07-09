/**
  Copyright IBM Corp. 2016, 2020

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";
import { CalloutWithMedia } from "@carbon/ibmdotcom-react";

const image = {
  heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  image: {
    sources: [
      {
        src: "https://dummyimage.com/320x180/ee5396/161616&text=16:9",
        breakpoint: 320,
      },
      {
        src: "https://dummyimage.com/400x225/ee5396/161616&text=16:9",
        breakpoint: 400,
      },
      {
        src: "https://dummyimage.com/672x378/ee5396/161616&text=16:9",
        breakpoint: 672,
      },
    ],
    alt: "Image alt text",
    defaultSrc: "https://dummyimage.com/672x378/ee5396/161616&text=16:9",
  },
};
const video = {
  videoId: "0_uka1msg4",
  showCaption: true,
};
const heading = "Curabitur malesuada varius mi eu posuere";
const copy =
  "Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.\n      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales\n      nulla quis, *consequat* libero. Here are\n      some common categories:";

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-lg-12">
        <h4>CalloutWithMedia - Image</h4>
        <div>
          <CalloutWithMedia
            mediaData={image}
            mediaType="image"
            heading={heading}
            copy={copy}
          />
        </div>
        <h4 style={{ paddingTop: "2rem" }}>CalloutWithMedia - Video</h4>
        <div>
          <CalloutWithMedia
            mediaData={video}
            mediaType="video"
            heading={heading}
            copy={copy}
          />
        </div>
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
