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
import C4DButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import C4DButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import './index.css';

const App = () => (
  <C4DButtonGroup>
    <C4DButtonGroupItem href="https://www.example.com" cta-type="local">
      Button 1
    </C4DButtonGroupItem>
    <C4DButtonGroupItem href="https://www.example.com" cta-type="local">
      Button 2
    </C4DButtonGroupItem>
  </C4DButtonGroup>
);

render(<App />, document.getElementById('root'));
