/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import DDSLeavingIBMContainer from '@carbon/ibmdotcom-web-components/es/components-react/leaving-ibm/leaving-ibm-container';
import './index.css';

const App = () => <DDSLeavingIBMContainer href="https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/" open />;

render(<App />, document.getElementById('root'));
