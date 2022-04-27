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
import DDSImageWithCaption from '@carbon/ibmdotcom-web-components/es/components-react/image-with-caption/image-with-caption.js';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item.js';
import './index.css';

const App = () => (
  <DDSImageWithCaption alt="Image alt text" heading="this is a heading" copy="lorum ipsum" lightbox>
    <DDSImageItem
      media="(min-wiidth:672px)"
      srcset="https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616"></DDSImageItem>
    <DDSImageItem
      media="(min-wiidth:400px)"
      srcset="https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616"></DDSImageItem>
    <DDSImageItem
      media="(min-wiidth:320px)"
      srcset="https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616"></DDSImageItem>
  </DDSImageWithCaption>
);

render(<App />, document.getElementById('root'));
