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
import C4DTableOfContents from '@carbon/ibmdotcom-web-components/es/components-react/table-of-contents/table-of-contents';
import './index.css';

const App = () => <C4DTableOfContents></C4DTableOfContents>;

render(<App />, document.getElementById('root'));
