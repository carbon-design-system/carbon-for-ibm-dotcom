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
import DDSTagGroup from '@carbon/ibmdotcom-web-components/es/components-react/tag-group/tag-group';
import DDSTagLink from '@carbon/ibmdotcom-web-components/es/components-react/tag-link/tag-link';
import './index.css';

const App = () => (
  <DDSTagGroup>
    <DDSTagLink href="https://www.example.com">Copy text 1</DDSTagLink>
    <DDSTagLink href="https://www.example.com">Copy text 2</DDSTagLink>
    <DDSTagLink href="https://www.example.com">Copy text 3</DDSTagLink>
    <DDSTagLink href="https://www.example.com">Copy text 4</DDSTagLink>
  </DDSTagGroup>
);

render(<App />, document.getElementById('root'));
