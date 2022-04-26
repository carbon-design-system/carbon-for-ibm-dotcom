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
import DDSButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import DDSButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import './index.css';

const App = () => (
  <DDSButtonGroup>
    <DDSButtonGroupItem href="https://www.example.com">
      <ArrowRight20 slot="icon" />
      Button 1
    </DDSButtonGroupItem>
    <DDSButtonGroupItem href="https://www.example.com">
      <ArrowRight20 slot="icon" />
      Button 2
    </DDSButtonGroupItem>
  </DDSButtonGroup>
);

render(<App />, document.getElementById('root'));
