/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ReactDom from 'react-dom';
import { ImageWithCaption } from "@carbon/ibmdotcom-react/es/components/ImageWithCaption";

const image = {
  sources: [
    {
      src: 'https://fpoimg.com/320x160?text=2:1&bg_color=ee5396&text_color=161616',
      breakpoint: 'sm',
    },
    {
      src: 'https://fpoimg.com/400x200?text=2:1&bg_color=ee5396&text_color=161616',
      breakpoint: 'md',
    },
    {
      src: 'https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616',
      breakpoint: 'lg',
    },
  ],
  alt: 'Image with caption image',
  defaultSrc: 'https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616',
};
const copy = "This is a description of the image.";
const heading = "This is the image caption.";

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-8">
        <h4>Default</h4>
        <ImageWithCaption
          copy={copy}
          image={image}
          heading={heading}
          inverse={false}
        />
      </div>
    </div>
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-8">
        <h4>Opens in modal</h4>
        <ImageWithCaption
          copy={copy}
          image={image}
          heading={heading}
          inverse={false}
          lightbox={true}
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
