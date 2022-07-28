/**
 Copyright IBM Corp. 2016, 2022

 This source code is licensed under the Apache-2.0 license found in the
 LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ReactDom from 'react-dom';
import { CardSectionImages } from '@carbon/ibmdotcom-react/es/components/CardSectionImages';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-16">
        <CardSectionImages
          cards={[
            {
              image: {
                defaultSrc:
                  "https://fpoimg.com/1056x792?text=4:3&bg_color=ee5396&text_color=161616",
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
                  "https://fpoimg.com/792x1056?text=3:4&bg_color=ee5396&text_color=161616",
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
                  "https://fpoimg.com/1056x1056?text=1:1&bg_color=ee5396&text_color=161616",
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
                  "https://fpoimg.com/1056x528?text=2:1&bg_color=ee5396&text_color=161616",
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
                  "https://fpoimg.com/1056x594?text=16:9&bg_color=ee5396&text_color=161616",
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
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
