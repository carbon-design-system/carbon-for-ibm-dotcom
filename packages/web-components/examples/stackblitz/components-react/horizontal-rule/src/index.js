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
/* eslint-disable max-len */
import C4DHorizontalRule from '@carbon/ibmdotcom-web-components/es/components-react/horizontal-rule/horizontal-rule';
/* eslint-enable max-len */
import './index.css';

const App = () => <C4DHorizontalRule size="fluid"></C4DHorizontalRule>;

render(<App />, document.getElementById('root'));
