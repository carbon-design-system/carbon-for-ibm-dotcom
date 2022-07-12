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
import DDSCalloutWithMedia from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSCalloutWithMediaCopy from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media-copy';
import DDSCalloutWithMediaImage from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media-image';
import './index.css';

const App = () => (
  <DDSCalloutWithMedia>
    <DDSContentBlockHeading>Curabitur malesuada varius mi eu posuere</DDSContentBlockHeading>
    <DDSCalloutWithMediaCopy size="sm">lorum ipsum dolor sit ameet</DDSCalloutWithMediaCopy>
    <DDSCalloutWithMediaImage
      alt="Image alt text"
      default-src={'https://fpoimg.com/1584x891?bg_color=ee5396&text_color=161616'}
      heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit."></DDSCalloutWithMediaImage>
  </DDSCalloutWithMedia>
);

render(<App />, document.getElementById('root'));
