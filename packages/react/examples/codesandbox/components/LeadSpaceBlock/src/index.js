/**
  Copyright IBM Corp. 2016, 2022

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ReactDom from 'react-dom';
import { LeadSpaceBlock } from "@carbon/ibmdotcom-react/es/components/LeadSpaceBlock";

const title = "Continuous delivery";
const heading = "Innovate like a startup and scale for the enterprise ";
const copy = `Automate your software release process with continuous delivery (CD)—the most
            critical part of adopting DevOps. Build, test, and deploy code changes quickly,
            ensuring software is always ready for deployment.`;
const mediaData = {
  heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  image: {
    sources: [
      {
        src: "https://fpoimg.com/672x672?text=16:9&bg_color=ee5396&text_color=161616",
        breakpoint: 320,
      },
      {
        src: "https://fpoimg.com/400x225?text=16:9&bg_color=ee5396&text_color=161616",
        breakpoint: 400,
      },
      {
        src: "https://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616",
        breakpoint: 672,
      },
    ],
    alt: "Image alt text",
    defaultSrc: "https://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616",
  },
};
const items = {
  heading: "Featured products",
  items: [
    {
      type: "local",
      copy: "IBM Cloud Continuous Delivery",
      cta: {
        href: "https://ibm.com",
      },
    },
    {
      type: "local",
      copy: "UrbanCode",
      cta: {
        href: "https://ibm.com",
      },
    },
    {
      type: "download",
      copy: "View all products",
      cta: {
        href: "https://ibm.com",
      },
    },
  ],
};
const cta = {
  style: "button",
  type: "local",
  buttons: [
    {
      type: "local",
      copy: "Contact sales",
      href: "https://example.com/",
    },
  ],
};

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-lg-8">
        <LeadSpaceBlock
          title={title}
          copy={copy}
          heading={heading}
          mediaType="image"
          mediaData={mediaData}
          items={items}
          cta={cta}
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
