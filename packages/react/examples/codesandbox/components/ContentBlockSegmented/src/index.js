/**
  Copyright IBM Corp. 2016, 2020

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
*/

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";

import { ContentBlockSegmented } from "@carbon/ibmdotcom-react";

const App = () => (
  <div>
    <ContentBlockSegmented
      heading="Lorem ipsum dolor sit amet."
      copy="Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit."
      mediaType="image"
      mediaData={{
        heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
          defaultSrc: "https://dummyimage.com/672x378/ee5396/161616&text=16:9"
        }
      }}
      items={[
        {
          heading: "Lorem ipsum dolor sit amet.",
          copy:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit."
        },
        {
          heading: "Lorem ipsum dolor sit amet.",
          copy:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.",
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
            defaultSrc: "https://dummyimage.com/672x378/ee5396/161616&text=16:9"
          }
        }
      ]}
    />
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
