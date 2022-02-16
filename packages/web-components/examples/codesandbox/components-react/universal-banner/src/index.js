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
// eslint-disable-next-line max-len
import DDSUniversalBanner from '@carbon/ibmdotcom-web-components/es/components-react/universal-banner/universal-banner';
import DDSUniversalBannerHeading from '@carbon/ibmdotcom-web-components/es/components-react/universal-banner/universal-banner-heading';
import DDSUniversalBannerCopy from '@carbon/ibmdotcom-web-components/es/components-react/universal-banner/universal-banner-copy';
import DDSUniversalBannerImage from '@carbon/ibmdotcom-web-components/es/components-react/universal-banner/universal-banner-image';
import DDSButtonCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/button-cta';
import './index.css';

const App = () => (
  <DDSUniversalBanner image-width="4-col">
    <DDSUniversalBannerImage
      slot="image"
      default-src={'https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616'}></DDSUniversalBannerImage>
    <DDSUniversalBannerHeading slot="heading">Hybrid cloud and AI for smarter business</DDSUniversalBannerHeading>
    <DDSUniversalBannerCopy slot="copy">Las Vegas, June 15-18, 2025</DDSUniversalBannerCopy>
    <DDSButtonCTA slot="cta" cta-type="local" kind="tertiary" href="https://www.example.com">
      Register for Think. Free
    </DDSButtonCTA>
  </DDSUniversalBanner>
);

render(<App />, document.getElementById('root'));
