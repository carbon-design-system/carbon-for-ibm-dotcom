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
import C4DGlobalBanner from '@carbon/ibmdotcom-web-components/es/components-react/global-banner/global-banner';
import C4DGlobalBannerHeading from '@carbon/ibmdotcom-web-components/es/components-react/global-banner/global-banner-heading';
import C4DGlobalBannerCopy from '@carbon/ibmdotcom-web-components/es/components-react/global-banner/global-banner-copy';
import C4DGlobalBannerImage from '@carbon/ibmdotcom-web-components/es/components-react/global-banner/global-banner-image';
import C4DButton from '@carbon/ibmdotcom-web-components/es/components-react/button/button';
import './index.css';

const App = () => (
  <C4DGlobalBanner image-width="4-col">
    <C4DGlobalBannerImage
      default-src={'https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616'}></C4DGlobalBannerImage>
    <C4DGlobalBannerHeading>Hybrid cloud and AI for smarter business</C4DGlobalBannerHeading>
    <C4DGlobalBannerCopy>Las Vegas, June 15-18, 2025</C4DGlobalBannerCopy>
    <C4DButton slot="cta" cta-type="local" kind="tertiary" href="https://www.example.com">
      Register for Think. Free
    </C4DButton>
  </C4DGlobalBanner>
);

render(<App />, document.getElementById('root'));
