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
import C4DContentSection from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section';
import C4DContentSectionHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-heading';
import C4DContentSectionCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-copy';
import C4DTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import './index.css';

const App = () => (
  <C4DContentSection>
    <C4DContentSectionHeading>Heading</C4DContentSectionHeading>
    <C4DContentSectionCopy>Copy</C4DContentSectionCopy>
    <C4DTextCTA slot="footer" cta-type="local" href="https://www.example.com">
      Link action
    </C4DTextCTA>
  </C4DContentSection>
);

render(<App />, document.getElementById('root'));
