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
// eslint-disable-next-line max-len
import C4DSearchWithTypeahead from '@carbon/ibmdotcom-web-components/es/components-react/search-with-typeahead/search-with-typeahead';
import './index.css';

const App = () => <C4DSearchWithTypeahead active={true}></C4DSearchWithTypeahead>;

render(<App />, document.getElementById('root'));
