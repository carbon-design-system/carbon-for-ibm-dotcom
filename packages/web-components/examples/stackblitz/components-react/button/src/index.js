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
import DDSButton from '@carbon/ibmdotcom-web-components/es/components-react/button/button';
import './index.css';

const App = () => (
  <DDSButton href="https://www.example.com" cta-type="local">Button text</DDSButton>
);

render(<App />, document.getElementById('root'));
