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
import DDSStructuredList from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list';
import './index.css';

const App = () => <DDSStructuredList></DDSStructuredList>;

render(<App />, document.getElementById('root'));
