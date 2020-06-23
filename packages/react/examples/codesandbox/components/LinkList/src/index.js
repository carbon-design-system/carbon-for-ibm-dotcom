/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";

import { LinkList } from "@carbon/ibmdotcom-react";

const App = () => (
  <div>
    <LinkList
      heading="Lorem ipsum dolor sit amet"
      items={[
        {
          heading: "Containerization: A Complete Guide",
          type: "local",
          copy: "Lorem ipsum dolor sit amet",
          cta: {
            href: "https://ibm.com"
          }
        },
        {
          heading: "Why should you use microservices and containers?",
          type: "external",
          copy: "Lorem ipsum dolor sit amet",
          cta: {
            href: "https://ibm.com"
          }
        },
        {
          type: "video",
          media: {
            src: "0_uka1msg4",
            type: "video"
          }
        }
      ]}
    />
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
