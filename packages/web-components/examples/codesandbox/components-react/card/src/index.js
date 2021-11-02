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
import DDSCard from '@carbon/ibmdotcom-web-components/es/components-react/card/card.js';
import DDSCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import './index.css';

const App = () => (
  <DDSCard href="https://example.com">
    <DDSCardEyebrow>Eyebrow text</DDSCardEyebrow>
    <DDSCardHeading>Heading text</DDSCardHeading>
    <p>Optional copy text</p>
    <DDSCardFooter>
      <ArrowRight20 slot="icon" />
    </DDSCardFooter>
  </DDSCard>
);

render(<App />, document.getElementById('root'));
