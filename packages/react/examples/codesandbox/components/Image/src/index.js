/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ReactDom from 'react-dom';
import { Image } from "@carbon/ibmdotcom-react/es/components/Image";

const image = [
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
];
const alt = "Image alt text";
const defaultSrc = "https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616";

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-8">
        <Image sources={image} defaultSrc={defaultSrc} alt={alt} />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
