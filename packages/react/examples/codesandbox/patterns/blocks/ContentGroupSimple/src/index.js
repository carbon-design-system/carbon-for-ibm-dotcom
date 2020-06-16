/** 
  Copyright IBM Corp. 2016, 2020

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
*/

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";

import { ContentGroupSimple } from "@carbon/ibmdotcom-react";

const App = () => (
  <div>
    <ContentGroupSimple
      mediaType="image"
      mediaData={{
        image: {
          sources: [
            {
              src: "https://dummyimage.com/320x160/ee5396/161616&text=2x1",
              breakpoint: 320
            },
            {
              src: "https://dummyimage.com/400x400/ee5396/161616&text=1x1",
              breakpoint: 400
            },
            {
              src: "https://dummyimage.com/672x672/ee5396/161616&text=1x1",
              breakpoint: 672
            }
          ],
          alt: "Image alt text",
          defaultSrc: "https://dummyimage.com/672x672/ee5396/161616&text=1x1"
        }
      }}
      heading="Lorem ipsum dolor sit amet"
      items={[
        {
          heading: "Lorem ipsum dolor sit amet.",
          copy:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien."
        },
        {
          heading: "Lorem ipsum dolor sit amet.",
          copy:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien."
        },
        {
          heading: "Lorem ipsum dolor sit amet.",
          copy:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien."
        },
        {
          heading: "Lorem ipsum dolor sit amet.",
          copy:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien."
        }
      ]}
      cta={{
        cta: {
          href: "https://www.example.com"
        },
        style: "card",
        type: "local",
        copy: "Lorem ipsum dolor sit ametttt"
      }}
    />
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
