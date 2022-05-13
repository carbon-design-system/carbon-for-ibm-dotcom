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
import DDSCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import DDSContentGroup from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group';
import DDSContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import DDSContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy';
import './index.css';

const App = () => (
  <DDSContentGroup>
    <DDSContentGroupHeading>Heading</DDSContentGroupHeading>
    <DDSContentGroupCopy>Copy</DDSContentGroupCopy>
    <DDSCardLinkCTA slot="footer" cta-type="local" href="https://www.example.com">
      <DDSCardLinkHeading>Learn more about natural language processing</DDSCardLinkHeading>
      <DDSCardCTAFooter></DDSCardCTAFooter>
    </DDSCardLinkCTA>
  </DDSContentGroup>
);

render(<App />, document.getElementById('root'));
