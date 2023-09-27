/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import C4DContentGroupBanner from '@carbon/ibmdotcom-web-components/es/components-react/content-group-banner/content-group-banner';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';
import './index.css';

const App = () => (
  <C4DContentGroupBanner>
    <C4DContentGroupHeading>Curabitur malesuada varius mi eu posuere</C4DContentGroupHeading>
    <C4DLinkList type="vertical" slot="complementary">
      <C4DLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="local">
        Link text
      </C4DLinkListItemCTA>
      <C4DLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="external">
        External link text
      </C4DLinkListItemCTA>
    </C4DLinkList>
  </C4DContentGroupBanner>
);

render(<App />, document.getElementById('root'));
