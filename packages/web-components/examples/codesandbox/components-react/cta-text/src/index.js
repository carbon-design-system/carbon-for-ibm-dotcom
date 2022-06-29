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
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import './index.css';

const App = () => (
  <DDSTextCTA cta-type="local" href="https://www.example.com">
    Text CTA Copy
  </DDSTextCTA>
);

render(<App />, document.getElementById('root'));
