/**
  Copyright IBM Corp. 2016, 2022

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ReactDom from 'react-dom';
import { CalloutWithMedia } from '@carbon/ibmdotcom-react/es/components/CalloutWithMedia';

const image = {
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
const video = {
  videoId: "1_9h94wo6b",
  showCaption: true,
};
const heading = "Curabitur malesuada varius mi eu posuere";
const copy =
  "Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.\n      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales\n      nulla quis, *consequat* libero. Here are\n      some common categories:";

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-lg-12">
        <h4>CalloutWithMedia - Image</h4>
        <div>
          <CalloutWithMedia
            mediaData={image}
            mediaType="image"
            heading={heading}
            copy={copy}
          />
        </div>
        <h4 style={{ paddingTop: "2rem" }}>CalloutWithMedia - Video</h4>
        <div>
          <CalloutWithMedia
            mediaData={video}
            mediaType="video"
            heading={heading}
            copy={copy}
          />
        </div>
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
