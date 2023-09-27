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
import C4DContentItem from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import C4DTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import './index.css';

const App = () => (
  <C4DContentItem>
    <C4DContentItemHeading>Heading</C4DContentItemHeading>
    <C4DContentItemCopy>Copy</C4DContentItemCopy>
    <C4DTextCTA slot="footer" cta-type="local" href="https://www.example.com">
      CTA text
    </C4DTextCTA>
  </C4DContentItem>
);

render(<App />, document.getElementById('root'));
