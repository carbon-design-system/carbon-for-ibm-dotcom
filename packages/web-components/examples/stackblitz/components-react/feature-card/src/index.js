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
import C4DFeatureCard from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card';
import C4DFeatureCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card-footer';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import './index.css';

const App = () => (
  <C4DFeatureCard href="https://www.example.com">
    <C4DImage
      alt="Image alt text"
      defaultSrc="https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616"
      slot="image"
    />
    <C4DCardHeading>Feature card heading</C4DCardHeading>
    <C4DFeatureCardFooter>
      <ArrowRight20 slot="icon" />
    </C4DFeatureCardFooter>
  </C4DFeatureCard>
);

render(<App />, document.getElementById('root'));
