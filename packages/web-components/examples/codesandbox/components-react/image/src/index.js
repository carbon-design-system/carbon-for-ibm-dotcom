/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image.js';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item.js';
import './index.css';

const App = () => (
  <DDSImage alt="Image alt text">
    <DDSImageItem
      media="(min-width:672px)"
      srcset="https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616"></DDSImageItem>
    <DDSImageItem
      media="(min-width:400px)"
      srcset="https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616"></DDSImageItem>
    <DDSImageItem
      media="(min-width:320px)"
      srcset="https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616"></DDSImageItem>
  </DDSImage>
);

render(<App />, document.getElementById('root'));
