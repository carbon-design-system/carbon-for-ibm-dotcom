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
import DDSContentBlock from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block.js';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import DDSCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import './index.css';

const App = () => (
  <DDSContentBlock>
    <DDSContentBlockHeading>Heading text</DDSContentBlockHeading>
    <DDSContentBlockCopy>Copy test</DDSContentBlockCopy>
    <DDSCardLinkCTA slot="footer" cta-type="local" href="https://www.example.com">
      <DDSCardLinkHeading>cta copy</DDSCardLinkHeading>
      <DDSCardCTAFooter></DDSCardCTAFooter>
    </DDSCardLinkCTA>
  </DDSContentBlock>
);

render(<App />, document.getElementById('root'));
