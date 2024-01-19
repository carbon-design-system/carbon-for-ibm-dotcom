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
import C4DInPageBanner from '@carbon/ibmdotcom-web-components/es/components-react/in-page-banner/in-page-banner';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import './index.css';

const App = () => (
  <C4DInPageBanner>
    <C4DContentGroupHeading>Curabitur malesuada varius mi eu posuere</C4DContentGroupHeading>
    <C4DLinkList type="vertical" slot="complementary">
      <C4DLinkListItem
        icon-placement="right"
        href="https://www.ibm.com"
        cta-type="local">
        Link text
      </C4DLinkListItem>
      <C4DLinkListItem
        icon-placement="right"
        href="https://www.ibm.com"
        cta-type="local">
        Link text
      </C4DLinkListItem>
    </C4DLinkList>
  </C4DInPageBanner>
);

render(<App />, document.getElementById('root'));
