/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import C4DLocaleModalContainer from '@carbon/ibmdotcom-web-components/es/components-react/locale-modal/locale-modal-container.js';
import './index.css';

const App = () => <C4DLocaleModalContainer lang-display="United States - English" open></C4DLocaleModalContainer>;

render(<App />, document.getElementById('root'));
