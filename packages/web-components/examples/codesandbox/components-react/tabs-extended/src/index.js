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
import DDSTabsExtended from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended/tabs-extended';
import DDSTab from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended/tab';

import './index.css';

const App = () => (
  <DDSTabsExtended>
    <DDSTab label="First Tab">
      <p>First tab paragraph text</p>
    </DDSTab>
    <DDSTab label="Second Tab">
      <p>Second tab paragraph text</p>
    </DDSTab>
  </DDSTabsExtended>
);

render(<App />, document.getElementById('root'));
