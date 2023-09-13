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
import C4DFeatureCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/feature-cta';
import C4DFeatureCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/feature-cta-footer';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import './index.css';

const App = () => (
  <div className="cds--grid">
    <div className="cds--row">
      <div className="cds--col-sm-4 cds--col-lg-8">
        <C4DFeatureCTA cta-type="local" href="https://www.example.com">
          <C4DCardHeading>Feature CTA Copy</C4DCardHeading>
          <C4DImage
            slot="image"
            alt="Image alt text"
            default-src="https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616"
          />
          <C4DFeatureCTAFooter>
            <ArrowRight20 slot="icon" />
          </C4DFeatureCTAFooter>
        </C4DFeatureCTA>
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
