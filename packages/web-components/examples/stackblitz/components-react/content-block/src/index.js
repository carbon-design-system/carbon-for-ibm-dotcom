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
import C4DContentBlock from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block.js';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import C4DCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import './index.css';

const App = () => (
  <C4DContentBlock>
    <C4DContentBlockHeading>Heading text</C4DContentBlockHeading>
    <C4DContentBlockCopy>Copy test</C4DContentBlockCopy>
    <C4DCardLinkCTA slot="footer" cta-type="local" href="https://www.example.com">
      <C4DCardLinkHeading>cta copy</C4DCardLinkHeading>
      <C4DCardCTAFooter></C4DCardCTAFooter>
    </C4DCardLinkCTA>
  </C4DContentBlock>
);

render(<App />, document.getElementById('root'));
