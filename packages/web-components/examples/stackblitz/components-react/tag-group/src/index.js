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
import C4DTagGroup from '@carbon/ibmdotcom-web-components/es/components-react/tag-group/tag-group';
import C4DTagLink from '@carbon/ibmdotcom-web-components/es/components-react/tag-link/tag-link';
import './index.css';

const App = () => (
  <C4DTagGroup>
    <C4DTagLink href="https://www.example.com">Copy text 1</C4DTagLink>
    <C4DTagLink href="https://www.example.com">Copy text 2</C4DTagLink>
    <C4DTagLink href="https://www.example.com">Copy text 3</C4DTagLink>
    <C4DTagLink href="https://www.example.com">Copy text 4</C4DTagLink>
  </C4DTagGroup>
);

render(<App />, document.getElementById('root'));
