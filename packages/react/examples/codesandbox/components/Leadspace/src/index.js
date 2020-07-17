/**
  Copyright IBM Corp. 2016, 2020

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";

import { LeadSpace } from "@carbon/ibmdotcom-react";
import { ArrowRight20 } from "@carbon/icons-react";

const App = () => (
  <div>
    <LeadSpace
      type="default"
      theme="g100"
      title="Lorem Ipsum"
      copy="Lorem Ipsum Dolor"
      gradient={true}
      buttons={[
        {
          copy: "Button 1",
          renderIcon: ArrowRight20,
          href: "https://www.example.com"
        },
        {
          copy: "Button 2",
          renderIcon: ArrowRight20,
          href: "https://www.example.com"
        }
      ]}
      image={{
        sources: [
          { src: "https://picsum.photos/id/1076/320/370", breakpoint: "sm" },
          { src: "https://picsum.photos/id/1076/672/400", breakpoint: "md" }
        ],
        defaultSrc: "https://picsum.photos/id/1076/1056/480",
        alt: "lead space image"
      }}
    />
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
