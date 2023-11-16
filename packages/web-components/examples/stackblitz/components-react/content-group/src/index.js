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
import C4DCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import C4DContentGroup from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import C4DContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy';
import './index.css';

const App = () => (
  <C4DContentGroup>
    <C4DContentGroupHeading>Heading</C4DContentGroupHeading>
    <C4DContentGroupCopy>Copy</C4DContentGroupCopy>
    <C4DCardLinkCTA slot="footer" cta-type="local" href="https://www.example.com">
      <C4DCardLinkHeading>Learn more about natural language processing</C4DCardLinkHeading>
      <C4DCardCTAFooter></C4DCardCTAFooter>
    </C4DCardLinkCTA>
  </C4DContentGroup>
);

render(<App />, document.getElementById('root'));
