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
import DDSLocaleModalContainer from '@carbon/ibmdotcom-web-components/es/components-react/locale-modal/locale-modal-container.js';
import './index.css';

const App = () => <DDSLocaleModalContainer lang-display="United States - English" open></DDSLocaleModalContainer>;

render(<App />, document.getElementById('root'));
