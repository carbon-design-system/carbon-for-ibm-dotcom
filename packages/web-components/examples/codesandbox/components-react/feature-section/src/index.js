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
import DDSFeatureSection from '@carbon/ibmdotcom-web-components/es/components-react/feature-section/feature-section.js';
import DDSCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSContentItemParagraph from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-paragraph';
import DDSFeatureSection from '@carbon/ibmdotcom-web-components/es/components-react/feature-section/feature-section';
import DDSFeatureSectionCardLink from '@carbon/ibmdotcom-web-components/es/components-react/feature-section/feature-section-card-link';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import './index.css';

const App = () => (
  <DDSFeatureSection media-alignment={'left'}>
    <DDSImage slot="image" default-src={'https://fpoimg.com/1584x1584?text=1:1&bg_color=ee5396&text_color=161616'}>
      <DDSImageItem
        media="(min-width: 1312px)"
        srcset={'https://fpoimg.com/1584x1584?text=1:1&bg_color=ee5396&text_color=161616'}></DDSImageItem>
      <DDSImageItem
        media="(min-width: 672px)"
        srcset={'https://fpoimg.com/1584x1584?text=1:1&bg_color=ee5396&text_color=161616'}></DDSImageItem>
      <DDSImageItem
        media="(min-width: 320px)"
        srcset={'https://fpoimg.com/960x720?text=4:3&bg_color=ee5396&text_color=161616'}></DDSImageItem>
      <DDSImageItem
        media="(min-width: 320px)"
        srcset={'https://fpoimg.com/720x720?text=1:1&bg_color=ee5396&text_color=161616'}></DDSImageItem>
      <DDSImageItem
        media="(min-width: 320px)"
        srcset={'https://fpoimg.com/320x320?text=1:1&bg_color=ee5396&text_color=161616'}></DDSImageItem>
    </DDSImage>
    <DDSCardEyebrow>5 min activity</DDSCardEyebrow>
    <DDSContentBlockHeading>Ready when you are</DDSContentBlockHeading>
    <DDSContentItemParagraph slot="copy">Copy example</DDSContentItemParagraph>

    <DDSFeatureSectionCardLink slot="footer" href={'https://example.com'} cta-type={'local'} color-scheme="inverse">
      <DDSCardLinkHeading>Try a free virtual business framing session with IBM Garage</DDSCardLinkHeading>
      <DDSCardCTAFooter color-scheme="inverse"> </DDSCardCTAFooter>
    </DDSFeatureSectionCardLink>
  </DDSFeatureSection>
);

render(<App />, document.getElementById('root'));
