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
import C4DTabsExtended from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended/tabs-extended';
import C4DTab from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended/tab';

import './index.css';

const App = () => (
  <C4DTabsExtended>
    <C4DTab label="First Tab">
      <p>First tab paragraph text</p>
    </C4DTab>
    <C4DTab label="Second Tab">
      <p>Second tab paragraph text</p>
    </C4DTab>
  </C4DTabsExtended>
);

render(<App />, document.getElementById('root'));
