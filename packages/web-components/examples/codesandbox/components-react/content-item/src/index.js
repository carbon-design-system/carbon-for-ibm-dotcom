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
import DDSContentItem from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import DDSContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import './index.css';

const App = () => (
  <DDSContentItem>
    <DDSContentItemHeading>Heading</DDSContentItemHeading>
    <DDSContentItemCopy>Copy</DDSContentItemCopy>
    <DDSTextCTA slot="footer" cta-type="local" href="https://www.example.com">
      CTA text
    </DDSTextCTA>
  </DDSContentItem>
);

render(<App />, document.getElementById('root'));
