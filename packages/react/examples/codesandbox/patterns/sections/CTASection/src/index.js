/**
  Copyright IBM Corp. 2016, 2020

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";
import { CTASection } from "@carbon/ibmdotcom-react";

const heading = "Take the next step";
const copy =
  "Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs.";
const cta = {
  style: "button",
  type: "local",
  buttons: [
    {
      type: "default",
      copy: "Secondary button",
      href: "https://example.com/",
    },
    {
      type: "default",
      copy: "Primary button",
      href: "https://example.com/",
    },
  ],
};
const items = [
  {
    heading: "Get connected",
    copy:
      "IBM DevOps partners have a wide range of expertise. Find one to build the right solution for you.",
    cta: {
      copy: "Find a partner",
      type: "local",
      href: "https://example.com/",
    },
  },
  {
    heading: "Learn how",
    copy:
      "IBM DevOps partners have a wide range of expertise. Find one to build the right solution for you.",
    cta: {
      copy: "Browse tutorials",
      type: "external",
      href: "https://example.com/",
    },
  },
];

const App = () => (
  <div>
    <CTASection heading={heading} copy={copy} cta={cta} items={items} />
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
