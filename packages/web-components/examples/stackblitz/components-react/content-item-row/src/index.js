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
// eslint-disable-next-line max-len
import C4DContentItemRow from '@carbon/ibmdotcom-web-components/es/components-react/content-item-row/content-item-row';
// eslint-disable-next-line max-len
import C4DContentItemRowCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-row/content-item-row-copy';
// eslint-disable-next-line max-len
import C4DContentItemRowEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/content-item-row/content-item-row-eyebrow';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';

import './index.css';

const App = () => (
  <C4DContentItemRow>
    <C4DContentItemRowEyebrow>Lorem ipsum</C4DContentItemRowEyebrow>
    <C4DContentItemHeading>Aliquam condimentum</C4DContentItemHeading>
    <C4DContentItemRowCopy>
      Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
      Phasellus at elit sollicitudin.
    </C4DContentItemRowCopy>
    <C4DLinkList slot="footer" type="vertical">
      <C4DLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="local">
        Learn more
      </C4DLinkListItemCTA>
      <C4DLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="external">
        Microservices and containers
      </C4DLinkListItemCTA>
    </C4DLinkList>
  </C4DContentItemRow>
);

render(<App />, document.getElementById('root'));
