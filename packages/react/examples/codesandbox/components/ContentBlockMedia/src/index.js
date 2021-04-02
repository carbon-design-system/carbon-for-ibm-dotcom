/**
  Copyright IBM Corp. 2016, 2021

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import React from "react";
import ReactDom from "react-dom";

import { ContentBlockMedia } from "@carbon/ibmdotcom-react";

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">

        <ContentBlockMedia
          copy="Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean
              et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at
              elit sollicitudin, sodales nulla quis, *consequat* libero. Phasellus at
              elit sollicitudin, sodales nulla quis, consequat [libero](https://www.google.com)."
          heading="Content Block - with Media"
          items={[
            {
              mediaType: "image",
              mediaData: {
                heading: "Lorem ipsum dolor sit amet.",
                image: {
                  sources: [
                    {
                      src:
                        "https://dummyimage.com/320x180/ee5396/161616&text=16:9",
                      breakpoint: 320,
                    },
                    {
                      src:
                        "https://dummyimage.com/400x225/ee5396/161616&text=16:9",
                      breakpoint: 400,
                    },
                    {
                      src:
                        "https://dummyimage.com/672x378/ee5396/161616&text=16:9",
                      breakpoint: 672,
                    },
                  ],
                  alt: "Image alt text",
                  defaultSrc:
                    "https://dummyimage.com/672x378/ee5396/161616&text=16:9",
                },
              },
              heading: "Lorem ipsum dolor sit amet",
              items: [
                {
                  heading: "Lorem ipsum dolor sit amet.",
                  copy:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.",
                },
                {
                  heading: "Lorem ipsum dolor sit amet.",
                  copy:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.",
                },
              ],
              cta: {
                cta: {
                  href: "https://www.example.com",
                },
                style: "card",
                type: "local",
                copy: "Lorem ipsum dolor sit ametttt",
              },
            },
            {
              mediaType: "image",
              mediaData: {
                heading: "Lorem ipsum dolor sit amet.",
                image: {
                  sources: [
                    {
                      src:
                        "https://dummyimage.com/320x180/ee5396/161616&text=16:9",
                      breakpoint: 320,
                    },
                    {
                      src:
                        "https://dummyimage.com/400x225/ee5396/161616&text=16:9",
                      breakpoint: 400,
                    },
                    {
                      src:
                        "https://dummyimage.com/672x378/ee5396/161616&text=16:9",
                      breakpoint: 672,
                    },
                  ],
                  alt: "Image alt text",
                  defaultSrc:
                    "https://dummyimage.com/672x378/ee5396/161616&text=16:9",
                },
              },
              heading: "Lorem ipsum dolor sit amet",
              items: [
                {
                  heading: "Lorem ipsum dolor sit amet.",
                  copy:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.",
                },
                {
                  heading: "Lorem ipsum dolor sit amet.",
                  copy:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.",
                },
              ],
              cta: {
                cta: {
                  href: "https://www.example.com",
                },
                style: "card",
                type: "local",
                copy: "Lorem ipsum dolor sit ametttt",
              },
            },
          ]}
          cta={{
            heading: "Feature Card",
            card: {
              type: 'local',
              heading: "Consectetur adipisicing elit",
              image: {
                defaultSrc:
                  "https://dummyimage.com/672x672/ee5396/161616&text=1x1",
                alt: "Image alt text",
              },
              cta: {
                href: 'https://www.example.com',
              },
            },
          }}
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
