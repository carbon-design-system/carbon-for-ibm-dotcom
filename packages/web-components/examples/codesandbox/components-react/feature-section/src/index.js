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
import C4DFeatureSection from '@carbon/ibmdotcom-web-components/es/components-react/feature-section/feature-section.js';
import C4DCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DContentItemParagraph from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-paragraph';
import C4DFeatureSection from '@carbon/ibmdotcom-web-components/es/components-react/feature-section/feature-section';
import C4DCard from '@carbon/ibmdotcom-web-components/es/components-react/card/card';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import './index.css';

const App = () => (
  <C4DFeatureSection media-alignment={'left'}>
      <C4DImage slot="image" default-src={'https://fpoimg.com/1584x1584?text=1:1&bg_color=ee5396&text_color=161616'}>
        <C4DImageItem 
          media="(min-width: 1312px)"
          srcset={'https://fpoimg.com/1584x1584?text=1:1&bg_color=ee5396&text_color=161616'}></C4DImageItem>
        <C4DImageItem
          media="(min-width: 672px)"
          srcset={'https://fpoimg.com/1584x1584?text=1:1&bg_color=ee5396&text_color=161616'}></C4DImageItem>
        <C4DImageItem
          media="(min-width: 320px)"
          srcset={'https://fpoimg.com/960x720?text=4:3&bg_color=ee5396&text_color=161616'}></C4DImageItem>
        <C4DImageItem
          media="(min-width: 320px)"
          srcset={'https://fpoimg.com/720x720?text=1:1&bg_color=ee5396&text_color=161616'}></C4DImageItem>
        <C4DImageItem 
          media="(min-width: 320px)"
          srcset={'https://fpoimg.com/320x320?text=1:1&bg_color=ee5396&text_color=161616'}></C4DImageItem>
      </C4DImage>
      <C4DCardEyebrow>5 min activity</C4DCardEyebrow>
      <C4DContentBlockHeading>Ready when you are</C4DContentBlockHeading>
      <C4DContentItemParagraph slot="copy">Copy example</C4DContentItemParagraph>

      <C4DCard link slot="footer" href={'https://example.com'} cta-type={'local'} color-scheme="inverse">
        <C4DCardHeading>Try a free virtual business framing session with IBM Garage</C4DCardHeading>
        <C4DCardFooter color-scheme="inverse"> </C4DCardFooter>
      </C4DCard>
    </C4DFeatureSection>
);

render(<App />, document.getElementById('root'));
