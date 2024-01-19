/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import C4DCalloutWithMedia from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DCalloutWithMediaCopy from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media-copy';
import C4DCalloutWithMediaImage from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media-image';
import './index.css';

const App = () => (
  <C4DCalloutWithMedia>
    <C4DContentBlockHeading>Curabitur malesuada varius mi eu posuere</C4DContentBlockHeading>
    <C4DCalloutWithMediaCopy size="sm">lorum ipsum dolor sit ameet</C4DCalloutWithMediaCopy>
    <C4DCalloutWithMediaImage
      alt="Image alt text"
      default-src={'https://fpoimg.com/1584x891?bg_color=ee5396&text_color=161616'}
      heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit."></C4DCalloutWithMediaImage>
  </C4DCalloutWithMedia>
);

render(<App />, document.getElementById('root'));
