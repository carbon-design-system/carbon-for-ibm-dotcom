/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ArrowRight20 from "@carbon/icons-react/es/arrow--right/20";
import { FeatureCard } from "@carbon/ibmdotcom-react/es/components/FeatureCard";
import ReactDom from 'react-dom';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-8">
        <FeatureCard
          card={{
            heading: "Lorem ipsum dolor sit amet.",
            image: {
              defaultSrc:
                "https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616",
              alt: "Image alt text",
            },
            cta: {
              href: "https://www.example.com",
              icon: {
                src: ArrowRight20,
              },
            },
          }}
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
