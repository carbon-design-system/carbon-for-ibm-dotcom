/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import DDSLeavingIbmContainer, {
  store,
} from '@carbon/ibmdotcom-web-components/es/components-react/leaving-ibm/leaving-ibm-container.js';
import './index.css';

const App = () => (
  <Provider store={store}>
    <DDSLeavingIbmContainer href="https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/" open />
  </Provider>
);

render(<App />, document.getElementById('root'));
