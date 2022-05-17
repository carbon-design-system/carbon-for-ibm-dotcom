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
import DDSButtonCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/button-cta';
import './index.css';

const App = () => (
  <DDSButtonCTA cta-type="local" kind="tertiary" href="https://www.example.com">
    Button CTA Copy
  </DDSButtonCTA>
);

render(<App />, document.getElementById('root'));
