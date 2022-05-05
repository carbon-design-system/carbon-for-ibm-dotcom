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
import DDSFeatureCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/feature-cta';
import DDSFeatureCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/feature-cta-footer';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import './index.css';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-8">
        <DDSFeatureCTA cta-type="local" href="https://www.example.com">
          <DDSCardHeading>Feature CTA Copy</DDSCardHeading>
          <DDSImage
            slot="image"
            alt="Image alt text"
            default-src="https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616"
          />
          <DDSFeatureCTAFooter>
            <ArrowRight20 slot="icon" />
          </DDSFeatureCTAFooter>
        </DDSFeatureCTA>
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
