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
import C4DLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import './index.css';

const App = () => (
  <C4DContentItem>
    <C4DContentItemHeading>Heading</C4DContentItemHeading>
    <C4DContentItemCopy>Copy</C4DContentItemCopy>
    <C4DLinkWithIcon slot="footer" cta-type="local" href="https://www.example.com">
      CTA text
    </C4DLinkWithIcon>
  </C4DContentItem>
);

render(<App />, document.getElementById('root'));
