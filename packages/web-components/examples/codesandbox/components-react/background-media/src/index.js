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
import C4DBackgroundMedia from '@carbon/ibmdotcom-web-components/es/components-react/background-media/background-media';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import './index.css';

const App = () => (
  <C4DBackgroundMedia
    gradient-direction={'left-to-right'}
    mobile-position=""
    alt={'Image alt text'}
    default-src={'https://fpoimg.com/1584x560?&bg_color=ee5396&text_color=161616'}>
    <C4DImageItem
      media="(min-width: 1584px)"
      srcset={'https://fpoimg.com/1584x560?&bg_color=ee5396&text_color=161616'}></C4DImageItem>
    <C4DImageItem
      media="(min-width: 1312px)"
      srcset={'https://fpoimg.com/1594x887?text=16:9&bg_color=ee5396&text_color=161616'}></C4DImageItem>
    <C4DImageItem
      media="(min-width: 672px)"
      srcset={'https://fpoimg.com/1594x887?text=16:9&bg_color=ee5396&text_color=161616'}></C4DImageItem>
    <C4DImageItem
      media="(min-width: 320px)"
      srcset={'https://fpoimg.com/480x360?text=4:3&bg_color=ee5396&text_color=161616'}></C4DImageItem>
    <C4DImageItem
      media="(min-width: 0px)"
      srcset={'https://fpoimg.com/480x360?text=4:3&bg_color=ee5396&text_color=161616'}></C4DImageItem>
  </C4DBackgroundMedia>
);

render(<App />, document.getElementById('root'));
