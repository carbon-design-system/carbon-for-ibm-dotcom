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
import DDSCardCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import './index.css';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-4 bx--no-gutter">
        <DDSCardCTA cta-type="local" href="https://www.example.com">
          Card CTA Copy
          <DDSCardCTAFooter>
            <ArrowRight20 slot="icon" />
          </DDSCardCTAFooter>
        </DDSCardCTA>
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
