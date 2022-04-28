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
import DDSHorizontalRule from '@carbon/ibmdotcom-web-components/es/components-react/horizontal-rule/horizontal-rule';
/* eslint-enable max-len */
import './index.css';

const App = () => <DDSHorizontalRule size="fluid"></DDSHorizontalRule>;

render(<App />, document.getElementById('root'));
