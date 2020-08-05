/**
  Copyright IBM Corp. 2016, 2020

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";

import { ContentBlockMixed } from "@carbon/ibmdotcom-react";

const App = () => (
  <div>
    <ContentBlockMixed
      heading="Lorem ipsum dolor sit amet"
      copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero."
      cta={{
        cta: {
          href: "https://www.ibm.com"
        },
        style: "text",
        type: "local",
        copy: "ContentGroupSimple CTA copy",
        heading: "ContentGroupSimple CTA heading"
      }}
      items={[
        {
          type: "ContentGroupCards",
          heading: "ContentGroupCards heading",
          items: [
            {
              heading: "ContentGroupCards item heading",
              copy: "ContentGroupCards item copy.",
              cta: {
                href: "https://www.ibm.com"
              }
            }
          ]
        },
        {
          type: "ContentGroupSimple",
          mediaType: "image",
          mediaData: {
            sources: [
              { src: "https://your-image.com/320/160", breakpoint: 320 },
              { src: "https://your-image.com/400/400", breakpoint: 400 },
              { src: "https://your-image.com/672/672", breakpoint: 672 }
            ],
            alt: "Image alt",
            defaultSrc: "https://your-image.com/672/672"
          },
          heading: "ContentGroupSimple heading.",
          items: [
            {
              heading: "ContentGroupSimple item heading.",
              copy: "ContentGroupSimple item copy."
            }
          ],
          cta: {
            cta: {
              href: "https://www.ibm.com"
            },
            style: "text",
            type: "local",
            copy: "ContentGroupSimple CTA copy",
            heading: "ContentGroupSimple CTA heading"
          }
        }
      ]}
    />
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
