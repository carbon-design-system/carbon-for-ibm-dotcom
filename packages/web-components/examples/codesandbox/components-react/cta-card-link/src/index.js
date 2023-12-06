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
import C4DCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import './index.css';

const App = () => (
  <div className="cds--grid">
    <div className="cds--row">
      <div className="cds--col-sm-4 cds--col-lg-4 cds--no-gutter">
        <C4DCardLinkCTA cta-type="local" href="https://www.example.com">
          <C4DCardLinkHeading>Card link heading</C4DCardLinkHeading>
          <C4DCardCTAFooter>
            <ArrowRight20 slot="icon" />
          </C4DCardCTAFooter>
        </C4DCardLinkCTA>
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
