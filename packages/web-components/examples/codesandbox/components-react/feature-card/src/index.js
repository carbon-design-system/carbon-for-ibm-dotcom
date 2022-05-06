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
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import DDSFeatureCard from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card';
import DDSFeatureCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card-footer';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import './index.css';

const App = () => (
  <DDSFeatureCard href="https://www.example.com">
    <DDSImage
      alt="Image alt text"
      defaultSrc="https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616"
      slot="image"
    />
    <DDSCardHeading>Feature card heading</DDSCardHeading>
    <DDSFeatureCardFooter>
      <ArrowRight20 slot="icon" />
    </DDSFeatureCardFooter>
  </DDSFeatureCard>
);

render(<App />, document.getElementById('root'));
