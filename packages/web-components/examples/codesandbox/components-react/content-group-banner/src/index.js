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
import DDSContentGroupBanner from '@carbon/ibmdotcom-web-components/es/components-react/content-group-banner/content-group-banner';
import DDSContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';
import './index.css';

const App = () => (
  <DDSContentGroupBanner>
    <DDSContentGroupHeading>Curabitur malesuada varius mi eu posuere</DDSContentGroupHeading>
    <DDSLinkList type="vertical" slot="complementary">
      <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="local">
        Link text
      </DDSLinkListItemCTA>
      <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="external">
        External link text
      </DDSLinkListItemCTA>
    </DDSLinkList>
  </DDSContentGroupBanner>
);

render(<App />, document.getElementById('root'));
