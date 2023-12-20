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
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import C4DCardInCard from '@carbon/ibmdotcom-web-components/es/components-react/card-in-card/card-in-card';
import C4DCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import C4DCardInCardImage from '@carbon/ibmdotcom-web-components/es/components-react/card-in-card/card-in-card-image';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import './index.css';

const App = () => (
  <C4DCardInCard href="https://example.com">
    <C4DCardInCardImage slot="image" alt="Image alt text" default-src="https://picsum.photos/id/1076/480/360">
      <C4DImageItem media="(min-width: 1312px)" srcset="https://picsum.photos/id/1076/1312/738"></C4DImageItem>
      <C4DImageItem media="(min-width: 672px)" srcset="https://picsum.photos/id/1076/960/540"></C4DImageItem>
      <C4DImageItem media="(min-width: 320px)" srcset="https://picsum.photos/id/1076/480/360"></C4DImageItem>
    </C4DCardInCardImage>
    <C4DCardEyebrow>Label</C4DCardEyebrow>
    <C4DCardHeading>Standard Bank Group prepares to embrace Africa’s AI opportunity</C4DCardHeading>
    <C4DCardCTAFooter>
      <ArrowRight20 slot="icon" />
    </C4DCardCTAFooter>
  </C4DCardInCard>
);

render(<App />, document.getElementById('root'));
