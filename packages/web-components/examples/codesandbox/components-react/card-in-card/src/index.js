/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import DDSCardInCard from '@carbon/ibmdotcom-web-components/es/components-react/card-in-card/card-in-card';
import DDSCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import DDSCardInCardImage from '@carbon/ibmdotcom-web-components/es/components-react/card-in-card/card-in-card-image';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import './index.css';

const App = () => (
  <DDSCardInCard href="https://example.com">
    <DDSCardInCardImage slot="image" alt="Image alt text" default-src="https://picsum.photos/id/1076/480/360">
      <DDSImageItem media="(min-width: 1312px)" srcset="https://picsum.photos/id/1076/1312/738"></DDSImageItem>
      <DDSImageItem media="(min-width: 672px)" srcset="https://picsum.photos/id/1076/960/540"></DDSImageItem>
      <DDSImageItem media="(min-width: 320px)" srcset="https://picsum.photos/id/1076/480/360"></DDSImageItem>
    </DDSCardInCardImage>
    <DDSCardEyebrow>Label</DDSCardEyebrow>
    <DDSCardHeading>Standard Bank Group prepares to embrace Africa’s AI opportunity</DDSCardHeading>
    <DDSCardCTAFooter>
      <ArrowRight20 slot="icon" />
    </DDSCardCTAFooter>
  </DDSCardInCard>
);

render(<App />, document.getElementById('root'));
