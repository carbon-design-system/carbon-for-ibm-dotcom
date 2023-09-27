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
import C4DUniversalBanner from '@carbon/ibmdotcom-web-components/es/components-react/universal-banner/universal-banner';
import C4DUniversalBannerHeading from '@carbon/ibmdotcom-web-components/es/components-react/universal-banner/universal-banner-heading';
import C4DUniversalBannerCopy from '@carbon/ibmdotcom-web-components/es/components-react/universal-banner/universal-banner-copy';
import C4DUniversalBannerImage from '@carbon/ibmdotcom-web-components/es/components-react/universal-banner/universal-banner-image';
import C4DButtonCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/button-cta';
import './index.css';

const App = () => (
  <C4DUniversalBanner image-width="4-col">
    <C4DUniversalBannerImage
      slot="image"
      default-src={'https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616'}></C4DUniversalBannerImage>
    <C4DUniversalBannerHeading slot="heading">Hybrid cloud and AI for smarter business</C4DUniversalBannerHeading>
    <C4DUniversalBannerCopy slot="copy">Las Vegas, June 15-18, 2025</C4DUniversalBannerCopy>
    <C4DButtonCTA slot="cta" cta-type="local" kind="tertiary" href="https://www.example.com">
      Register for Think. Free
    </C4DButtonCTA>
  </C4DUniversalBanner>
);

render(<App />, document.getElementById('root'));
