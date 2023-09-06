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
import C4DContentBlockHorizontal from '@carbon/ibmdotcom-web-components/es/components-react/content-block-horizontal/content-block-horizontal';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DContentItemHorizontal from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal';
import C4DContentItemHorizontalEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-eyebrow';
import C4DContentItemHorizontalCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-copy';

import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';

import './index.css';

const App = () => (
  <C4DContentBlockHorizontal>
    <C4DContentBlockHeading>Lorem ipsum dolor sit amet</C4DContentBlockHeading>
    <C4DContentItemHorizontal>
      <C4DContentItemHorizontalEyebrow>Lorem ipsum</C4DContentItemHorizontalEyebrow>
      <C4DContentItemHeading>Aliquam condimentum</C4DContentItemHeading>
      <C4DContentItemHorizontalCopy>Lorem ipsum dolor sit amet</C4DContentItemHorizontalCopy>
      <C4DLinkList slot="footer" type="vertical">
        <C4DLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="local">
          Link text
        </C4DLinkListItemCTA>
        <C4DLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="external">
          External link text
        </C4DLinkListItemCTA>
      </C4DLinkList>
    </C4DContentItemHorizontal>
  </C4DContentBlockHorizontal>
);

render(<App />, document.getElementById('root'));
