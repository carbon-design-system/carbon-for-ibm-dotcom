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
import DDSContentSection from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section';
import DDSContentSectionHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-heading';
import DDSContentSectionCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-copy';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import './index.css';

const App = () => (
  <DDSContentSection>
    <DDSContentSectionHeading>Heading</DDSContentSectionHeading>
    <DDSContentSectionCopy>Copy</DDSContentSectionCopy>
    <DDSTextCTA slot="footer" cta-type="local" href="https://www.example.com">
      Link action
    </DDSTextCTA>
  </DDSContentSection>
);

render(<App />, document.getElementById('root'));
