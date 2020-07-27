/**
  Copyright IBM Corp. 2016, 2020

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";

import { ContentBlockMedia } from "@carbon/ibmdotcom-react";

const App = () => (
  <div>
    <ContentBlockMedia
      copy="dolor sit amet"
      heading="Lorem ipsum"
      items={[
        {
          mediaType: "image",
          mediaData: {
            heading: "Lorem ipsum dolor sit amet.",
            image: {
              sources: [
                {
                  src: "https://dummyimage.com/320x180/ee5396/161616&text=16:9",
                  breakpoint: 320
                },
                {
                  src: "https://dummyimage.com/400x225/ee5396/161616&text=16:9",
                  breakpoint: 400
                },
                {
                  src: "https://dummyimage.com/672x378/ee5396/161616&text=16:9",
                  breakpoint: 672
                }
              ],
              alt: "Image alt text",
              defaultSrc:
                "https://dummyimage.com/672x378/ee5396/161616&text=16:9"
            }
          },
          heading: "Lorem ipsum dolor sit amet",
          items: [
            {
              heading: "Lorem ipsum dolor sit amet.",
              copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
              heading: "Lorem ipsum dolor sit amet.",
              copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            }
          ]
        }
      ]}
    />
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
