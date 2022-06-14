/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import ArrowRight20 from "@carbon/icons-react/es/arrow--right/20";
import { CTA } from "@carbon/ibmdotcom-react";
import React from "react";
import ReactDom from "react-dom";

const ctaLocal = {
  style: "text",
  href: "https://www.example.com",
  copy: "Lorem ipsum dolor sit amet",
  media: {
    type: "video",
    src: "1_9h94wo6b",
  },
};

const ctaButton = {
  style: "button",
  buttons: [
    {
      type: "video",
      href: "https://www.example.com",
      copy: "Lorem Ipsum",
      media: {
        src: "1_9h94wo6b",
        type: "video"
      },
    },
    {
      type: "external",
      href: "https://www.example.com",
      copy: "Lorem Ipsum",
      renderIcon: ArrowRight20
    },
  ],
};

const card = {
  style: "card",
  copy: "Lorem ipsum dolor sit amet",
  cta: {
    href: "https://www.example.com",
  },
};

const feature = {
  style: "feature",
  heading: "Lorem ipsum dolor sit amet",
  card: {
    type: 'local',
    heading: "Consectetur adipisicing elit",
    cta: {
      href: "https://www.example.com",
    },
    image: {
      defaultSrc: "https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616",
      alt: "Image alt text",
    },
  },
};

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-10">
        <h4>Text CTA</h4>
        <CTA type="local" {...ctaLocal} />
        <CTA type="video" {...ctaLocal} id="cta-video"/>
      </div>
    </div>
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-10">
        <h4>Button CTA</h4>
        <CTA type="video" {...ctaButton} />
      </div>
    </div>
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-10">
        <h4>Card CTA</h4>
        <CTA type="local" {...card} />
      </div>
    </div>
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-10">
        <h4>Feature CTA</h4>
        <CTA type="local" {...feature} />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
