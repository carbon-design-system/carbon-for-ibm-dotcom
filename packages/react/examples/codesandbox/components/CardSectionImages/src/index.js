/**
 Copyright IBM Corp. 2016, 2020

 This source code is licensed under the Apache-2.0 license found in the
 LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";

import { CardSectionImages } from "@carbon/ibmdotcom-react";

const App = () => (
  <div>
    <CardSectionImages
      cards={[
        {
          image: {
            defaultSrc:
              "https://dummyimage.com/1056x792/ee5396/161616%26text=4:3",
            alt: "Image alt text"
          },
          eyebrow: "Topic",
          heading: "Natural language processing.",
          cta: {
            href: "https://www.example.com"
          }
        },
        {
          image: {
            defaultSrc:
              "https://dummyimage.com/792x1056/ee5396/161616%26text=3:4",
            alt: "Image alt text"
          },
          eyebrow: "Blog",
          heading: "Natural language processing.",
          cta: {
            href: "https://www.example.com"
          }
        },
        {
          image: {
            defaultSrc:
              "https://dummyimage.com/1056x1056/ee5396/161616%26text=1:1",
            alt: "Image alt text"
          },
          eyebrow: "Topic",
          heading: "Natural language processing.",
          cta: {
            href: "https://www.example.com"
          }
        },
        {
          image: {
            defaultSrc:
              "https://dummyimage.com/1056x528/ee5396/161616%26text=2:1",
            alt: "Image alt text"
          },
          eyebrow: "Blog",
          heading:
            "Serving society ethically in the age of Artificial Intelligence.",
          cta: {
            href: "https://www.example.com"
          }
        },
        {
          image: {
            defaultSrc:
              "https://dummyimage.com/1056x594/ee5396/161616%26text=16:9",
            alt: "Image alt text"
          },
          eyebrow: "Topic",
          heading:
            "Serving society ethically in the age of Artificial Intelligence.",
          cta: {
            href: "https://www.example.com"
          }
        }
      ]}
      heading="Lorem ipsum dolor sit amet"
    />
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
